// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import 'vuetify/dist/vuetify.min.css';
import store from '@/store/store';
import VueYouTubeEmbed from 'vue-youtube-embed';

Vue.config.productionTip = false;

Vue.use(VueYouTubeEmbed);

Vue.use(Vuetify);

sync(store, router);

// http://docs.sequelizejs.com/manual/installation/getting-started.html
// https://vuetifyjs.com

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});

