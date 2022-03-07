<script>
import Pagination from '../../components/Pagination.vue';
import DelModal from '../../components/admin/DelModal.vue';
import OrderModal from '../../components/admin/OrderModal.vue';
import api from '../../api/index.js';

import { Modal } from 'bootstrap';

import { ref, onMounted } from 'vue';

export default {
  components: {
    Pagination,
    OrderModal,
    DelModal,
  },
  name: 'admin-Orders',
  setup() {
    const isLoading = ref(false);

    const orderModal = ref({});
    const delModal = ref({});

    const orders = ref({});

    const isNew = ref(false);

    const pagination = ref({});

    const tempOrder = ref({});

    const currentPage = ref(1);

    onMounted(async () => {
      orderModal.value = new Modal(document.getElementById('orderModal'), {
        keyboard: false,
      });

      delModal.value = new Modal(document.getElementById('delModal'), {
        keyboard: false,
      });

      isLoading.value = true;

      try {
        // 檢查權限
        await api.auth.checkAuth();
        getOrders();
        isLoading.value = false;
      } catch (err) {
        console.log(err);
        alert(err.message);
        isLoading.value = false;
      }
    });

    // 載入所有訂單
    const getOrders = async (page = 1) => {
      currentPage.value = page;

      isLoading.value = true;

      try {
        const ordersData = await api.adminOrder.getOrders(page);

        orders.value = ordersData.orders;
        pagination.value = ordersData.pagination;

        isLoading.value = false;
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    const openModal = (item) => {
      isNew.value = false;

      tempOrder.value = { ...item };
    };

    const updatePaid = async (item) => {
      isLoading.value = true;

      try {
        const res = await api.adminOrder.updateOrders(item.id, {
          data: {
            is_paid: item.is_paid,
          },
        });

        isLoading.value = false;

        alert(res.message);

        orderModal.value.hide();

        getOrders(currentPage.value);
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    const delOrder = async () => {
      try {
        const res = await api.adminOrder.delOrder(tempOrder.value.id);

        isLoading.value = false;

        alert(res.message);

        delModal.value.hide();

        getOrders(currentPage.value);
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    return {
      orders,
      tempOrder,
      isLoading,
      getOrders,
      pagination,
      openModal,
      updatePaid,
      delOrder,
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
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">購買時間</th>
              <th scope="col">Email</th>
              <th scope="col">購買款項</th>
              <th scope="col">應付金額</th>
              <th scope="col">是否付款</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, key) in orders" :key="key">
              <tr
                v-if="orders.length"
                :class="{ 'text-primary': !item.is_paid }"
              >
                <td>{{ $filters.date(item.create_at) }}</td>
                <td><span v-text="item.user.email" v-if="item.user"></span></td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="(product, i) in item.products" :key="i">
                      {{ product.product.title }} 數量：{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td class="text-right">{{ item.total }}</td>
                <td>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="`paidSwitch${item.id}`"
                      v-model="item.is_paid"
                      @change="updatePaid(item)"
                    />
                    <label
                      class="form-check-label"
                      :for="`paidSwitch${item.id}`"
                    >
                      <span v-if="item.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      type="button"
                      data-bs-target="#orderModal"
                      data-bs-toggle="modal"
                      @click="openModal(item)"
                    >
                      檢視
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm"
                      type="button"
                      data-bs-target="#delModal"
                      data-bs-toggle="modal"
                      @click="openModal(item)"
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination> -->
    <Pagination v-model:pages="pagination" @update-pages="getOrders" />

    <!-- Modal -->
    <OrderModal
      v-model:order="tempOrder"
      ref="orderModal"
      @update-paid="updatePaid"
    />
    <!-- delModal -->
    <DelModal ref="delModal" v-model:item="tempOrder" @del-item="delOrder" />
  </div>
</template>
