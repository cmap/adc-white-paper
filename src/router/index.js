// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/adc-whitepaper',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  base: "adc-whitepaper",
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
