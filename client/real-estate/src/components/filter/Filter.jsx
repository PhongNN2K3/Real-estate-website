import { Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import "./filter.scss";

const Filter = () => {
  return (
    <div className="filter">
      <div className="title">
        <h2>
          Tìm kiếm bất động sản ở <b>TP HCM</b>
        </h2>
      </div>
      <div className="top">
        <Form>
          <Form.Group className="item">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control type="text" placeholder="Nhập địa chỉ" />
          </Form.Group>
        </Form>
      </div>
      <div className="bottom">
        <Form className="form">
          <Form.Group className="item">
            <Form.Label>Hình thức</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="Mua">Mua</option>
              <option value="Thuê">Thuê</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="item">
            <Form.Label>Phân loại</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="Căn hộ">Căn hộ</option>
              <option value="Nhà">Nhà</option>
              <option value="Chung cư">Chung cư</option>
              <option value="Đất">Đất</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="item">
            <Form.Label>Giá tối thiểu</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="1000000000000"
              step="1000"
              placeholder="bất kỳ"
            />
          </Form.Group>
          <Form.Group className="item">
            <Form.Label>Giá tối đa</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="1000000000000"
              step="1000"
              placeholder="Bất kỳ"
            />
          </Form.Group>
          <Form.Group className="item">
            <Form.Label>Phòng ngủ</Form.Label>
            <Form.Control type="number" placeholder="Bất kỳ" />
          </Form.Group>
          <div className="search">
            <IconContext.Provider value={{ size: "18px", color: "white" }}>
              <BsSearch />
            </IconContext.Provider>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Filter;
