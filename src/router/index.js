import { LOGIN_PATH } from '../constant'
import Dashboard from '../pages/dashboard/Dashboard.vue'
import Account from '../pages/account/Index.vue'
import Login from '../pages/login/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      icon : 'fa-home'
    }
  },
  {
    path: '/users',
    component: Account,
    meta: {
      title: 'Accounts',
      icon : 'fa-users'
    }
  },
  {
    path: LOGIN_PATH,
    component: Login,
    meta: {
      title: 'Login',
      guest: true
    }
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
    routes
})


export {
  router,
  routes
}
