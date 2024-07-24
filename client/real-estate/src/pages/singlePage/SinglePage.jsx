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
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../lib/listData";
import "./singlePage.scss";

const SinglePage = () => {
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
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <IconContext.Provider value={{ size: "20px" }}>
                  <div className="address">
                    <PiMapPinLine />
                    <span>{singlePostData.address}</span>
                  </div>
                </IconContext.Provider>
                <div className="price">
                  {vndCurrentcy(singlePostData.price)}
                </div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <IconContext.Provider value={{ size: "20px" }}>
            <p className="title">Thông tin chung</p>
            <div className="general">
              <div className="feature">
                <LiaToolsSolid />
                <div className="featureText">
                  <span>Tiện ích</span>
                  <p>Người thuê chịu trách nhiệm</p>
                </div>
              </div>
              <div className="feature">
                <IoPawOutline />
                <div className="featureText">
                  <span>Nuôi thú cưng</span>
                  <p>Được cho phép</p>
                </div>
              </div>
              <div className="feature">
                <FaRegMoneyBillAlt />
                <div className="featureText">
                  <span>Phí quản lý</span>
                  <p>Phí quản lý sẽ đóng theo quy định của nhà nước</p>
                </div>
              </div>
            </div>
            <p className="title">Kích thước</p>
            <div className="size">
              <div className="feature">
                <IoMdOpen />
                <span>{`${singlePostData.size} m²`}</span>
              </div>
              <div className="feature">
                <LiaBedSolid />
                <span>{singlePostData.bedroom} phòng ngủ</span>
              </div>
              <div className="feature">
                <LiaBathSolid />
                <span>{singlePostData.bathroom} phòng tắm</span>
              </div>
            </div>
            <p className="title">Cơ sở hạ tầng</p>
            <div className="nearby">
              <div className="feature">
                <LuSchool />
                <div className="featureText">
                  <span>Trường học</span>
                  <p>{singlePostData.school}</p>
                </div>
              </div>
              <div className="feature">
                <IoBusOutline />
                <div className="featureText">
                  <span>Trạm xe buýt</span>
                  <p>{singlePostData.bus}</p>
                </div>
              </div>
              <div className="feature">
                <IoRestaurantOutline />
                <div className="featureText">
                  <span>Nhà hàng</span>
                  <p>{singlePostData.restaurant}</p>
                </div>
              </div>
            </div>
          </IconContext.Provider>
          <p className="title">Địa điểm</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
          <IconContext.Provider value={{ size: "24px" }}>
            <div className="buttons">
              <button className="btn">
                <CiBookmark />
                <p>Lưu địa điểm</p>
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
