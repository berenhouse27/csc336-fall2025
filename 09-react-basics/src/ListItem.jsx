import Stars from "./Stars.jsx";
import "./ListItem.css";

function MovieItem({ title, rating }) {
  return (
    <li className="movie-item">
      <span className="movie-title">{title}</span>
      <Stars rating={rating} />
      <span className="rating-count">{rating} / 5 stars</span>
    </li>
  );
}

export default MovieItem;
