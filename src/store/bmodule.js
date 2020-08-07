const state = {
  userName: '我是B'
};
const getters = {
  getUserName(state) {
    return '其实我就是' + state.userName + 'dev';
  }
};
const mutations = {
  setUserName(state, v) {
    state.userName = v;
  }
};
const actions = {
  actUserName({ commit }, v) {
    commit('setUserName', v);
  }
};
export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
};
