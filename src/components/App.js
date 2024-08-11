import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { useEffect, useState } from "react";
import {
  getReviews,
  createReviews,
  updateReviews,
  deleteReviews,
} from "../api";
import LocaleContext from "../Contexts/LocaleContext";
import LocaleSelector from "./LocaleSelector";
import useAsync from "./hooks/useAsync";

const LIMIT = 6;

function App() {
  const [locale, setLocale] = useState("ko");
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("rating");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(0);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  function handleNewestClick() {
    console.log(items);
    setOrder("rating");
  }

  function handleBestClick() {
    console.log(items);
    setOrder("createdAt");
  }

  async function handleDelClick(id) {
    const result = await deleteReviews(id);
    if (!result) return;

    const NewItems = items.filter((item) => item.id !== id);
    setItems(NewItems);
  }

  const handleLoad = async (options) => {
    let result = await getReviewsAsync(options);
    if (!result) return;

    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  function handleLoadMore() {
    handleLoad({ order, offset, limit: LIMIT });
  }

  function handleSubmitSuccess(reviewData) {
    setItems((prevItems) => [reviewData, ...prevItems]);
  }

  function handleUpdateSuccess(reviewData) {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === reviewData.id);
      return [
        ...prevItems.slice(0, splitIdx),
        reviewData,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  }

  return (
    <LocaleContext.Provider value={locale}>
      <>
        <div>
          <LocaleSelector value={locale} onChange={setLocale} />
          <button onClick={handleNewestClick}>추천순</button>
          <button onClick={handleBestClick}>날짜순</button>
          <ReviewForm
            onSubmit={createReviews}
            onSubmitSuccess={handleSubmitSuccess}
          />
        </div>
        <div>
          <ReviewList
            items={sortedItems}
            onDelClick={handleDelClick}
            onSubmit={updateReviews}
            onSubmitSuccess={handleUpdateSuccess}
          />
          <button disabled={!hasNext || isLoading} onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      </>
    </LocaleContext.Provider>
  );
}

export default App;
