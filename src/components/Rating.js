import "./Rating.css";

function Star({ selected = false }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;
  return <span className={className}>★</span>;
}

function Rating({ value = 0 }) {
  const RATINGS = [1, 2, 3, 4, 5];

  return (
    <div>
      {RATINGS.map((rating) => (
        <Star selected={value >= rating} />
      ))}
    </div>
  );
}

export default Rating;
