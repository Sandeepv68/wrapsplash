import { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  url: "",
  method: "",
  baseURL: "",
  headers: {},
  data: {},
  timeout: 1000,
  withCredentials: false,
  responseType: "json",
  responseEncoding: "utf8",
  validateStatus: function (status: number) {
    return status >= 200 && status < 300;
  },
  maxRedirects: 5,
  socketPath: null,
};

export default axiosConfig;
