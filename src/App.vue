<template>
  <div id="app">
    <router-view />
    <RuleModal v-if="isRule"></RuleModal>
    <RankingModal v-if="isRanking"></RankingModal>
    <ChooseModal v-if="isChoose"></ChooseModal>
  </div>
</template>
<script>
import preventScroll from './rpf/un/preventScroll';
preventScroll();
import RuleModal from './components/ruleModal';
import RankingModal from './components/rankingModal';
import ChooseModal from './components/chooseModal';
import { mapState } from 'vuex';
export default {
  name: 'app',
  computed: {
    ...mapState(['isRule', 'isRanking', 'isChoose'])
  },
  components: {
    RuleModal,
    RankingModal,
    ChooseModal
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  /deep/ .scrollbar-track-y {
    width: 4px;
  }
  /deep/ .scrollbar-track {
    background: rgba(222, 222, 222, 0.75);
    .scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      width: 4px;
      border-radius: 2px;
    }
  }
}
</style>
