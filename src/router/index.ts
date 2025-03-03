import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import ScanView from '@/views/EditView.vue'
import PlayView from '@/views/PlayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias:["/home"],
      component:  () => import("@/views/HomeView.vue")
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/SearchView.vue")
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import("@/views/EditView.vue"),
      children:[
        {
          path: '/add',
          name: 'add',
          component: () => import("@/views/AddView.vue")
        },
        {
          path: '/modify',
          name: 'modify',
          component: () => import("@/views/ModifyView.vue")
        },
      ]
    },
    {
      path: '/play',
      name: 'play',
      component: () => import("@/views/PlayView.vue")
    },
    {
      path: '/test',
      name: 'test',
      component: () => import("@/views/Test.vue")
    },
  ]
})

export default router
