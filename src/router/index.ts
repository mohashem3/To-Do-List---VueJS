// import { createRouter, createWebHistory } from 'vue-router'
// import AboutView from '@/views/AboutView.vue'
// import HomeView from '@/views/HomeView.vue'
// import TaskView from '@/views/TaskView.vue'
// import LogIn from '@/components/LogIn.vue'
// import SignUp from '@/components/SignUp.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: AboutView
//     },
//     {
//       path: '/taskview',
//       name: 'taskview',
//       component: TaskView,
//       meta: { requiresAuth: true } // Mark as requiring authentication
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: LogIn
//     },
//     {
//       path: '/signup',
//       name: 'signup',
//       component: SignUp
//     }
//   ]
// })

// // Global Navigation Guard
// router.beforeEach((to, from, next) => {
//   // Check if the route requires authentication
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // Check if the user is authenticated by checking localStorage
//     if (!localStorage.getItem('authToken')) {
//       // Trigger the login popup instead of redirecting
//       const event = new CustomEvent('show-login-popup')
//       window.dispatchEvent(event)

//       // Stop navigation
//       next(false)
//     } else {
//       next() // User is authenticated, allow the navigation
//     }
//   } else {
//     next() // Route does not require authentication, proceed as usual
//   }
// })

// export default router

import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import TaskView from '@/views/TaskView.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/taskview', name: 'taskview', component: TaskView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LogIn },
  { path: '/signup', name: 'signup', component: SignUp }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = !!localStorage.getItem('authToken')

//   if (to.meta.requiresAuth && !isLoggedIn) {
//     // Store the intended path in the router query parameters
//     next({ name: 'login', query: { redirect: to.fullPath } })
//   } else {
//     next()
//   }
// })

export default router
