const BASE_URL = "https://learn.codeit.kr/6340";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const res = await fetch(`${BASE_URL}/film-reviews?${query}`);
  if (!res.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
  const body = await res.json();
  return body;
}

export async function createReviews(formData) {
  const res = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("리뷰를 생성하는데 실패했습니다");
  }
  const body = await res.json();
  return body;
}

export async function updateReviews(id, formData) {
  const res = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("리뷰를 수정하는데 실패했습니다");
  }
  const body = await res.json();
  console.log("update성공!");
  console.log(`id:${id}`);
  console.log(formData.title);
  console.log(body);
  return body;
}

export async function deleteReviews(id) {
  const res = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("리뷰를 삭제하는데 실패했습니다");
  }
  const body = await res.json();
  console.log("DELETE!");
  console.log(`id:${id}`);
  return body;
}
