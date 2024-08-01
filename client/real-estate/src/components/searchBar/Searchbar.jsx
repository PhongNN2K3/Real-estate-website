import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./searchBar.scss";

const Searchbar = () => {
  const types = ["buy", "rent"];
  const [query, setQuery] = useState({
    type: types[0],
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const tabRef = useRef();

  useEffect(() => {
    if (tabRef.current && query.type) {
      const currentTab = document.querySelector(`.${query.type}`);
      tabRef.current.style.left = currentTab.offsetLeft + "px";
      tabRef.current.style.width = currentTab.offsetWidth + "px";
    }
  }, [query.type]);

  return (
    <div className="searchbar">
      <div className="type">
        {types.map((type) => (
          <div key={type} className={type} onClick={() => switchType(type)}>
            <p>{type === "buy" ? "Mua" : "Thuê"}</p>
            <div ref={tabRef} className="line"></div>
          </div>
        ))}
      </div>
      <Form id="form">
        <Form.Control
          className="city"
          type="text"
          placeholder="Thành phố"
          name="city"
          onChange={handleChange}
        />
        <Form.Control
          type="number"
          min="0"
          max="100000000000"
          step="1000"
          placeholder="Giá thấp nhất"
          name="minPrice"
          onChange={handleChange}
        />
        <Form.Control
          type="number"
          min="0"
          max="100000000000"
          step="1000"
          placeholder="Giá cao nhất"
          name="maxPrice"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          className="search"
        >
          <IconContext.Provider value={{ color: "white", size: "24px" }}>
            <BsSearch />
          </IconContext.Provider>
        </Link>
      </Form>
    </div>
  );
};

export default Searchbar;
