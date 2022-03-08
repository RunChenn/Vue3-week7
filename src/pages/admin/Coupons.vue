<script>
import Pagination from '../../components/Pagination.vue';
import CouponModal from '../../components/admin/CouponModal.vue';
import DelModal from '../../components/admin/DelModal.vue';
import api from '../../api/index.js';
import { Modal } from 'bootstrap';
import { ref, onMounted } from 'vue';

export default {
  components: {
    Pagination,
    CouponModal,
    DelModal,
  },
  name: 'admin-Coupons',
  setup() {
    const isLoading = ref(false);

    const isNew = ref(false);

    const couponModal = ref({});
    const delModal = ref({});

    const pagination = ref({});

    const coupons = ref({});

    const tempCoupon = ref({
      title: '',
      is_enabled: 0,
      percent: 100,
      code: '',
    });

    const currentPage = ref(1);

    onMounted(async () => {
      couponModal.value = new Modal(document.getElementById('couponModal'), {
        keyboard: false,
      });

      delModal.value = new Modal(document.getElementById('delModal'), {
        keyboard: false,
      });

      try {
        // 檢查權限
        await api.auth.checkAuth();
        getCoupons();
      } catch (err) {
        alert(err.message);
      }
    });

    // 載入所有優惠券
    const getCoupons = async (page = 1) => {
      currentPage.value = page;

      isLoading.value = true;

      try {
        const couponsData = await api.adminCoupon.getCoupons(page);

        coupons.value = couponsData.coupons;
        pagination.value = couponsData.pagination;

        isLoading.value = false;
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    const openCouponModal = (status, item) => {
      isNew.value = status === 'new' ? true : false;

      tempCoupon.value =
        status === 'new'
          ? {
              due_date: new Date().getTime() / 1000,
            }
          : { ...item };
    };

    // 新增/編輯 商品
    const updateCoupon = async () => {
      isLoading.value = true;

      let data = tempCoupon.value;

      // 新增
      if (isNew.value) {
        try {
          const res = await api.adminCoupon.updateCoupon(tempCoupon.value.id, {
            data,
          });

          alert(res.message);

          getCoupons();

          isLoading.value = false;

          couponModal.value.hide();
        } catch (err) {
          alert(err.message);
          isLoading.value = false;
        }

        return;
      }

      // 編輯
      try {
        data = tempCoupon.value;

        const res = await api.adminCoupon.updateCoupon(tempCoupon.value.id, {
          data,
        });

        alert(res.message);

        isLoading.value = false;

        couponModal.value.hide();
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    const delCoupon = async () => {
      try {
        const res = await api.adminCoupon.delCoupon(tempCoupon.value.id);

        isLoading.value = false;

        alert(res.message);

        delModal.value.hide();

        getCoupons(currentPage.value);
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      isNew,
      getCoupons,
      pagination,
      openCouponModal,
      updateCoupon,
      delCoupon,
      coupons,
      tempCoupon,
    };
  },
};
</script>

<template>
  <div class="container">
    <!-- Loading -->
    <Loading v-model:active="isLoading" :is-full-page="true" />

    <div class="row py-1">
      <div class="col-12 col-sm-12">
        <div class="text-end mb-3">
          <button
            type="button"
            class="btn btn-success"
            @click="openCouponModal('new')"
            data-bs-toggle="modal"
            data-bs-target="#couponModal"
          >
            建立新的優惠券
          </button>
        </div>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">名稱</th>
              <th scope="col">折扣百分比</th>
              <th scope="col">到期日</th>
              <th scope="col">是否啟用</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in coupons" :key="key">
              <td>{{ item.title }}</td>
              <td>{{ item.percent }}%</td>
              <td>{{ $filters.date(item.due_date) }}</td>
              <td>
                <span v-if="item.is_enabled === 1" class="text-success"
                  >啟用</span
                >
                <span v-else class="text-muted">未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    data-bs-target="#couponModal"
                    data-bs-toggle="modal"
                    @click="openCouponModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    data-bs-target="#delModal"
                    data-bs-toggle="modal"
                    @click="openCouponModal('delete', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination> -->
    <Pagination v-model:pages="pagination" @update-pages="getCoupons" />

    <CouponModal
      v-model:coupon="tempCoupon"
      v-model:is-new="isNew"
      ref="couponModal"
      @update-coupon="updateCoupon"
    />

    <DelModal v-model:item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>
