let timer = null
let flattened = []

let storage = localStorage || sessionStorage

require('./polyfill')

export function throttle (callback, threshold) {
    clearTimeout(timer)
    timer = setTimeout(function () {
        (typeof callback === 'function') && callback()
    }, threshold)
}

/**
 *
 * @param {String} url
 * @param {Object} query
 * @returns {string}
 */
export function setQuery (url, query) {
    let obj = parseUrl(url)
    let q = obj.query

    for (let i in  query) {
        let item = query[i]
        if (_.isString(item)) {
            item.length > 0 && (q[i] = item)
        } else {
            q[i] = item
        }
    }

    let queryString = httpQueryString(q)

    if (queryString.length < 1) {
        return obj.path
    }

    return obj.path + '?' + queryString
}

/**
 *
 * @param {String} url
 * @returns {Object}
 */
export function parseUrl (url) {
    let part = url.split('?', 2)
    if (part.length < 2) {
        return {
            path: part[0],
            queryString: '',
            query: {}
        }
    }
    let qs = part[1].split('&')
    let query = {}
    qs.forEach(function (item) {
        let p = item.split('=')
        if (p.length > 1) {
            let key = p[0]
            let value = p[1]
            if (key.indexOf('[]') > 0) {
                let fixedKey = key.replace('[]', '')
                if (query[fixedKey]) {
                    query[fixedKey].push(value)
                } else {
                    query[fixedKey] = [value]
                }
            } else {
                query[key] = value
            }
        }
    })

    return {
        path: part[0],
        queryString: part[1],
        query: query
    }
}

/**
 *
 * @param {Object} query
 * @returns {string}
 */
export function httpQueryString (query) {
    let qsArray = []
    _.forEach(query, function (v, k) {
        if (_.isArray(v)) {
            v.forEach(value => {
                qsArray.push(k + '[]=' + value)
            })
        } else {
            qsArray.push(k + '=' + v)
        }
    })

    return qsArray.join('&')
}

export function randomString (length, pool) {
    length = length || 16
    pool = pool || 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
    return new Chance().string({length: length, pool: pool})
}

export function fastRandom (length, pool) {
  length = length || 16
  pool = pool || 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'

  return pool.repeat(length).split('').sort(() => 0.5 - Math.random()).join('').substring(0, length - 1);
}

/**
 *
 * @param {string} s
 * @returns {string}
 */
export function htmlencode (s) {
    let div = document.createElement('div')
    div.appendChild(document.createTextNode(s))
    return div.innerHTML
}

export function flattenNode (input, nodeKey) {
    nodeKey = nodeKey || 'node'

    let $clone = _.clone(input)

    $clone.forEach(item => {
        if (item.hasOwnProperty(nodeKey)) {
            let nodes = item[nodeKey]
            delete item[nodeKey]
            flattened.push(item)
            flattened.concat(flattenNode(nodes, nodeKey))
        } else {
            flattened.push(item)
        }
    })

    return flattened
}

export function objectGet(object, key, $default) {
  let clone = simpleClone(object);
  if (object.hasOwnProperty(key)) {
    return object[key];
  }

  let partials = key.split('.');
  let length = partials.length;
  for (let i = 0; i < length; i++) {
    clone = clone[partials[i]];
    if (clone === undefined) {
      return $default
    }
  }

  return clone;
}

export function simpleClone(state) {
  let copy = (state instanceof Array) ? [] : {};
  for (let attr in state) {
    if (!state.hasOwnProperty(attr)) continue;
    copy[attr] = state[attr];
  }
  return copy;
};


export function Storage () {

}

Storage.prototype.put = function (key, value) {
    let string = value;
    if (_.isObject(value)){
        string = JSON.stringify(value);
    }
    storage.setItem(key, string);
}
Storage.prototype.get = function (key, $default) {
    let result = storage.getItem(key);
    try {
        result = JSON.parse(result);
    } catch (error) {}

    if (!result) {
        return $default;
    }

    return result;
}

Storage.prototype.remove = function (key) {
    storage.removeItem(key);
}
Storage.install = function (Vue, options = {}) {
  Vue.prototype.$storage = new Storage();
}
