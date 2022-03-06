import { axiosInstance, apiPath } from '../../utils/axios.js';

export default {
  // 取得 訂單資訊
  getOrders: (page) => {
    return axiosInstance.get(`/api/${apiPath}/admin/orders?page=${page}`);
  },
  // 編輯 訂單資訊
  updateOrders: (id, data) => {
    return axiosInstance.put(`/api/${apiPath}/admin/order/${id}`, data);
  },
  // 刪除 訂單資訊
  delOrder: (id) => {
    return axiosInstance.delete(`/api/${apiPath}/admin/order/${id}`);
  },
  // 刪除 全部訂單資訊
  delOrdersAll: (id) => {
    return axiosInstance.delete(`/api/${apiPath}/admin/orders/all`);
  },
};
