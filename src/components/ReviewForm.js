import { useState } from "react";
import FileInput from "./FileInput";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  id,
  initialValues = INITIAL_VALUES,
  initialUrl,
  onSubmit,
  onSubmitSuccess,
  onCancle,
}) {
  const [review, setReview] = useState(initialValues);
  const [submittingError, setSubmittingError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleReviewAdd(name, value) {
    setReview((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  }

  function handleAdd(e) {
    const { name, value } = e.target;
    handleReviewAdd(name, value);
  }

  async function handleSubmit(e) {
    let result;
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", review.title);
    formData.append("rating", review.rating);
    formData.append("content", review.content);
    formData.append("imgFile", review.imgFile);
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (e) {
      setSubmittingError(e);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const reviewData = result.review;
    setReview(INITIAL_VALUES);
    onSubmitSuccess(reviewData);
  }

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        initialUrl={initialUrl}
        value={review.imgFile}
        onChange={handleReviewAdd}
      />
      <input name="title" value={review.title} onChange={handleAdd} />
      <input name="rating" value={review.rating} onChange={handleAdd} />
      <textarea value={review.content} name="content" onChange={handleAdd} />
      <button disabled={isSubmitting}>보내기</button>
      {onCancle && <button onClick={onCancle}>취소</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
