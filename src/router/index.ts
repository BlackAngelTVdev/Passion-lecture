import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/books',
      name: 'Books',
      component: () => import('../pages/List.vue'),
    },
    {
      path: '/books/add',
      name: 'AddBook',
      component: () => import('../pages/AddBook.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/books/:id',
      name: 'BookDetail',
      component: () => import('../pages/BookDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/books/:id/edit',
      name: 'EditBook',
      component: () => import('../pages/EditBook.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users/:id',
      name: 'UserDetail',
      component: () => import('../pages/UserDetail.vue'),
      meta: { requiresAuth: true },
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
