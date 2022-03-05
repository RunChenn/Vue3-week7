<script>
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';

import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: { Loading, Carts, Form },
  name: 'Products',
  setup() {
    const isLoading = ref(false);
    const fullPage = ref(true);

    const cart = ref({});

    const loadingStatus = reactive({
      loadingItem: '',
    });

    onMounted(async () => {
      isLoading.value = true;

      getCart();

      isLoading.value = false;
    });

    // 取得 購物車商品
    const getCart = async () => {
      try {
        const res = await api.cart.getCart();

        cart.value = res.data;
      } catch (err) {
        alert(err.message);
      }
    };

    // 加入購物車
    const addToCart = async (id, qty = 1) => {
      productModal.value.hide();
      try {
        loadingStatus.loadingItem = id;

        const cart = {
          product_id: id,
          qty,
        };

        const res = await api.cart.addCart({ data: cart });

        alert(res.message);

        loadingStatus.loadingItem = '';

        getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    // 移除 購物車特定商品
    const removeCartItem = async (id) => {
      try {
        const res = await api.cart.removeCartItem(id);

        loadingStatus.loadingItem = id;

        alert(res.message);
        loadingStatus.loadingItem = '';
        getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    // 清空 購物車
    const removeCartAll = async () => {
      try {
        const res = await api.cart.removeCartAll();

        alert(res.message);
        getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    // 更新 購物車
    const updateCart = async (data) => {
      try {
        loadingStatus.loadingItem = data.id;

        const cart = {
          product_id: data.product_id,
          qty: data.qty,
        };

        const res = await api.cart.updateCart({ data: cart });

        alert(res.message);
        loadingStatus.loadingItem = '';
        getCart();
      } catch (err) {
        loadingStatus.loadingItem = '';
        alert(err.message);
      }
    };

    const createOrder = async (order) => {
      isLoading.value = true;

      try {
        const res = await api.order.addOrder({ data: order });

        alert(res.message);

        getCart();
        isLoading.value = false;
      } catch (err) {
        loadingStatus.loadingItem = '';
        isLoading.value = false;
        alert(err.message);
      }
    };

    return {
      isLoading,
      fullPage,
      cart,
      loadingStatus,
      getCart,
      addToCart,
      removeCartItem,
      removeCartAll,
      updateCart,
      createOrder,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-4">
      <!-- Loading -->
      <Loading v-model:active="isLoading" :is-full-page="fullPage" />

      <!-- 購物車列表 -->
      <Carts
        v-model:cart="cart"
        v-model:loadingStatus="loadingStatus"
        @remove-cart-item="removeCartItem"
        @remove-cart-all="removeCartAll"
        @update-cart="updateCart"
      />
    </div>
    <div class="my-5 row justify-content-center">
      <!-- 表單 -->
      <Form @create-order="createOrder" v-model:cart="cart" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  vertical-align: middle;
}
img {
  max-width: 100%;

  object-fit: contain;
}

.primary-image {
  height: 300px;
}

.form-check-label span.checked {
  color: #198754;
}

.images {
  height: 150px;
}
.form-check-input:checked {
  border-color: #198754;
  background-color: #198754;
}
</style>
