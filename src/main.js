import loader from './loader'

loader.createEl().then(id => {
  window.id = id
  require('./app')
})
