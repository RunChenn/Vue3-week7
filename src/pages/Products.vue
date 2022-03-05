<script>
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';

import { Modal } from 'bootstrap';

import ProdsTable from '../components/ProdsTable.vue';
import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import ProdModal from '../components/ProdModal.vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: { Loading, ProdModal, ProdsTable, Carts, Form },
  name: 'Products',
  setup() {
    const isLoading = ref(false);
    const fullPage = ref(true);

    const products = ref([]);
    const product = ref({});
    const cart = ref({});

    const productModal = ref(null);

    const loadingStatus = reactive({
      loadingItem: '',
    });

    onMounted(async () => {
      isLoading.value = true;

      productModal.value = new Modal(document.getElementById('productModal'), {
        keyboard: false,
      });

      getProducts();
      // getCart();

      isLoading.value = false;
    });

    // 載入所有商品
    const getProducts = async () => {
      try {
        const prodsData = await api.products.getProductsAll();

        products.value = prodsData.products;
      } catch (err) {
        alert(err.message);
      }
    };

    // 載入單一商品
    const getProduct = async (id) => {
      loadingStatus.loadingItem = id;

      try {
        const prodsData = await api.products.getProduct(id);

        loadingStatus.loadingItem = '';

        product.value = prodsData.product;
      } catch (err) {
        alert(err.message);
      }
    };

    // 取得 購物車商品
    // const getCart = async () => {
    //   try {
    //     const res = await api.cart.getCart();

    //     cart.value = res.data;
    //   } catch (err) {
    //     alert(err.message);
    //   }
    // };

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

        // getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      // ...toRefs(form),
      isLoading,
      fullPage,
      products,
      product,
      cart,
      loadingStatus,
      getProduct,
      // getCart,
      addToCart,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-4">
      <!-- Loading -->
      <Loading v-model:active="isLoading" :is-full-page="fullPage" />

      <!-- 產品列表 -->
      <ProdsTable
        v-model:products="products"
        v-model:loadingStatus="loadingStatus"
        @get-product="getProduct"
        @add-to-cart="addToCart"
      />
      <!-- @get-cart="getCart" -->
    </div>

    <!-- Modal -->
    <ProdModal
      v-model:product="product"
      @add-to-cart="addToCart"
      v-model:loadingStatus="loadingStatus"
    />
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
