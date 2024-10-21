import { API_URL } from "./config";

export async function getAllUsers(params) {
  try {
    const response = await fetch(`${API_URL}/api/users`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
