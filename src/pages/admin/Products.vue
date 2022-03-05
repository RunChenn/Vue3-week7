<script>
import Pagination from '../..//components/Pagination.vue';
import api from '../../api/index.js';

import { ref, onMounted } from 'vue';

export default {
  components: {
    Pagination,
  },
  name: 'admin-Products',
  props: ['token'],
  setup() {
    const products = ref([]);

    const pagination = ref({});

    onMounted(async () => {
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
      try {
        const prodsData = await api.adminProducts.getProducts(page);

        products.value = prodsData.products;
        pagination.value = prodsData.pagination;
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      products,
      pagination,
      getData,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row py-1">
      <div class="col-12 col-sm-12">
        這裡是 後台 產品列表
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col" class="text-start">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">是否啟用</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination> -->
    <Pagination v-model:pages="pagination" @update-pages="getData" />
  </div>
</template>
