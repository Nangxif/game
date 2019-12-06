import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Colors from '../views/Colors.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/colors',
    name: 'colors',
    component: Colors
  }
];

const router = new VueRouter({
  routes
});

export default router;
