import axios, { AxiosError, AxiosResponse } from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();
// axios.defaults.headers.common["x-auth-token"] = cookies.get("token");
// HttpService
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
    //   toast.error("An unexpected error occurred!");
    }

    console.log(error.response?.status);
    console.log(error);
    return Promise.reject(error);
  }
);

