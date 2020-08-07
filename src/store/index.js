import Vue from 'vue';
import Vuex from 'vuex';
import amodule from './amodule';
import bmodule from './bmodule';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    type: '',
    isRule: false,
    ruleContent: [],
    isChoose: false,
    isRanking: false,
    linkData: {
      link: '',
      islocal: true
    }
  },
  mutations: {
    typeM(state, v) {
      state.type = v;
    },
    isRuleM(state, v) {
      state.isRule = v;
    },
    ruleContentM(state, v) {
      state.ruleContent = v;
    },
    isChooseM(state, v) {
      state.isChoose = v;
    },
    isRankingM(state, v) {
      state.isRanking = v;
    },
    linkDataM(state, v) {
      state.linkData = v;
    }
  },
  actions: {},
  modules: {
    amodule,
    bmodule
  }
});
