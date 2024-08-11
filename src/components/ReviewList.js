import "./ReviewList.css";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";
import { useState, useContext } from "react";
import LocaleContext from "../Contexts/LocaleContext";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}`;
}

function ReviewListItem({ item, onDelClick, onEditClick }) {
  const locale = useContext(LocaleContext);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <p>현재언어: {locale}</p>
        <button onClick={() => onEditClick(item.id)}>수정</button>
        <button onClick={() => onDelClick(item.id)}>삭제</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelClick, onSubmit, onSubmitSuccess }) {
  const [editingId, setEditingId] = useState(null);

  function handleCancleClick() {
    setEditingId(null);
  }

  return (
    <ul>
      {items.map((item) => {
        if (editingId === item.id) {
          const { id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };
          const initialUrl = imgUrl;

          const handleUpdate = (formData) => onSubmit(id, formData);
          const handleUpdateSuccess = (review) => {
            onSubmitSuccess(review);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <ReviewForm
                id={id}
                initialValues={initialValues}
                initialUrl={initialUrl}
                onSubmit={handleUpdate}
                onSubmitSuccess={handleUpdateSuccess}
                onCancle={handleCancleClick}
              />
            </li>
          );
        } else {
          return (
            <li key={item.id}>
              <ReviewListItem
                item={item}
                onDelClick={onDelClick}
                onEditClick={setEditingId}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}

export default ReviewList;
