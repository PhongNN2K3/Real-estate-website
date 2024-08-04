import { useContext, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { format, register } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { SocketIoContext } from "../../context/SocketIoContext";
import apiRequest from "../../lib/apiRequest";
import { useNotificationStore } from "../../lib/notificationStore";
import "./chat.scss";

// Định nghĩa ngôn ngữ tiếng Việt
const localeFunc = (number, index, totalSec) =>
  [
    ["vừa xong", "một lúc"],
    ["%s giây trước", "trong %s giây"],
    ["1 phút trước", "trong 1 phút"],
    ["%s phút trước", "trong %s phút"],
    ["1 giờ trước", "trong 1 giờ"],
    ["%s giờ trước", "trong %s giờ"],
    ["1 ngày trước", "trong 1 ngày"],
    ["%s ngày trước", "trong %s ngày"],
    ["1 tuần trước", "trong 1 tuần"],
    ["%s tuần trước", "trong %s tuần"],
    ["1 tháng trước", "trong 1 tháng"],
    ["%s tháng trước", "trong %s tháng"],
    ["1 năm trước", "trong 1 năm"],
    ["%s năm trước", "trong %s năm"],
  ][index];

// Đăng ký ngôn ngữ tiếng Việt với timeago.js
register("vi", localeFunc);

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const { socketIo } = useContext(SocketIoContext);
  const decrease = useNotificationStore((state) => state.decrease);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, {
        text,
      });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      inputRef.current.focus();
      socketIo.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollBy({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat?.messages]);

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (error) {
        console.error(error);
      }
    };

    if (chat && socketIo) {
      socketIo.on("getMessage", (data) => {
        if (data.chatId === chat.id) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socketIo.off("getMessage");
    };
  }, [chat, socketIo]);

  return (
    <div className="chat">
      <div className="messages">
        <h2>Tin nhắn</h2>
        {chats?.map((ch) => {
          return (
            <div
              onClick={() => handleOpenChat(ch.id, ch.receiver)}
              className="message"
              key={ch.id}
            >
              <img src={ch.receiver.avatar ?? "../../../noAvatar.png"} />
              <div className="text">
                <span>{ch.receiver.username}</span>
                <p
                  className={
                    ch.seenBy.includes(currentUser.id) || chat?.id !== ch.id
                      ? ""
                      : "seen"
                  }
                >
                  {ch.lastMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {chat && (
        <div className="chatbox">
          <IconContext.Provider value={{ size: "24px" }}>
            <div className="top">
              <div className="user">
                <img src={chat.receiver.avatar ?? "../../../noAvatar.png"} />
                <span>{chat.receiver.username}</span>
              </div>
              <div onClick={() => setChat(null)} className="close">
                <FaXmark />
              </div>
            </div>
            <div ref={scrollRef} className="middle">
              {chat.messages.map((message) => {
                return (
                  <div
                    className={
                      message.userId !== currentUser.id
                        ? "chatMessage"
                        : "chatMessage own"
                    }
                    key={message.id}
                  >
                    <p>{message.text}</p>
                    <span>{format(message.createdAt, "vi")}</span>
                  </div>
                );
              })}
            </div>
            <form className="bottom" onSubmit={handleSendMessage}>
              <textarea ref={inputRef} name="text"></textarea>
              <button type="submit" className="send">
                <PiPaperPlaneTilt />
              </button>
            </form>
          </IconContext.Provider>
        </div>
      )}
    </div>
  );
};

export default Chat;
