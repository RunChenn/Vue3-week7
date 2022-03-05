<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Cookies, tokenName } from '../../utils/cookies.js';
import api from '../../api/index.js';

// 驗證可以寫這邊
export default {
  name: 'admin',
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
    <h1>你現在在後台頁面</h1>
    <div id="nav">
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/admin/orders">後台訂單</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>
