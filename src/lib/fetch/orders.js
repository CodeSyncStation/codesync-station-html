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

export async function getOrders() {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
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
