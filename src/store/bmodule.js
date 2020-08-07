const state = {
  userName: '我是B'
};
const getters = {
  getUserName(state) {
<<<<<<< HEAD
    return '其实我就是' + state.userName + 'dev';
=======
    return '其实我就是' + state.userName;
>>>>>>> dev第一次提交
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
