<template>
  <div class="home">
    <div class="leaf_top"></div>
    <div class="home_list">
      <div
        v-for="(item, index) in router_list"
        :key="index"
        class="list_item"
        @click="go_link(item.link, item.islocal)"
      >
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="grassland_bottom"></div>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';
export default {
  name: 'home',
  data() {
    return {
      router_list: [
        {
          title: '找不同',
          desc: '该游戏适合睡眠质量不佳者',
          link: '/colors',
          islocal: true
        },
        {
          title: '性格测试',
          desc: '',
          link: '',
          islocal: true
        },
        {
          title: '你画我猜',
          desc: '没有天赋就不要学人家画画',
          link: 'https://nangxif.github.io/palettes/index.html',
          islocal: false
        },
        {
          title: '掷骰子',
          desc: '',
          link: '',
          islocal: true
        },
        {
          title: '开发中…',
          desc: '',
          link: '',
          islocal: true
        }
      ]
    };
  },
  methods: {
    go_link(link, islocal) {
      if (islocal) {
        this.$router.push({
          path: link
        });
      } else {
        window.location.href = link;
      }
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
