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
      path: '/livres',
      name: 'Livres',
      component: () => import('../pages/liste.vue'),
    },
    {
      path: '/livre/:id',
      name: 'LivreDetail',
      component: () => import('../pages/detaillivre.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/user/:id',
      name: 'UserDetail',
      component: () => import('../pages/detailUser.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add',
      name: 'AjoutLivre',
      component: () => import('../pages/ajoutLivre.vue'),
      meta: { requiresAuth: true}
    },
  ],
})

// LE NAVIGATION GUARD : C'est ici que la magie opère
router.beforeEach((to, from, next) => {
  // On vérifie si l'utilisateur est stocké dans le localStorage
  const loggedInUser = localStorage.getItem('user')

  // Si la route demande d'être connecté et que l'utilisateur ne l'est pas
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedInUser) {
    next({ path: from.path, query: { authRequired: 'true' } })
  } else {
    // Sinon, on le laisse passer
    next()
  }
})

export default router
