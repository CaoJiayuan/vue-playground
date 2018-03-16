import App from './App.vue'
import {router} from './router'
import store from './store';
import {Storage} from './app/utils'
require('./app/request');
require('./assets/style/app.sass')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Storage)
new Vue({
  el: `#${id}`,
  router,
  store,
  components: { App },
  template: '<App/>'
})
