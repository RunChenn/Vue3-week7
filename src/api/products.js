import { axiosInstance, apiPath } from '../utils/axios.js';

export default {
  // 取得 所有商品資訊
  getProductsAll: () => {
    return axiosInstance.get(`/api/${apiPath}/products/all`);
  },
  // 取得 商品資訊
  getProduct: (id) => {
    return axiosInstance.get(`/api/${apiPath}/product/${id}`);
  },
};
