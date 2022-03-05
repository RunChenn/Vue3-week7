import { createRouter, createWebHistory } from 'vue-router';
import { Cookies } from '../utils/cookies';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../pages/Index.vue'),
        meta: {
          layout: 'index',
          requiresAuth: false,
        },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../pages/Products.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      // {
      //   path: '/product/:id',
      //   name: '產品頁面',
      //   component: () => import('../pages/Product.vue'),
      // },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../pages/Cart.vue'),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      layout: 'Login',
      requiresAuth: false,
    },
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../pages/admin/index.vue'),
    children: [
      {
        path: 'products',
        name: 'admin-Products',
        component: () => import('../pages/admin/Products.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'admin-Orders',
        component: () => import('../pages/admin/Orders.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/Vue3-week7/'),
  // history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
  // console.log('to=', to.fullPath, '| from=', from.fullPath);
  // console.log(
  //   to.matched.some((record) => {
  //     console.log(record.name, record.meta.requiresAuth);
  //     return record.meta.requiresAuth;
  //   })
  // );
  if (
    to.matched.some((record) => {
      // console.log(record.name, record.meta.requiresAuth);
      return record.meta.requiresAuth;
    })
  ) {
    // 如果沒有 token
    // console.log('token?', Cookies.getCookie());
    if (Cookies.getCookie() === '') {
      // 轉跳到 login page
      next({ name: 'Login' });
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }
});

export default router;
