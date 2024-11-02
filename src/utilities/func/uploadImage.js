export default async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);
    // Upload the image to your server
    const response = await fetch(process.env.NEXT_PUBLIC_IMGBB_API_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    // Return the uploaded URL
    return data.data.url;
  } catch (error) {
    console.error(error);
  }
}
