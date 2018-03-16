import cdn from './cdn'
function createEl() {
  return new Promise(resolve => {
    let app = document.createElement('div');
    app.innerHTML = `<app></app>`;
    document.body.appendChild(app);
    loadStatic().then(() => {
      let id = 'app-' + md5(new Date().getTime());
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
