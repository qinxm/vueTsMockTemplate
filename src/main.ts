import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './mock';
import components from '@/components'

import Element from 'element-ui';
import '@/styles/element-variables.scss';
import '@/styles/index.scss';
import * as filters from '@/filters'
import { Message } from 'element-ui'
Vue.use(Element, {
  size: 'small'
});
Vue.use(components);

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
