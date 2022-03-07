import { axiosInstance, apiPath } from '../../utils/axios.js';

export default {
  // 取得 優惠券資訊
  getCoupons: (page) => {
    return axiosInstance.get(`/api/${apiPath}/admin/coupons?page=${page}`);
  },
  // 新增 優惠券資訊
  addCoupon: (id, data) => {
    return axiosInstance.put(`/api/${apiPath}/admin/coupon`, data);
  },
  // 編輯 優惠券資訊
  updateCoupon: (id, data) => {
    console.log(data);
    return axiosInstance.put(`/api/${apiPath}/admin/coupon/${id}`, data);
  },
  // 刪除 優惠券資訊
  delCoupon: (id) => {
    return axiosInstance.delete(`/api/${apiPath}/admin/coupon/${id}`);
  },
};
