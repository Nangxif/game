<template>
  <div class="rulemodal">
    <div class="modal_wrapper">
      <div class="title">游戏规则</div>
      <div class="tip">
        <p v-for="(item, index) in ruleContent" :key="index">
          {{ item }}
        </p>
      </div>
      <button type="button" class="start_btn" @click="begin">开始游戏</button>
      <div class="close_btn">
        <button
          type="button"
          @click="
            isRuleM(false);
            isChooseM(true);
          "
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'rulemodal',
  computed: {
    ...mapState(['linkData', 'ruleContent'])
  },
  methods: {
    ...mapMutations(['isRuleM', 'isChooseM']),
    begin() {
      this.isRuleM(false);
      if (this.linkData.islocal) {
        this.$router.push({
          path: this.linkData.link
        });
      } else {
        window.location.href = this.linkData.link;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.rulemodal {
  @include center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  .modal_wrapper {
    @include center;
    box-sizing: border-box;
    @include wh(580, 700);
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
    .tip {
      margin: 0 vw(20);
      font-size: vw(30);
      line-height: vw(45);
      color: #866947;
    }
    .start_btn {
      margin: auto;
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: vw(52);
      @include wh(289, 86);
      @include bgimage('../assets/images/btn_bg.png');
      font-size: vw(32);
      color: white;
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
