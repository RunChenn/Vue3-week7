import { axiosInstance, apiPath } from '../../utils/axios.js';

export default {
  // 取得 商品資訊
  getProducts: (page) => {
    return axiosInstance.get(`/api/${apiPath}/admin/products?page=${page}`);
  },
  // 新增 商品資訊
  addProducts: (data) => {
    return axiosInstance.post(`/api/${apiPath}/admin/product`, data);
  },
  // 編輯 商品資訊
  updateProducts: (id, data) => {
    return axiosInstance.put(`/api/${apiPath}/admin/product/${id}`, data);
  },
  // 刪除 商品資訊
  delProducts: (id) => {
    // const pathName = path ? path : apiPath;
    return axiosInstance.delete(`/api/${apiPath}/admin/product/${id}`);
  },
  // 上傳 圖片
  uploadImg: (formData) => {
    return axiosInstance.post(`/api/${apiPath}/admin/upload`, formData);
  },
};
