const state = {
  breadcrumbs: []
};

const getters = {
  breadcrumbs: state => state.breadcrumbs
};

const actions = {
  changeBreadcrumbs({commit}, breadcrumbs){

    return commit('changeBreadcrumbs', breadcrumbs)
  }
};

const mutations = {
  setBreadcrumbs(state, {breadcrumbs}){
    state.breadcrumbs = breadcrumbs;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
};
