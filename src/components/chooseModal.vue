<template>
  <div class="chooseModal">
    <div class="modal_wrapper">
      <div class="title">选项</div>
      <button type="button" class="btn rank_btn" @click="go_rank">
        游戏排行榜
      </button>
      <button type="button" class="btn rule_btn" @click="go_rule">
        游戏规则
      </button>
      <div class="close_btn">
        <button type="button" @click="isChooseM(false)"></button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: 'chooseModal',
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['isChooseM', 'isRankingM', 'isRuleM']),
    go_rank() {
      this.isChooseM(false);
      this.isRankingM(true);
    },
    go_rule() {
      this.isChooseM(false);
      this.isRuleM(true);
    }
  }
};
</script>
<style lang="scss" scoped>
.chooseModal {
  @include center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  .modal_wrapper {
    @include center;
    box-sizing: border-box;
    @include wh(580, 420);
    background-color: white;
    border-radius: vw(20);
    z-index: 99;
    .title {
      margin-top: vw(50);
      margin-bottom: vw(44);
      text-align: center;
      font-size: vw(36);
      color: #866947;
    }
    .btn {
      margin: auto;
      position: absolute;
      left: 0px;
      right: 0px;
      @include wh(289, 86);
      @include bgimage('../assets/images/btn_bg.png');
      font-size: vw(32);
      color: white;
      &.rank_btn {
        bottom: vw(182);
      }
      &.rule_btn {
        bottom: vw(62);
      }
    }
    .close_btn {
      margin: auto;
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: vw(-144);
      @include wh(65, 144);
      @include bgimage('../assets/images/close_btn.png');
      button {
        @include wh(65, 65);
        position: absolute;
        left: 0px;
        bottom: 0px;
      }
    }
  }
}
</style>
