const state = {
  userName: '我是A'
};
const getters = {
  getUserName(state) {
    return '其实我就是ssss' + state.userName + 'master';
  }
};
const mutations = {
  setUserName(state, v) {
    state.userName = v;
  }
};
const actions = {
  actUs: {
    root: true,
    handler({ commit }, v) {
      commit('setUserName', v);
    }
  },
  actUserName({ commit }) {
    commit('setUserName');
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
