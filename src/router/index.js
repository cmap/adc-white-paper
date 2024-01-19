// Composables
import { createRouter, createWebHistory } from 'vue-router'
const AdcWhitePaper = () => import('@/views/AdcWhitePaper.vue')
const CpsWhitePaper = () => import('@/views/CpsWhitePaper.vue')



const routes = [
  {
    path: '/adc-whitepaper',
    children: [
      {
        path: 'prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets',
        name: 'AdcWhitePaper',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: AdcWhitePaper
      },
      {
        path: 'multiplexed-cancer-cell-line-combination-screening-using-prism',
        name: 'CpsWhitePaper',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: CpsWhitePaper
      },
    ],
  },
  {
    
  }
]

const router = createRouter({
  base: "adc-whitepaper",
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
