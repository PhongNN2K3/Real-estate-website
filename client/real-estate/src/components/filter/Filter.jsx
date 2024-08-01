import { useState } from "react";
import { Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import "./filter.scss";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <div className="title">
        <h2>
          Tìm kiếm bất động sản ở <b>{query.city}</b>
        </h2>
      </div>
      <div className="top">
        <Form>
          <Form.Group className="item">
            <Form.Label>Vị trí</Form.Label>
            <Form.Control
              type="text"
              placeholder="Thành phố"
              onChange={handleChange}
              name="city"
              defaultValue={query.city}
            />
          </Form.Group>
        </Form>
      </div>
      <div className="bottom">
        <Form className="form">
          <Form.Group className="item">
            <Form.Label>Hình thức</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              name="type"
              defaultValue={query.type}
            >
              <option value="buy">Mua</option>
              <option value="rent">Thuê</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="item">
            <Form.Label>Phân loại</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              name="property"
              defaultValue={query.property}
            >
              <option value="apartment">Căn hộ</option>
              <option value="house">Nhà</option>
              <option value="townhouse">Nhà phố</option>
              <option value="penthouse">Penthouse</option>
              <option value="villa">Biệt thự</option>
              <option value="land">Đất</option>
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
              onChange={handleChange}
              name="minPrice"
              defaultValue={query.minPrice}
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
              onChange={handleChange}
              name="maxPrice"
              defaultValue={query.maxPrice}
            />
          </Form.Group>
          <Form.Group className="item">
            <Form.Label>Phòng ngủ</Form.Label>
            <Form.Control
              type="number"
              placeholder="Bất kỳ"
              onChange={handleChange}
              name="bedroom"
              defaultValue={query.bedroom}
            />
          </Form.Group>
          <div className="search" onClick={handleFilter}>
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
