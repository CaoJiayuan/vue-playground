import { routes } from '../router'

const HomeApi = {
  getNavigation () {
    return getNavFromRoutes()
    // return axios.get('/navigation').then(response => response.data)
  },
}

function getNavFromRoutes () {
  let result = []
  routes.forEach(route => {
    route.path !== '*' && route.meta.guest !== true && result.push({
      path: route.path,
      name: route.path,
      display_name: route.meta.title,
      icon: route.meta.icon,
    })
  })

  return Promise.resolve(result)
}

export default HomeApi
