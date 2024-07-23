import { IconContext } from "react-icons";
import { CiBookmark } from "react-icons/ci";
import { LiaBathSolid, LiaBedSolid } from "react-icons/lia";
import { PiChatDotsThin, PiMapPinLine } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./card.scss";

const Card = ({ item }) => {
  const vndCurrentcy = (number) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    const formattedNumber = formatter.format(number).replace("₫", "VNĐ");

    return formattedNumber;
  };

  return (
    <div className="listItem">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images} alt="" />
      </Link>
      <div className="textContainer">
        <IconContext.Provider value={{ size: "20px" }}>
          <div className="listText">
            <Link to={`/${item.id}`}>
              <h1>{item.title}</h1>
            </Link>
            <div className="address">
              <PiMapPinLine />
              <p>{item.address}</p>
            </div>
            <span>{vndCurrentcy(item.price)}</span>
          </div>
          <div className="bottom">
            <div className="features">
              <div className="icon">
                <LiaBedSolid />
                <span>{item.bedroom} </span>
                <p>phòng ngủ</p>
              </div>
              <div className="icon">
                <LiaBathSolid />
                <span>{item.bathroom} </span>
                <p>phòng tắm</p>
              </div>
            </div>
            <div className="icons">
              <div className="icon">
                <CiBookmark />
              </div>
              <div className="icon">
                <PiChatDotsThin />
              </div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};
//AIzaSyBykQJddFqM-QauSobpa_CI_GS6fqW3eOc

export default Card;
