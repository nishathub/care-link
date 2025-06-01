import axios from "axios";

export const secureAxios = async (method, url, data, user) => {
  if (!user || user.role !== "admin") {
    alert("Admin Access Only");
    return null;
  }

  try {
    const response = await axios({
      method,
      url,
      data,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("secureAxios Error:", error.response?.data || error.message);
    throw error;
  }
};
