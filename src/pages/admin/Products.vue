<script>
import Pagination from '../../components/Pagination.vue';
import ProdModal from '../../components/admin/ProdModal.vue';
import DelModal from '../../components/admin/DelModal.vue';
import api from '../../api/index.js';
import { Modal } from 'bootstrap';

import { ref, onMounted } from 'vue';

export default {
  components: {
    Pagination,
    ProdModal,
    DelModal,
  },
  name: 'admin-Products',
  props: ['token'],
  setup() {
    const isLoading = ref(false);

    const products = ref([]);

    const productModal = ref({});
    const delModal = ref({});

    const pagination = ref({});

    const isNew = ref(false);

    const product = ref({ imagesUrl: [], id: '' });

    onMounted(async () => {
      productModal.value = new Modal(
        document.getElementById('adminProductModal'),
        {
          keyboard: false,
        }
      );

      delModal.value = new Modal(document.getElementById('delModal'), {
        keyboard: false,
      });

      try {
        // 檢查權限
        await api.auth.checkAuth();
        getData();
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    });

    // 載入所有商品
    const getData = async (page = 1) => {
      isLoading.value = true;
      try {
        const prodsData = await api.adminProducts.getProducts(page);

        products.value = prodsData.products;
        pagination.value = prodsData.pagination;
        isLoading.value = false;
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    const openModal = (status, item) => {
      isNew.value = status === 'new' ? true : false;

      product.value =
        status === 'new'
          ? {
              imagesUrl: [],
            }
          : { ...item };
    };

    // 新增圖片
    const createImages = () => {
      product.value.imagesUrl = [];
      product.value.imagesUrl.push('');
    };

    // 新增/編輯 商品
    const updateProduct = async () => {
      // 新增
      if (isNew.value) {
        try {
          const res = await api.adminProducts.addProducts({
            data: product.value,
          });

          alert(res.message);

          productModal.value.hide();

          getData();
        } catch (err) {
          alert(err.message);
        }
        return;
      }

      // 編輯
      try {
        const res = await api.adminProducts.updateProducts(product.value.id, {
          data: product.value,
        });

        alert(res.message);

        productModal.value.hide();

        getData();
      } catch (err) {
        alert(err.message);
      }
    };

    // 刪除商品
    const delProduct = async () => {
      isLoading.value = true;

      try {
        const res = await api.adminProducts.delProducts(product.value.id);

        alert(res.message);

        isLoading.value = false;

        delModal.value.hide();
        getData();
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      products,
      product,
      pagination,
      isNew,
      getData,
      openModal,
      createImages,
      updateProduct,
      delProduct,
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
            @click="openModal('new')"
            data-bs-toggle="modal"
            data-bs-target="#adminProductModal"
          >
            建立新的產品
          </button>
        </div>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">圖片</th>
              <th scope="col" class="text-start">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">是否啟用</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td style="width: 200px">
                <div
                  style="
                    height: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </td>
              <td>{{ item.title }}</td>
              <td class="text-end">
                {{ item.origin_price }}
              </td>
              <td class="text-end">
                {{ item.price }}
              </td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2 mb-md-1"
                  data-bs-target="#adminProductModal"
                  data-bs-toggle="modal"
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm me-2 mb-md-1"
                  data-bs-target="#delModal"
                  data-bs-toggle="modal"
                  @click="openModal('delete', item)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination> -->
    <Pagination v-model:pages="pagination" @update-pages="getData" />

    <!-- Modal -->
    <ProdModal
      v-model:product="product"
      v-model:is-new="isNew"
      @updateProduct="updateProduct"
    />
    <!-- delModal -->
    <DelModal ref="delModal" v-model:item="product" @del-item="delProduct" />
  </div>
</template>
