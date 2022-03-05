import { axiosInstance } from '../utils/axios.js';

export default {
  // 檢查權限
  checkAuth: () => {
    return axiosInstance.post('/api/user/check');
  },
  // 登出
  logout: () => {
    return axiosInstance.post('/logout');
  },
};
