import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "./pin.scss";

const Pin = ({ item }) => {
  const vndCurrentcy = (number) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    const formattedNumber = formatter.format(number).replace("₫", "VNĐ");

    return formattedNumber;
  };

  return (
    <>
      <Marker position={{ lat: item.latitude, lng: item.longitude }}>
        <Popup>
          <div className="popup">
            <img
              src={item.images[0]}
              alt={item.title}
              style={{
                width: "64px",
                height: "64px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <div className="info">
              <Link to={`/${item.id}`}>{item.title}</Link>
              <span>{item.bedroom} bedroom</span>
              <b>{vndCurrentcy(item.price)}</b>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default Pin;
