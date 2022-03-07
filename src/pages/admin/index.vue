<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api/index.js';
import Navbar from '../../components/Navbar.vue';

export default {
  name: 'admin',
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const checkSuccess = ref(false);

    onMounted(async () => {
      try {
        // 檢查權限
        await api.auth.checkAuth();

        checkSuccess.value = true;
      } catch (err) {
        alert(err.message);
      }
    });

    const signout = async () => {
      try {
        await api.auth.logout();
        router.push({ name: 'Login' });
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      checkSuccess,
      signout,
    };
  },
};
</script>

<template>
  <div>
    <Navbar />
    <div class="container-fluid mt-3 position-relative">
      <router-view />
    </div>
  </div>
</template>
