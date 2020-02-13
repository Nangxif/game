<template>
  <div class="home">
    <div class="leaf_top"></div>
    <div class="home_list">
      <div
        v-for="(item, index) in router_list"
        :key="index"
        class="list_item"
        @click="go_link(item.type, item.link, item.islocal, item.rule)"
      >
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
      <input type="text" placeholder="aaa" />
    </div>
    <div class="grassland_bottom"></div>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';
import { mapMutations } from 'vuex';
// import fixWeChatForm from '../rpf/un/fixWeChatForm';
// fixWeChatForm();
export default {
  name: 'home',
  data() {
    return {
      router_list: [
        {
          type: 'Colors',
          title: '找不同',
          desc: '该游戏适合睡眠质量不佳者',
          link: '/colors',
          islocal: true,
          rule: [
            '1.每回合十秒钟之内找出与其他颜色不同的格子；',
            '2.难度越高，每回合分数越多；',
            '3.每个难度等级有四个回合。'
          ]
        },
        {
          type: '',
          title: '性格测试',
          desc: '',
          link: '',
          islocal: true,
          rule: []
        },
        {
          type: '',
          title: '你画我猜',
          desc: '没有天赋就不要学人家画画',
          link: 'https://nangxif.github.io/palettes/index.html',
          islocal: false,
          rule: ['一个画板']
        },
        {
          type: '',
          title: '买大买小',
          desc: '赌博不规范，亲人两行泪',
          link: '/bigsmall',
          islocal: true,
          rule: [
            '1.先买定大小；',
            '2.买定离手；',
            '3.超过9点（不包括9）算小，其余算大。'
          ]
        },
        {
          type: 'none',
          title: '开发中…',
          desc: '',
          link: '',
          islocal: true,
          rule: []
        }
      ]
    };
  },
  methods: {
    ...mapMutations([
      'typeM',
      'isRuleM',
      'linkDataM',
      'isChooseM',
      'ruleContentM'
    ]),
    go_link(type, link, islocal, rule) {
      this.typeM(type);
      this.isChooseM(true);
      this.ruleContentM(rule);
      this.linkDataM({
        link,
        islocal
      });
    }
  },
  mounted() {
    Scrollbar.init(document.querySelector('.home'), {
      thumbMinSize: 10
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  input {
    user-select: text !important;
  }
  .leaf_top {
    @include wh(750, 230);
    @include bgimage('../assets/images/leaf_top.png');
  }
  .home_list {
    margin: 0 auto;
    margin-top: vw(10);
    width: vw(620);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .list_item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      @include bgimage('../assets/images/content.png');
      @include wh(300, 300);
      text-align: center;
      color: #bd7325;
      &:nth-child(even) {
        margin-left: vw(20);
      }
      div {
        width: 80%;
      }
      .title {
        font-size: vw(40);
        font-weight: 600;
      }
      .desc {
        margin-top: vw(5);
        font-size: vw(26);
        line-height: vw(35);
      }
    }
  }
  .grassland_bottom {
    @include wh(750, 452);
    @include bgimage('../assets/images/grassland_bottom.png');
  }
}
</style>
