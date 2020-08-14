import Vue from 'vue';
import VueRouter from 'vue-router';

import Auth from '@/components/Auth.vue'
import Home from '@/components/Home.vue'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'auth',
      component: Auth
    }
  ]
})