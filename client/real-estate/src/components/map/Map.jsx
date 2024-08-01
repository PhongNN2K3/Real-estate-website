import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "../pin/Pin";
import "./map.scss";

const Map = ({ items }) => {
  const center =
    items.length === 1
      ? { lat: items[0].latitude, lng: items[0].longitude }
      : {
          lat: 10.8231,
          lng: 106.6297,
        };
  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  );
};

export default Map;
