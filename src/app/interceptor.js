import {flattenNode, Storage} from '../app/utils';
import {routes} from '../router';
import store from '../store';
import {TOKEN_CACHE_NAME, LOGIN_PATH} from '../constant';

const storage = new Storage();

export default function (to, from, next) {
  setTitle(to);
  checkToken(to, next);
}

function setTitle(route) {
  let title = route.meta.title;
  if (title) {
    document.title = title;
    store.commit('setBreadcrumbs', {
      breadcrumbs : [
        {
          text: title
        }
      ]
    });
  }
}

function checkToken(to, next) {
  if (!storage.get(TOKEN_CACHE_NAME) && to.meta.guest !== true) {
    return next(LOGIN_PATH);
  }
  return next();
}
