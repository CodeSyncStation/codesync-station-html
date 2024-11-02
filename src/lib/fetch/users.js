import { API_URL } from "./config";

export async function getAllUsers(params) {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      cache: "no-store",
      next: {
        tags: ["users"],
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function postUser(data) {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function putUser(data) {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
