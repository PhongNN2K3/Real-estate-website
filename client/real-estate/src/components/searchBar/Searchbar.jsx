import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import "./searchBar.scss";

const Searchbar = () => {
  const types = ["Mua", "Thuê"];
  const [query, setQuery] = useState({
    type: types[0],
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const handleTypeChange = (val) => {
    setQuery({ ...query, type: val });
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
          <div
            key={type}
            className={type}
            onClick={() => handleTypeChange(type)}
          >
            <p>{type}</p>
            <div ref={tabRef} className="line"></div>
          </div>
        ))}
      </div>
      <Form id="form">
        <Form.Control className="location" type="text" placeholder="Địa chỉ" />
        <Form.Control
          type="number"
          min="0"
          max="100000000000"
          step="1000"
          placeholder="Giá thấp nhất"
        />
        <Form.Control
          type="number"
          min="0"
          max="100000000000"
          step="1000"
          placeholder="Giá cao nhất"
        />
        <button className="search">
          <IconContext.Provider value={{ color: "white", size: "24px" }}>
            <BsSearch />
          </IconContext.Provider>
        </button>
      </Form>
    </div>
  );
};

export default Searchbar;
