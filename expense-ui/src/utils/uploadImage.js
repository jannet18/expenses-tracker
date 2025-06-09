import { API_URLS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // append image file
  // console.log(response.data);
  formData.append("image", imageFile);
  try {
    const response = await axiosInstance?.post(
      API_URLS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    // const imageUrl = response.data.secure_url || response.data.url || "";
    // return { imageUrl };
    console.log(response.data);
    return response.data;
  } catch (error) {
    // throw error;
    console.log(error?.response?.data || error.message);
    return { imageUrl: "" };
  }
};

export default uploadImage;
