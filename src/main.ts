import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import './assets/main.css'
import store from './store';

const app = createApp(App)


app.use(store)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)


app.mount('#app')
