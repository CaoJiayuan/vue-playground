import { createEl } from './cdn-loader'

createEl().then(id => {
  window.id = id
  require('./app')
})
