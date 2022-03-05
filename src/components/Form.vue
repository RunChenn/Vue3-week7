<script>
import { ref } from 'vue';
import { useField, useForm, ErrorMessage } from 'vee-validate';

import * as yup from 'yup';

export default {
  name: 'Form',
  components: {
    ErrorMessage: ErrorMessage,
  },
  props: {
    cart: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['createOrder'],
  setup(props, { emit }) {
    const validObj = yup.object({
      name: yup.string().nullable().required('必填'),
      email: yup
        .string()
        .nullable()
        .required('必填')
        .email('請輸入正確的email'),
      tel: yup
        .string()
        .nullable()
        .required('必填')
        .min(8, '不能小於 8 個字元')
        .max(10, '不能大於 10 個字元'),
      address: yup.string().nullable().required('必填'),
    });

    const { errors, handleSubmit } = useForm({
      validationSchema: validObj,
    });

    const { value: email } = useField('email');
    const { value: name } = useField('name');
    const { value: tel } = useField('tel');
    const { value: address } = useField('address');
    const message = ref('');

    const createOrder = handleSubmit((values, { resetForm }) => {
      if (props.cart.carts.length === 0) return alert('購物車內無資料');

      const data = {
        user: values,
        message: message,
      };

      emit('createOrder', data);

      resetForm();
    });

    return {
      email,
      name,
      tel,
      address,
      message,
      errors,
      createOrder,
    };
  },
};
</script>

<template>
  <form ref="form" class="col-md-6" @submit.prevent="createOrder">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        class="form-control"
        placeholder="請輸入 Email"
        rules="required|email"
        v-model="email"
      />
      <div class="text-danger">{{ errors.email }}</div>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label>
      <input
        id="name"
        name="姓名"
        type="text"
        class="form-control"
        placeholder="請輸入姓名"
        rules="required"
        v-model="name"
      />
      <div class="text-danger">{{ errors.name }}</div>
    </div>

    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話</label>
      <input
        id="tel"
        name="電話"
        type="text"
        class="form-control"
        placeholder="請輸入電話"
        rules="required|min:8|max:10"
        v-model="tel"
      />
      <div class="text-danger">{{ errors.tel }}</div>

      <error-message name="電話" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label>
      <input
        id="address"
        name="地址"
        type="text"
        class="form-control"
        placeholder="請輸入地址"
        rules="required"
        v-model="address"
      />
      <div class="text-danger">{{ errors.address }}</div>
    </div>

    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <textarea
        id="message"
        class="form-control"
        cols="30"
        rows="10"
        v-model="message"
      ></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-danger">送出訂單</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  text-align: left;
  label {
    text-align: left;
  }
}
</style>
