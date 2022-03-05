import { axiosInstance, apiPath } from '../utils/axios.js';

export default {
  // 結帳
  addOrder: (data) => {
    return axiosInstance.post(`/api/${apiPath}/order`, data);
  },
};
