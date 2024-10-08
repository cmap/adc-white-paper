// Composables
import { createRouter, createWebHistory } from 'vue-router'
const AdcWhitePaper = () => import('@/views/AdcWhitePaper.vue')
const CpsWhitePaper = () => import('@/views/CpsWhitePaper.vue')



const routes = [
  {
    path: '/white-papers',
    children: [
      {
        path: 'prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets',
        name: 'AdcWhitePaper',
        component: AdcWhitePaper
      },
      {
        path: 'multiplexed-cancer-cell-line-combination-screening-using-prism',
        name: 'CpsWhitePaper',
        component: CpsWhitePaper
      },
      {
        path: 'prism-extended-day-assay',
        name: 'EpsWhitePaper',
        component: () => import('@/views/EpsWhitePaper.vue')
      },
      {
        path: 'lattice-demo',
        name: 'LatticeDemo',
        component: () => import('@/views/LatticeDemo.vue')
      },
      {
        path: 'lattice-demo2',
        name: 'LatticeDemo2',
        component: () => import('@/views/LatticeDemo2.vue')
      }
    ],
  },
  {

  }
]

const router = createRouter({
  base: "white-papers",
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
