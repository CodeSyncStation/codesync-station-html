import { API_URL } from "./config";

export async function postOrders(data) {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
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

export async function getOrders({ status, page, search, dateRange }) {
  try {
    let queryParams = `${API_URL}/api/orders`;
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
    const response = await fetch(queryParams, {
      next: {
        tags: ["orders"],
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function putOrder(id, status) {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}