import { useState } from "react";
import { IconContext } from "react-icons";
import { FaXmark } from "react-icons/fa6";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import "./slider.scss";

const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      setImageIndex(imageIndex > 0 ? imageIndex - 1 : images.length - 1);
    } else {
      setImageIndex(imageIndex < images.length - 1 ? imageIndex + 1 : 0);
    }
  };

  return (
    <div className="slider">
      <IconContext.Provider value={{ size: "50px", color: "white" }}>
        {imageIndex !== null && (
          <div className="fullSlider">
            <div className={images.length > 1 ? "arrow" : "arrow disabled"}>
              <RiArrowRightDoubleFill
                className="left"
                onClick={() => changeSlide("left")}
              />
            </div>
            <div className="fullImage">
              <img src={images[imageIndex]} alt="" />
            </div>
            <div className={images.length > 1 ? "arrow" : "arrow disabled"}>
              <RiArrowRightDoubleFill onClick={() => changeSlide("right")} />
            </div>
            <div className="close">
              <FaXmark onClick={() => setImageIndex(null)} />
            </div>
          </div>
        )}
      </IconContext.Provider>
      <div className="bigImage">
        <img
          src={images[0] ?? "../../../noImage.png"}
          alt=""
          onClick={() => setImageIndex(0)}
        />
      </div>
      {images.length > 1 && (
        <div className="smallImage">
          {images.slice(1, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              onClick={() => setImageIndex(index + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
