import axios from "axios";

export const ApiClient = axios.create({ baseURL: "http://localhost:3456/api" });

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (err) => {
    const errorResponseCodes = [401, 500, 409, 400, 404];
    const serverResponseStatusCode = err?.response?.status;

    if (errorResponseCodes.includes(serverResponseStatusCode)) {
      alert(err?.response?.data?.message);
    } else {
      console.log(err);
    }
  }
);
