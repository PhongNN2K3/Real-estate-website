import { useState } from "react";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { PiPaperPlaneTilt } from "react-icons/pi";
import "./chat.scss";

const Chat = () => {
  const [chat, setChat] = useState(false);

  return (
    <div className="chat">
      <div className="messages">
        <h2>Tin nhắn</h2>
        <div onClick={() => setChat(true)} className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="text">
            <span>John Dee</span>
            <p>Hi, how are you?</p>
          </div>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="text">
            <span>John Dee</span>
            <p>Hi, how are you?</p>
          </div>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="text">
            <span>John Dee</span>
            <p>Hi, how are you?</p>
          </div>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="text">
            <span>John Dee</span>
            <p>Hi, how are you?</p>
          </div>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="text">
            <span>John Dee</span>
            <p>Hi, how are you?</p>
          </div>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="text">
            <span>John Dee</span>
            <p>Hi, how are you?</p>
          </div>
        </div>
      </div>
      {chat && (
        <div className="chatbox">
          <IconContext.Provider value={{ size: "24px" }}>
            <div className="top">
              <div className="user">
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <span>John Dee</span>
              </div>
              <div onClick={() => setChat(false)} className="close">
                <FaXmark />
              </div>
            </div>
            <div className="middle">
              <div className="chatMessage">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage own">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage own">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage own">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage own">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
              <div className="chatMessage own">
                <p>How are you?</p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="bottom">
              <textarea></textarea>
              <div className="send">
                <PiPaperPlaneTilt />
              </div>
            </div>
          </IconContext.Provider>
        </div>
      )}
    </div>
  );
};

export default Chat;
