import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// const envConfig = loadEnv(mode, './');

// process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const env = loadEnv(mode, __dirname);

  return defineConfig({
    plugins: [vue()],
    base: process.env.NODE_ENV === 'production' ? '/Vue3-week7/' : './',
    // base:
    // process.env.NODE_ENV === 'production' ? '/Vue3-week6/' : env.VITE_APP_API,

    // base: env.VITE_APP_API,
    server: {
      host: '0.0.0.0',
      //   port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'https://vue3-course-api.hexschool.io/v2',
          changeOrigin: true, // 支持跨域
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      define: {
        // 'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) },
        'process.env': {},
      },
    },
  });
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   // 全局css
//   // css: {
//   //   preprocessorOptions: {
//   //     scss: {
//   //       additionalData: `@import "./src/scss/custom.scss";`,
//   //     },
//   //   },
//   // },

//   base: process.env.NODE_ENV === 'production' ? '/Vue3-week6/' : './',
//   server: {
//     host: '0.0.0.0',
//     //   port: 3000,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'https://vue3-course-api.hexschool.io/v2',
//         changeOrigin: true, // 支持跨域
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//     define: {
//       'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) },
//       // 'process.env': {},
//     },
//   },
// });
