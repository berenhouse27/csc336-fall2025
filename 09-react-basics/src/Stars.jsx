import "./Stars.css";

function Stars({ rating }) {
  return (
    <span className="stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default Stars;
