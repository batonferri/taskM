import axios from "axios";

export const upload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/upload", formData);
    return res.data;
  } catch (error) {
    return error;
  }
};
