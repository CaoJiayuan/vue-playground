import App from './App.vue'
import {router} from './router'
import store from './store';
require('./app/request');
require('./assets/style/app.sass')

Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  el: `#${id}`,
  router,
  store,
  components: { App },
  template: '<App/>'
})
