<template>
  <div class="colors">
    <button type="button" class="return_btn" @click="goback"></button>
    <!-- game start -->
    <div class="game_start" v-if="!isStart" @click="start">
      点击屏幕开始游戏
    </div>
    <!-- game stop -->
    <div class="game_stop" v-if="isStop" @click="start">
      点击屏幕继续游戏
    </div>

    <div class="leaf_top"></div>
    <div class="score">得分：{{ score }}</div>
    <div class="remain_time">{{ remain_time }}</div>
    <div class="level">难度：{{ colspan - 1 }}</div>
    <div class="content">
      <div class="colors_wrapper" ref="colors_wrapper">
        <div class="row" v-for="(item, index) in colorData" :key="index">
          <div
            class="col"
            v-for="(it, ix) in item"
            :key="ix"
            :style="
              `width:${size}px;height:${size}px;background-color:rgb(${it.r},${it.g},${it.b})`
            "
            :data-index="`${it.x}|${it.y}`"
            @click="selectBox(it.x, it.y)"
          ></div>
        </div>
      </div>
    </div>

    <div class="time">
      剩余提醒次数：{{ remainTime }}
      <br />
      <button type="button" @click="warning" class="tip_btn warn_btn">
        提醒
      </button>
    </div>

    <button type="button" @click="stop" class="tip_btn stop_btn">暂停</button>
    <div class="grassland_bottom"></div>
    <!-- game over -->
    <div class="game_over" v-if="remain_time == 0">
      Game Over
      <button type="button" class="replay_btn" @click="replay"></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'colors',
  data() {
    return {
      isStart: false,
      isStop: false,
      colorData: [],
      colspan: 2,
      size: 0,
      ramArr: [],
      which: [0, 0],
      score: 0,
      seclevel: 1,
      remainTime: 3,
      remain_time: 10
    };
  },
  methods: {
    start() {
      this.isStart = true;
      this.isStop = false;
      this.timer = setInterval(() => {
        this.remain_time--;
        if (this.remain_time == 0) {
          // 游戏结束结算
          let storage = localStorage.getItem('Colors');
          if (!storage) {
            localStorage.setItem('Colors', this.score);
          } else {
            storage += ',' + this.score;
            localStorage.setItem('Colors', storage);
          }
          clearInterval(this.timer);
        }
      }, 1000);
    },
    stop() {
      this.isStop = true;
      clearInterval(this.timer);
    },
    replay() {
      this.isStart = false;
      this.colspan = 2;
      this.size = 0;
      this.ramArr = [];
      this.which = [0, 0];
      this.score = 0;
      this.seclevel = 1;
      this.remainTime = 3;
      this.remain_time = 10;
      this.changeColors();
    },
    goback() {
      this.$router.go(-1);
    },
    selectBox(x, y) {
      if (x == this.which[0] && y == this.which[1]) {
        this.remain_time = 10;
        let circle = document.querySelector(
          'div[data-index="' + this.which[0] + '|' + this.which[1] + '"] div'
        );
        if (circle) {
          document
            .querySelector(
              'div[data-index="' + this.which[0] + '|' + this.which[1] + '"]'
            )
            .removeChild(circle);
        }
        this.score += (this.colspan - 1) * 30;
        this.seclevel++;
        if (this.seclevel > 4) {
          this.colspan++;
          this.seclevel = 1;
        }
        this.changeColors();
      }
    },
    warning() {
      if (
        !document.querySelector(
          'div[data-index="' + this.which[0] + '|' + this.which[1] + '"] div'
        ) &&
        this.remainTime > 0
      ) {
        this.remainTime--;
        let circle = document.createElement('div');
        document
          .querySelector(
            'div[data-index="' + this.which[0] + '|' + this.which[1] + '"]'
          )
          .appendChild(circle);
      }
    },
    changeColors() {
      this.colorData = [];
      this.size = this.$refs.colors_wrapper.offsetWidth / this.colspan;
      for (let m = 0; m < 3; m++) {
        this.ramArr[m] = Math.floor(Math.random() * (255 + 1) + 0);
      }
      for (let i = 0; i < this.colspan; i++) {
        this.colorData.push([]);
        for (let j = 0; j < this.colspan; j++) {
          this.colorData[i][j] = {
            r: this.ramArr[0],
            g: this.ramArr[1],
            b: this.ramArr[2],
            x: i,
            y: j
          };
        }
      }
      this.which[0] = Math.floor(Math.random() * this.colspan);
      this.which[1] = Math.floor(Math.random() * this.colspan);
      if (this.colorData[this.which[0]][this.which[1]].r > 225) {
        this.colorData[this.which[0]][this.which[1]].r -= 30;
      } else {
        this.colorData[this.which[0]][this.which[1]].r += 30;
      }
    }
  },
  mounted() {
    this.changeColors();
  }
};
</script>
<style lang="scss" scoped>
.colors {
  position: relative;
  background-image: url('../assets/images/colors_bg.png');
  // background-position: center;
  background-size: 100% auto;
  width: 100%;
  height: 100vh;
  .return_btn {
    position: absolute;
    left: vw(25);
    top: vw(30);
    @include wh(114, 50);
    @include bgimage('../assets/images/return_btn.png');
    z-index: 100;
  }
  .leaf_top {
    position: absolute;
    left: 0px;
    top: 0px;
    @include wh(750, 230);
    @include bgimage('../assets/images/leaf_top.png');
    z-index: 1;
  }
  .content {
    @include center;
    @include wh(709, 806);
    @include bgimage('../assets/images/content.png');
    z-index: 2;
    .colors_wrapper {
      @include wh(500, 500);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-48%, -50%);
      font-size: 0px;
      .col {
        position: relative;
        display: inline-block;
        /deep/ div {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: vw(10) solid #7bc666;
          width: 110%;
          height: 110%;
          z-index: 1;
          animation: move 1s infinite linear;
        }
        @keyframes move {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
    }
  }
  @media screen and (min-aspect-ratio: 750/1450) and (max-aspect-ratio: 750/1360) {
    .content {
      transform: scale(0.95);
    }
  }
  @media screen and (min-aspect-ratio: 750/1359) and (max-aspect-ratio: 750/1200) {
    .content {
      transform: scale(0.9);
    }
  }
  @media screen and (min-aspect-ratio: 750/1199) and (max-aspect-ratio: 750/1000) {
    .content {
      transform: scale(0.85);
    }
  }
  @media screen and (min-aspect-ratio: 750/999) and (max-aspect-ratio: 750/900) {
    .content {
      transform: scale(0.8);
    }
  }

  .score {
    position: absolute;
    left: vw(50);
    top: vw(100);
    font-size: vw(30);
    color: white;
    z-index: 3;
  }
  .level {
    position: absolute;
    right: vw(50);
    top: vw(100);
    font-size: vw(30);
    color: white;
    z-index: 3;
  }
  .remain_time {
    @include wh(100, 100);
    line-height: vw(100);
    text-align: center;
    margin: auto;
    position: absolute;
    left: 0px;
    right: 0px;
    top: vw(50);
    z-index: 3;
    font-size: vw(40);
    color: #235c17;
    border-radius: 50%;
    border: vw(10) solid #7bc666;
    background-color: #fbf7de;
    font-weight: 600;
    z-index: 3;
  }
  .time {
    position: absolute;
    left: vw(50);
    bottom: vw(50);
    font-size: vw(30);
    color: white;
    z-index: 3;
    text-align: center;
  }
  .tip_btn {
    position: absolute;
    bottom: vw(35);
    @include bgimage('../assets/images/btn_bg.png');
    @include wh(252, 75);
    font-size: vw(30);
    color: white;
    font-weight: 600;
    z-index: 3;
    &.warn_btn {
      margin-top: vw(10);
      position: static;
      left: vw(50);
    }
    &.stop_btn {
      right: vw(50);
    }
  }
  .grassland_bottom {
    position: absolute;
    left: 0px;
    bottom: 0px;
    @include wh(750, 452);
    @include bgimage('../assets/images/grassland_bottom.png');
    z-index: 1;
  }

  .game_start,
  .game_stop,
  .game_over {
    @include center;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: vw(66);
    font-weight: 700;
    z-index: 99;
    .replay_btn {
      display: block;
      margin: vw(50) vw(300);
      @include wh(150, 150);
      @include bgimage('../assets/images/replay_btn.png');
    }
  }
}
</style>
