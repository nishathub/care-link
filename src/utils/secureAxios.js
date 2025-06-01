import axios from "axios";

export const secureAxios = async (method, url, data = null, user) => {
  // Role-based access control
  const methodLower = method.toLowerCase();

  if (methodLower === "delete") {
    console.log(user);
    if (!user?.rank || user.rank !== "chief") {
      alert("Unauthorized Access.");
      return null;
    }
  } else {
    if (!user || user.role !== "admin") {
      alert("Unauthorized Access");
      return null;
    }
  }

  // Axios request configuration
  const config = {
    method,
    url,
    withCredentials: true,
  };

  // add data field for relevant operations
  if (["post", "put", "patch"].includes(methodLower) && data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("secureAxios Error:", error.response?.data || error.message);
    throw error;
  }
};
