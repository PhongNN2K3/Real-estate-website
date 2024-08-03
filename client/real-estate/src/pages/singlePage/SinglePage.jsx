import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { CiBookmark } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import {
  IoBusOutline,
  IoPawOutline,
  IoRestaurantOutline,
} from "react-icons/io5";
import { LiaBathSolid, LiaBedSolid, LiaToolsSolid } from "react-icons/lia";
import { LuSchool } from "react-icons/lu";
import { PiChatDotsThin, PiMapPinLine } from "react-icons/pi";
import { useLoaderData } from "react-router-dom";
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./singlePage.scss";

const SinglePage = () => {
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [isSaved, setIssaved] = useState(post.isSaved);

  const handleSave = async () => {
    setIssaved((prev) => !prev);
    if (!currentUser) {
      alert("Vui lòng đăng nhập để lưu bài đăng");
      setIssaved(false);
      return;
    } else {
      try {
        await apiRequest.post("/users/save", {
          postId: post.id,
        });
      } catch (error) {
        console.log(error);
        setIssaved((prev) => !prev);
      }
    }
  };

  const vndCurrentcy = (number) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    const formattedNumber = formatter.format(number).replace("₫", "VNĐ");

    return formattedNumber;
  };
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <IconContext.Provider value={{ size: "20px" }}>
                  <div className="address">
                    <PiMapPinLine />
                    <span>{post.address}</span>
                  </div>
                </IconContext.Provider>
                <div className="price">{vndCurrentcy(post.price)}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar ?? "../../../noAvatar.png"} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <IconContext.Provider value={{ size: "20px" }}>
            <p className="title">Thông tin chung</p>
            <div className="general">
              <div className="feature">
                <div className="icon">
                  <LiaToolsSolid />
                </div>
                <div className="featureText">
                  <span>Tiện ích</span>
                  <p>{post.postDetail.utilities ?? "Không có"}</p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <IoPawOutline />
                </div>
                <div className="featureText">
                  <span>Nuôi thú cưng</span>
                  <p>
                    {post.postDetail.pet === "allowed"
                      ? "Được cho phép"
                      : "Không cho phép"}
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <FaRegMoneyBillAlt />
                </div>
                <div className="featureText">
                  <span>Phí quản lý</span>
                  <p>{post.postDetail.fee ?? "Không có"}</p>
                </div>
              </div>
            </div>
            <p className="title">Kích thước</p>
            <div className="size">
              <div className="feature">
                <div className="icon">
                  <IoMdOpen />
                </div>
                <span>{`${post.postDetail.size} m²`}</span>
              </div>
              {post.bedroom && (
                <div className="feature">
                  <div className="icon">
                    <LiaBedSolid />
                  </div>
                  <span>{`${post.bedroom} phòng ngủ`} </span>
                </div>
              )}
              {post.bathroom && (
                <div className="feature">
                  <div className="icon">
                    <LiaBathSolid />
                  </div>
                  <span>{`${post.bathroom} phòng tắm`} </span>
                </div>
              )}
            </div>
            <p className="title">Cơ sở hạ tầng</p>
            {((post.postDetail.school !== 0 && post.postDetail.bus) !== 0 &&
              post.postDetail.restaurant) !== 0 ? (
              <div className="nearby">
                {post.postDetail.school && (
                  <div className="feature">
                    <div className="icon">
                      <LuSchool />
                    </div>
                    <div className="featureText">
                      <span>Trường học</span>
                      <p>cách {post.postDetail.school} m</p>
                    </div>
                  </div>
                )}
                {post.postDetail.bus && (
                  <div className="feature">
                    <div className="icon">
                      <IoBusOutline />
                    </div>
                    <div className="featureText">
                      <span>Trạm xe buýt</span>
                      <p>cách {post.postDetail.bus} m</p>
                    </div>
                  </div>
                )}
                {post.postDetail.restaurant && (
                  <div className="feature">
                    <div className="icon">
                      <IoRestaurantOutline />
                    </div>
                    <div className="featureText">
                      <span>Nhà hàng</span>
                      <p>cách {post.postDetail.restaurant} m</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="noValue">Không có</p>
            )}
          </IconContext.Provider>
          <p className="title">Địa điểm</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <IconContext.Provider value={{ size: "24px" }}>
            <div className="buttons">
              <button
                className="btn"
                onClick={handleSave}
                style={{
                  backgroundColor: isSaved ? "black" : "white",
                  color: isSaved ? "white" : "black",
                }}
              >
                <CiBookmark />
                <p>{isSaved ? "Bỏ lưu" : "Lưu địa điểm"}</p>
              </button>
              <button className="btn">
                <PiChatDotsThin />
                <p>Gửi tin nhắn</p>
              </button>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
