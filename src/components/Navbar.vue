<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/index.js';

export default {
  name: 'admin',
  setup() {
    const router = useRouter();
    const checkSuccess = ref(false);

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
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand text-secondary" href="#">Navigant</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse text-white" id="navbar">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link text-white"
            >產品</router-link
          >
          <router-link to="/admin/orders" class="nav-link text-white"
            >訂單</router-link
          >
          <router-link to="/admin/coupons" class="nav-link text-white"
            >優惠券</router-link
          >
          <!-- <router-link to="/admin/article" class="nav-link">貼文</router-link> -->
          <a href="#" @click.prevent="logout" class="nav-link text-white"
            >登出</a
          >
        </div>
        <!-- <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link text-white">前台頁面</router-link>
          <router-link to="/cart" class="nav-link text-white"
            >購物車</router-link
          >
        </div> -->
      </div>
    </div>
  </nav>
</template>
