import Searchbar from "../../components/searchBar/Searchbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Tìm kiếm và sở hữu ngôi nhà mơ ước - Chỉ với vài cú nhấp chuột!
          </h1>
          <p className="desc">
            Trang web như một cuốn catalogue sang trọng, trưng bày những căn nhà
            đẹp, từ những căn hộ hiện đại đến biệt thự nguy nga. Mỗi bức ảnh,
            mỗi dòng thông tin đều khơi gợi niềm mơ ước về một cuộc sống tiện
            nghi, hạnh phúc.
          </p>
          <Searchbar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Năm kinh nghiệm</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Giải thưởng đạt được</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Bất động sản đã sẵn sàng</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imageContainer">
        <img src="../../../realEstate.png" />
      </div>
    </div>
  );
};

export default Home;
