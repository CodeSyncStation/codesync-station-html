import { API_URL } from "./config";

export async function postProject(data) {
  try {
    const response = await fetch(`${API_URL}/api/projects`, {
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

export async function getProjects() {
  try {
    let queryParams = `${API_URL}/api/projects`;

    const response = await fetch(queryParams, {
      next: {
        tags: ["projects"],
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateProject(data) {
  try {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: "PUT",
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

export async function deleteProject(id) {
  try {
    const response = await fetch(`${API_URL}/api/projects`, {
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
