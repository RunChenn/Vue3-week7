import { axiosInstance, apiPath } from '../utils/axios.js';

export default {
  // 取得 購物車商品
  getCart: () => {
    return axiosInstance.get(`/api/${apiPath}/cart`);
  },
  // 加入 購物車
  addCart: (data) => {
    return axiosInstance.post(`/api/${apiPath}/cart`, data);
  },
  // 更新 購物車
  updateCart: (id, data) => {
    return axiosInstance.put(`/api/${apiPath}/cart/${id}`, data);
  },
  // 移除 購物車特定商品
  removeCartItem: (id) => {
    return axiosInstance.delete(`/api/${apiPath}/cart/${id}`);
  },
  // 清空 購物車
  removeCartAll: () => {
    return axiosInstance.delete(`/api/${apiPath}/carts`);
  },
};
