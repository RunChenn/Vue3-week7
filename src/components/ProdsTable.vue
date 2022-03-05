<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    loadingStatus: {
      type: Object,
      default: () => ({
        loadingItem: {
          type: String,
          default: '',
        },
      }),
    },
  },
  setup(props, { emit }) {
    const openModal = (id) => {
      emit('getProduct', id);
    };

    return {
      openModal,
    };
  },
};
</script>

<template>
  <div class="prodsTable">
    <div class="row">
      <div class="col-12 col-sm-12">
        <h5>產品列表</h5>
        <hr />
        <table class="table table-hover">
          <thead>
            <tr>
              <th>圖片</th>
              <th scope="col" class="text-start">產品名稱</th>
              <th scope="col">價格</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
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
              <td class="text-start">{{ item.title }}</td>
              <td>
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} 元
                </div>
                <del class="h6" v-if="item.price"
                  >原價 {{ item.origin_price }} 元</del
                >
                <div class="h5" v-if="item.price">
                  現在只要 {{ item.price }} 元
                </div>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2 mb-md-1"
                  data-bs-target="#productModal"
                  data-bs-toggle="modal"
                  @click="openModal(item.id)"
                  :disabled="loadingStatus.loadingItem === item.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></span>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm me-2 mb-md-1"
                  @click="$emit('add-to-cart', item.id)"
                  :disabled="loadingStatus.loadingItem === item.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></span>
                  加到購物車
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prodsTable {
  height: calc(100vh - 130px);
  max-height: calc(100vh - 130px);
  overflow: auto;
  table {
    vertical-align: middle;
    max-height: 300px;
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
}
</style>
