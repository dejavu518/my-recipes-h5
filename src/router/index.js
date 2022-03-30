import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: () =>
    import("@/views/Home")
},
{
  path: '/category',
  name: 'Category',
  component: () =>
    import("@/views/Category")
},
{
  path: '/detail',
  name: 'Detail',
  component: () =>
    import("@/views/Detail")
},
{
  path: '/cooking',
  name: 'Cooking',
  component: () =>
    import("@/views/Cooking")
},


]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router