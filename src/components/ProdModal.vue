<script>
import { ref, onMounted } from 'vue';
import api from '../api/index.js';

import { Modal } from 'bootstrap';

export default {
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => ({
        imagesUrl: {
          type: Array,
          default: () => [],
        },
        id: {
          type: String,
          default: '',
        },
      }),
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
    const qty = ref(1);

    console.log(props.product);
    return {
      qty,
    };
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{
                product.category
              }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div class="h5" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h5" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="qty"
                    min="1"
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="$emit('add-to-cart', product.id, qty)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-group > .btn:not(:last-child):not(.dropdown-toggle),
.btn-group > .btn-group:not(:last-child) > .btn,
.btn-group > .btn:nth-child(n + 3),
.btn-group > :not(.btn-check) + .btn,
.btn-group > .btn-group:not(:first-child) > .btn {
  // border-top-right-radius: 0.25rem;
  // border-bottom-right-radius: 0.25rem;
  border-radius: 0.25rem;
  margin-right: 10px;
  min-width: 45px;
}
</style>
