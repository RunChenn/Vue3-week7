<script>
import { ref, onBeforeMount } from 'vue';
import api from '../api/index.js';
import { useRouter } from 'vue-router';

export default {
  components: {},
  name: 'Index',
  setup() {
    const router = useRouter();
    const isLoading = ref(false);

    onBeforeMount(async () => {
      isLoading.value = true;

      try {
        // 檢查權限
        await api.auth.checkAuth();

        isLoading.value = false;
        router.push({ name: 'admin-Products' });
      } catch (err) {
        isLoading.value = false;
        alert(err.message);
      }
    });
    return {};
  },
};
</script>

<template>
  <div class="container">
    <!-- Loading -->
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <div class="row justify-content-center">
      <div class="col"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
