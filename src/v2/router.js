import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', name: 'inicio', component: HomeView, meta: { nav: 'inicio', code: '/' } },
  { path: '/servicos', name: 'servicos', component: () => import('./views/ServicesView.vue'), meta: { nav: 'servicos', code: '/servicos' } },
  { path: '/portfolio', name: 'portfolio', component: () => import('./views/PortfolioView.vue'), meta: { nav: 'portfolio', code: '/portfolio' } },
  { path: '/sobre', name: 'sobre', component: () => import('./views/AboutView.vue'), meta: { nav: 'sobre', code: '/sobre' } },
  { path: '/contato', name: 'contato', component: () => import('./views/ContactView.vue'), meta: { nav: 'contato', code: '/contato' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // A rolagem é controlada pela transição de página (App.vue) por causa do Lenis.
  scrollBehavior: () => false
})

// Links antigos do site de página única (/#servicos, /#portfolio…) continuam funcionando.
const LEGACY = { '#servicos': '/servicos', '#portfolio': '/portfolio', '#sobre': '/sobre', '#contato': '/contato' }
router.beforeEach((to) => {
  if (to.path === '/' && LEGACY[to.hash]) return { path: LEGACY[to.hash], replace: true }
})
