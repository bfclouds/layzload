import Vue from 'vue'
import VueLayzload from './vue-layzload'
import loadingImg from './loading.gif'
import App from './App.vue'

Vue.use(VueLayzload, {
  preLoad: 0.5,
  loading: loadingImg
});

new Vue({
  el: '#app',
  render: h => h(App)
})