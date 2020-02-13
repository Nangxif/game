import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Colors from '../views/Colors.vue';
import Bigsmall from '../views/Bigsmall.vue';
import InputV from '../views/InputV.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/inputv',
    name: 'InputV',
    component: InputV
  },
  {
    path: '/colors',
    name: 'colors',
    component: Colors
  },
  {
    path: '/bigsmall',
    name: 'bigsmall',
    component: Bigsmall
  }
];

const router = new VueRouter({
  routes
});

export default router;
