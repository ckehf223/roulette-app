import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  clearRefreshToken,
} from "/src/auth/Auth";

const instance = axios.create({
  baseURL: "https://api.urroulette.com/api",
  // baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       (error.response.status === 401 || error.response.status === 403) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post(
//           "/api/refresh",
//           {},
//           { withCredentials: true }
//         );
//         if (response.status === 200) {
//           const newAccessToken = response.headers["authorization"];
//           setAccessToken(newAccessToken);
//           instance.defaults.headers.Authorization = `${newAccessToken}`;
//           originalRequest.headers.Authorization = `${newAccessToken}`;
//           return instance(originalRequest);
//         }
//       } catch (refreshError) {
//         await axios
//           .post("/api/deleteRefresh", {}, { withCredentials: true })
//           .then((response) => {
//             removeAccessToken();
//             clearRefreshToken();
//             window.location.href = "/login";
//           })
//           .catch((error) => {
//             removeAccessToken();
//             clearRefreshToken();
//             window.location.href = "/login";
//           });
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
