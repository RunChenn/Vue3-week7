import { defineRule, configure, ErrorMessage, Form, Field } from 'vee-validate';
import { required, email, min, max } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

configure({
  generateMessage: localize('zh_TW'),
});

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

Vue.component('VForm', Form);
Vue.component('VField', Field);
Vue.component('ErrorMessage', ErrorMessage);

export default {
  install(app) {
    app.component('VForm', Form);
    app.component('VField', Field);
    app.component('ErrorMessage', ErrorMessage);

    // defineRule('required', required);
    // defineRule('email', email);
    // defineRule('min', min);
    // defineRule('max', max);
  },
};

// defineRule('required', (value) => {
//   if (!value || !value.length) {
//     return 'This field is required';
//   }
//   return true;
// });
// defineRule('email', (value) => {
//   // Field is empty, should pass
//   if (!value || !value.length) {
//     return true;
//   }
//   // Check if email
//   if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
//     return 'This field must be a valid email';
//   }
//   return true;
// });
