import { listData } from "../../lib/listData";
import Card from "../card/Card";
import "./list.scss";

const List = () => {
  return (
    <div className="list">
      {listData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
