import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',

      component: () => import('../pages/home.vue'),
    },
    {
      path: '/Livres',
      name: 'Livres',

      component: () => import('../pages/liste.vue'),
    },
    {
      path: '/livre/:id',
      name: 'LivreDetail',
      component: () => import('../pages/detaillivre.vue'),
    },
    {
      path: '/user/:id',
      name: 'UserDetail',
      component: () => import('../pages/detailUser.vue'),
    },
  ],
})

export default router
