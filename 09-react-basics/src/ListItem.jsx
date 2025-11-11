import Stars from "./Stars.jsx";
import "./ListItem.css";

function ListItem({ title, rating }) {
  return (
    <li className="list-item">
      <span className="item-title">{title}</span>
      <Stars rating={rating} />
      <span className="rating-count">{rating} / 5 stars</span>
    </li>
  );
}

export default ListItem;
