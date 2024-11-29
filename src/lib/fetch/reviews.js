import { API_URL } from "./config";

export async function postReviews(data) {
  try {
    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getReviews({ status, page, search, dateRange, email }) {
  try {
    let queryParams = `${API_URL}/api/reviews`;
    if (page) {
      queryParams = queryParams.concat(`?page=${page}`);
    } else {
      queryParams = queryParams.concat(`?page=1`);
    }
    if (status) {
      queryParams = queryParams.concat(`&status=${status}`);
    }
    if (search) {
      queryParams = queryParams.concat(`&search=${search}`);
    }
    if (dateRange) {
      queryParams = queryParams.concat(`&dateRange=${dateRange}`);
    }
    if (email) {
      queryParams = queryParams.concat(`&email=${email}`);
    }
    const response = await fetch(queryParams, {
      next: {
        tags: ["reviews"],
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function putReview(id, data) {
  try {
    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...data }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteReview(id) {
  try {
    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}
