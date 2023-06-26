import axios from "axios";
// import { useAuthContext } from "../contexts/auth-context";

// const authContext = useAuthContext();

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
console.log("token", token);

const axiosInstance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://ec2-43-201-23-87.ap-northeast-2.compute.amazonaws.com:8080",
  // baseURL: "http://localhost:8080",
  baseURL: "http://121.165.252.83:8899",
  headers: {
    Authorization: token ? `Bearer ${token}` : ""
  }
});

axiosInstance.interceptors.request.use((req) => {
  if (typeof window !== "undefined" && localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

// axiosInstance.interceptors.request.use((req) => {
//   if (authContext.token) {
//     req.headers.Authorization = `Bearer ${auth.token}`;
//   }
//   return req;
// });

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error?.response?.status;
    const path = error?.response?.data?.path ?? "";
    if ((status === 401) & (path !== "/api/admin/changePassword")) {
      localStorage.clear();
      //   authContext.signOutByPass();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
