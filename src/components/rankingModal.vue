<template>
  <div class="rankingModal">
    <div class="modal_wrapper">
      <div class="title">“{{ title[type] }}”排行榜</div>
      <div class="ranking_content">
        <div class="rankig_item" v-for="(item, index) in list" :key="index">
          <span>{{ item }}分</span>
        </div>
      </div>
      <div class="close_btn">
        <button
          type="button"
          @click="
            isRankingM(false);
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
  name: 'rankingModal',
  data() {
    return {
      title: {
        Colors: '找不同'
      },
      list: []
    };
  },
  computed: {
    ...mapState(['type'])
  },
  methods: {
    ...mapMutations(['isRankingM', 'isChooseM']),
    bsort(a, b) {
      if (Number(a) >= Number(b)) return -1;
      else return 1;
    }
  },
  mounted() {
    this.list = [...new Set(localStorage.getItem(this.type).split(','))].sort(
      this.bsort
    );
  }
};
</script>
<style lang="scss" scoped>
.rankingModal {
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
      margin-bottom: vw(24);
      text-align: center;
      font-size: vw(36);
      color: #866947;
      font-weight: 600;
    }
    .ranking_content {
      margin: 0 auto;
      width: 90%;
      height: vw(260);
      overflow-y: auto;
      .rankig_item {
        font-size: vw(30);
        color: #866947;
        line-height: vw(50);
        border-bottom: 1px dashed #866947;
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
