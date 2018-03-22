import cdn from './cdn'
import {fastRandom} from '../app/utils'
require('es6-promise').polyfill();
function createEl() {
  return new Promise(resolve => {
    let app = document.createElement('div');
    document.body.appendChild(app);
    loadStatic().then(() => {
      // let id = 'app-' + md5(new Date().getTime());
      let id = 'app-' + fastRandom();
      app.id = id;
      resolve(id)
    });
  })
}

function loadStatic() {
  return loadScripts(cdn.js)
    .then(() => loadStyles(cdn.css))
}

function loadScripts(scripts) {
  let promises = scripts.map(script => {
    return new Promise(resolve => {
      let tag = document.createElement('script');
      tag.src = script;
      tag.onload = () => {
        resolve(script)
      };
      document.body.appendChild(tag);
    })
  });
  return Promise.all(promises);
}

function loadStyles(styles) {
  let promises = styles.map(style => {
    return new Promise(resolve => {
      let tag = document.createElement('link');
      tag.href = style;
      tag.rel = 'stylesheet';
      tag.onload = () => {
        resolve(style)
      };
      document.head.appendChild(tag);
    })
  });
  return Promise.all(promises);
}

const loader = {
  createEl,
  loadStyles,
  loadScripts
}

export default loader
