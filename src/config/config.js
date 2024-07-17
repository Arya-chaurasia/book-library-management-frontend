import Axios from "axios";

const axiosInstance = () => {
  return Axios.create({
    baseURL: process.env.REACT_APP_BASEURL
  });
};

export default axiosInstance;
