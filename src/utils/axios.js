import axios from 'axios';
import { Cookies } from './cookies.js';
import router from '../router/index';

const apiPath = import.meta.env.VITE_APP_PATH;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  withCredentials: true,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },
  timeout: 20000,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (res) => {
    if (Cookies && Cookies.getCookie()) {
      const token = Cookies.getCookie();

      token && (res.headers.common.Authorization = token);

      // window.location.href = '/admin/products';
    }
    return res;
  },
  (err) => {
    // console.log(err);
    return Promise.reject(err.response.data ? err.response.data : err.response);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  async (res) => {
    return res.data ? res.data : res;
  },
  (err) => {
    // console.log(err.response);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          break;
        case 401:
          // window.location.href = '/login';
          router.push({ name: 'Login' });
          break;
        case 403:
          // window.location.href = '/login';
          router.push({ name: 'Login' });

          break;
        case 500:
          break;
        default:
          console.log(`連接錯誤${err.response.status}`);
          break;
      }
    }

    // return Error object with Promise
    return Promise.reject(err.response.data ? err.response.data : err.response);
  }
);

export { axiosInstance, apiPath };
