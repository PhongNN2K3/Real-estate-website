import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import apiRequest from "../../lib/apiRequest";
import "./newPostPage.scss";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          description: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          fee: inputs.fee,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      console.log(res);
      navigate("/" + res.data.id);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Thêm bài đăng mới</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Tiêu đề</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Nhập tiêu đề"
              />
            </div>
            <div className="item">
              <label htmlFor="price">Giá</label>
              <input
                id="price"
                name="price"
                type="number"
                required
                placeholder="Nhập giá"
              />
            </div>
            <div className="item">
              <label htmlFor="address">Địa chỉ</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Mô tả</label>
              <ReactQuill
                theme="snow"
                onChange={setValue}
                value={value}
                placeholder="Nhập mô tả"
              />
            </div>
            <div className="item">
              <label htmlFor="city">Thành phố</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="Nhập thành phố"
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Phòng ngủ</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                required
                placeholder="Số lượng"
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Phòng tắm</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                required
                placeholder="Số lượng"
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Vĩ độ</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Kinh độ</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Hình thức</label>
              <select name="type">
                <option value="buy" defaultChecked>
                  Mua
                </option>
                <option value="rent">Thuê</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Phân loại</label>
              <select name="property">
                <option value="apartment">Căn hộ</option>
                <option value="house">Nhà</option>
                <option value="townhouse">Nhà phố</option>
                <option value="penthouse">Penthouse</option>
                <option value="villa">Biệt thự</option>
                <option value="land">Đất</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Tiện ích</label>
              <input
                id="utilities"
                name="utilities"
                type="text"
                placeholder="Nhập tiện ích"
              />
            </div>
            <div className="item">
              <label htmlFor="pet">Chính nuôi thú cưng</label>
              <select name="pet">
                <option value="allowed">Cho phép</option>
                <option value="not-allowed">Không cho phép</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="fee">Phí quản lý</label>
              <input id="fee" name="fee" type="text" placeholder="Nhập phí" />
            </div>
            <div className="item">
              <label htmlFor="size">Tổng kích thước (m²)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">Cách trường học (m)</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Cách xe buýt (m)</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Cách nhà hàng (m)</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Thêm mới</button>
            {error && <span className="error">error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="images">
          {images.map((image, index) => (
            <img src={image} key={index} alt="" />
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            cloudName: "dii1s7a0c",
            uploadPreset: "estate",
            resourceType: "image",
            multiple: true,
            folder: "posts",
            clientAllowedFormats: ["png", "jpg", "jpeg"],
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
