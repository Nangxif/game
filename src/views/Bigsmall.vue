<template>
  <div class="bigsmall">
    <button type="button" class="return_btn" @click="goback"></button>
    <div class="bowl">
      <div class="bowl_bottom"></div>
      <div v-show="isShow">
        <div
          :class="`dice_wrapper dice_wrapper${item}`"
          :ref="`dice${item}`"
          v-for="(item, index) in [0, 1, 2]"
          :key="index"
        >
          <div class="first-face" v-show="diceIndex[item] == 1">
            <span
              class="pip"
              style="background-color:red;box-shadow:none;"
            ></span>
          </div>
          <div class="second-face" v-show="diceIndex[item] == 2">
            <span class="pip"></span>
            <span class="pip"></span>
          </div>
          <div class="third-face" v-show="diceIndex[item] == 3">
            <span class="pip"></span>
            <span class="pip"></span>
            <span class="pip"></span>
          </div>
          <div class="fourth-face" v-show="diceIndex[item] == 4">
            <div class="column">
              <span class="pip"></span>
              <span class="pip"></span>
            </div>
            <div class="column">
              <span class="pip"></span>
              <span class="pip"></span>
            </div>
          </div>
          <div class="fifth-face" v-show="diceIndex[item] == 5">
            <div class="column">
              <span class="pip"></span>
              <span class="pip"></span>
            </div>
            <div class="column">
              <span class="pip"></span>
            </div>
            <div class="column">
              <span class="pip"></span>
              <span class="pip"></span>
            </div>
          </div>
          <div class="sixth-face" v-show="diceIndex[item] == 6">
            <div class="column">
              <span class="pip"></span>
              <span class="pip"></span>
              <span class="pip"></span>
            </div>
            <div class="column">
              <span class="pip"></span>
              <span class="pip"></span>
              <span class="pip"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 丢进去的骰子 -->
    <div class="dice_1 first-face">
      <span class="pip" style="background-color:red;box-shadow:none;"></span>
    </div>
    <div class="dice_2 second-face">
      <span class="pip"></span>
      <span class="pip"></span>
    </div>
    <div class="dice_3 third-face">
      <span class="pip"></span>
      <span class="pip"></span>
      <span class="pip"></span>
    </div>
    <!-- 所有按钮 -->
    <button type="button" class="big" @click="buy(0)">大</button>
    <button type="button" class="small" @click="buy(1)">小</button>
    <button type="button" @click="dice" class="dice_btn">买定离手</button>
    <div class="head left" v-if="buywhich == 0"></div>
    <div class="head right" v-if="buywhich == 1"></div>
    <!-- 结果 -->
    <div class="result_wrapper" v-if="isEnd">
      <div>
        {{ which[0] + which[1] + which[2] }}点{{
          which[0] + which[1] + which[2] >= 10 ? '大' : '小'
        }}
      </div>
      <div>
        {{
          (which[0] + which[1] + which[2] >= 10 ? 0 : 1) == buywhich
            ? '玩家胜'
            : '庄家胜'
        }}
      </div>
      <button type="button" class="replay_btn" @click="replay"></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bigsmall',
  data() {
    return {
      diceIndex: [1, 1, 1],
      timer: null,
      timer1: null,
      timer2: null,
      which: [0, 0, 0],
      beginTime: 20,
      buywhich: 3,
      isShow: false,
      isEnd: false
    };
  },
  methods: {
    dice() {
      if (this.buywhich != 3) {
        document.querySelector('.dice_1').classList.add('dice_move');
        document.querySelector('.dice_2').classList.add('dice_move');
        document.querySelector('.dice_3').classList.add('dice_move');

        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.isShow = true;
          document.querySelector('.dice_wrapper0').classList.add('move1');
          document.querySelector('.dice_wrapper1').classList.add('move2');
          document.querySelector('.dice_wrapper2').classList.add('move3');
          this.diceIndex = [1, 1, 1];
          this.timer1 = setInterval(() => {
            this.diceIndex = [
              ++this.diceIndex[0],
              ++this.diceIndex[1],
              ++this.diceIndex[2]
            ];
            if (this.diceIndex[0] == 7) {
              this.diceIndex = [1, 1, 1];
            }
          }, this.beginTime);
          this.timer2 = setTimeout(() => {
            clearInterval(this.timer1);
            // this.$refs.dice.classList.remove('move');
            this.which = [
              Math.floor(Math.random() * (6 + 1) + 0),
              Math.floor(Math.random() * (6 + 1) + 0),
              Math.floor(Math.random() * (6 + 1) + 0)
            ];
            this.diceIndex = this.which;
            this.isEnd = true;
            clearInterval(this.timer2);
          }, 5000);
        }, 1000);
      }
    },
    buy(index) {
      this.buywhich = index;
      document.querySelector('.big').classList.remove('bigger');
      document.querySelector('.small').classList.remove('bigger');
      event.srcElement.classList.add('bigger');
    },
    replay() {
      document.querySelector('.dice_1').classList.remove('dice_move');
      document.querySelector('.dice_2').classList.remove('dice_move');
      document.querySelector('.dice_3').classList.remove('dice_move');
      document.querySelector('.big').classList.remove('bigger');
      document.querySelector('.small').classList.remove('bigger');
      this.diceIndex = [1, 1, 1];
      this.isEnd = false;
      this.isShow = false;
      this.buywhich = 3;
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.bigsmall {
  width: 100vw;
  height: 100vh;
  background-color: #2b9267;
  -moz-box-shadow: inset 0px 0px vw(200) #333333;
  -webkit-box-shadow: inset 0px 0px vw(200) #333333;
  box-shadow: inset 0px 0px vw(200) #333333;
  .return_btn {
    position: absolute;
    left: vw(25);
    top: vw(30);
    @include wh(114, 50);
    @include bgimage('../assets/images/return_btn.png');
    z-index: 100;
  }
  .bowl {
    margin: auto;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    @include wh(260, 260);
    border-radius: 50%;
    border: vw(10) solid #e6e6e6;
    background-image: radial-gradient(#c9c6c6, #e6e6e6);
    .bowl_bottom {
      @include center;
      @include wh(100, 100);
      border-radius: 50%;
      background-color: #afacac;
    }
    .dice_wrapper {
      @include center;
      @include wh(250, 50);
      &.dice_wrapper0 {
        transform: rotate(7200deg);
      }
      &.dice_wrapper1 {
        transform: rotate(7320deg);
      }
      &.dice_wrapper2 {
        transform: rotate(7440deg);
      }
    }

    .move1 {
      animation: clockwise1 5s linear forwards;
    }
    @keyframes clockwise1 {
      0% {
        transform: rotate(7200deg);
        width: vw(250);
      }
      100% {
        transform: rotate(0deg);
        width: vw(150);
      }
    }

    .move2 {
      animation: clockwise2 5s linear forwards;
    }
    @keyframes clockwise2 {
      0% {
        transform: rotate(7320deg);
        width: vw(250);
      }
      100% {
        transform: rotate(120deg);
        width: vw(150);
      }
    }

    .move3 {
      animation: clockwise3 5s linear forwards;
    }
    @keyframes clockwise3 {
      0% {
        transform: rotate(7440deg);
        width: vw(250);
      }
      100% {
        transform: rotate(240deg);
        width: vw(150);
      }
    }
  }

  .first-face {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .second-face {
    display: flex;
    justify-content: space-between;
  }

  .second-face .pip:nth-of-type(2) {
    align-self: flex-end;
  }

  .third-face {
    display: flex;
    justify-content: space-between;
  }

  .third-face .pip:nth-of-type(2) {
    align-self: center;
  }

  .third-face .pip:nth-of-type(3) {
    align-self: flex-end;
  }

  .fourth-face,
  .sixth-face {
    display: flex;
    justify-content: space-between;
  }

  .fourth-face .column,
  .sixth-face .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .fifth-face {
    display: flex;
    justify-content: space-between;
  }

  .fifth-face .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .fifth-face .column:nth-of-type(2) {
    justify-content: center;
  }

  [class*='face'] {
    box-sizing: border-box;
    padding: vw(4);
    background-color: #e7e7e7;
    @include wh(50, 50);
    object-fit: contain;
    box-shadow: inset 0 vw(5) white, inset 0 vw(-5) #bbb, inset vw(5) 0 #d7d7d7,
      inset vw(-5) 0 #d7d7d7;
    border-radius: 10%;
  }

  .pip {
    display: block;
    @include wh(12, 12);
    border-radius: 50%;
    margin: vw(1);
    background-color: #333;
    box-shadow: inset 0 vw(3) #111, inset 0 vw(-3) #555;
  }

  .big {
    position: absolute;
    left: vw(20);
    bottom: vw(20);
    @include wh(150, 150);
    border-radius: 50%;
    color: red;
    border: vw(10) solid red;
    font-size: vw(50);
    font-weight: 600;
    transition: all 0.2s;
  }
  .small {
    position: absolute;
    right: vw(20);
    bottom: vw(20);
    @include wh(150, 150);
    border-radius: 50%;
    color: black;
    border: vw(10) solid black;
    font-size: vw(50);
    font-weight: 600;
    transition: all 0.2s;
  }
  .bigger {
    transform: scale(1.2);
  }
  .dice_btn {
    @include wh(200, 70);
    margin: auto;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: vw(10);
    color: white;
  }

  .head {
    position: absolute;
    bottom: 0px;
    @include wh(100, 110);
    @include bgimage('../assets/images/Bigsmall/head.png');
    transform: scale(1.5);
    animation: bighead 1s forwards;
    &.left {
      left: vw(38);
    }
    &.right {
      right: vw(38);
    }
  }
  @keyframes bighead {
    0% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .dice_1 {
    @include wh(50, 50);
    position: absolute;
    left: 50%;
    transform: translateX(-160%);
    bottom: vw(120);
  }
  .dice_move {
    animation: dice_m 1s ease-out forwards;
  }
  @keyframes dice_m {
    99% {
      transform: translate(-50%, 50%);
      bottom: 50%;
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .dice_2 {
    @include wh(50, 50);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: vw(120);
  }
  .dice_3 {
    @include wh(50, 50);
    position: absolute;
    left: 50%;
    transform: translateX(60%);
    bottom: vw(120);
  }
  .result_wrapper {
    @include bgcenter;
    .replay_btn {
      display: block;
      margin: vw(50) vw(300);
      @include wh(150, 150);
      @include bgimage('../assets/images/replay_btn.png');
    }
  }
}
</style>
