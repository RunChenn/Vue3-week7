<script>
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <div
    id="delModal"
    ref="delModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delModalLabel" class="modal-title">
            <span>刪除 {{ item.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <strong class="text-danger">是否刪除 {{ item.title }}</strong>
          <br />刪除後將無法恢復
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-danger"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('del-item')"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
