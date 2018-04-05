import { Storage } from '../../app/utils'

const storage = new Storage()
const STORAGE_KEY = 'v_theme'
const state = {
  theme: {
    color: 'white',
    dark: false,
    background: 'cyan lighten-5',
    dense : true
  },
  themes: [
    {
      color: 'grey darken-2',
      background: 'grey lighten-2',
      dark: true,
      dense : true
    },
    {
      color: 'white',
      background: 'cyan lighten-5',
      dark: false,
      dense : true
    },
    {
      color: 'primary',
      background: 'cyan lighten-5',
      dark: false,
      dense : true
    },
    {
      color: 'cyan',
      background: 'cyan lighten-5',
      dark: false,
      dense : true
    },
  ]
}

const getters = {
  theme: state => {
    let s = storage.get(STORAGE_KEY)
    if (s) {
      state.theme = s
    }
    return state.theme
  },
  themes: state => state.themes
}

const actions = {}

const mutations = {
  changeTheme (state, {color = dark ? 'dark' : 'white', dark = false, background = 'cyan lighten-5', dense = false}) {
    state.theme.color = color
    state.theme.dark = dark
    state.theme.background = background
    state.theme.dense = dense
    storage.put(STORAGE_KEY, state.theme)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
