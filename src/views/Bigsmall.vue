<template>
  <div class="bigsmall">
    <div class="bowl">
      <div class="bowl_bottom"></div>
      <div class="dice_wrapper" ref="dice">
        <div :class="`dice ${diceArr[diceIndex]}`"></div>
      </div>
    </div>
    <button type="button" @click="dice">投骰子</button>
  </div>
</template>
<script>
export default {
  name: 'bigsmall',
  data() {
    return {
      diceArr: [
        'dice_1',
        'dice_2',
        'dice_3',
        'dice_4',
        'dice_5',
        'dice_6',
        'dice_7',
        'dice_8'
      ],
      diceIndex: 6,
      timer1: null,
      timer2: null,
      which: 0,
      beginTime: 20
    };
  },
  methods: {
    dice() {
      this.$refs.dice.classList.add('move');
      this.diceIndex = 6;
      this.timer1 = setInterval(() => {
        this.diceIndex++;
        if (this.diceIndex == 8) {
          this.diceIndex = 6;
        }
      }, this.beginTime);
      this.timer2 = setTimeout(() => {
        clearInterval(this.timer1);
        this.$refs.dice.classList.remove('move');
        this.which = Math.floor(Math.random() * (5 + 1) + 0);
        this.diceIndex = this.which;
        clearInterval(this.timer2);
      }, 2000);
    }
  }
};
</script>
<style lang="scss" scoped>
.bigsmall {
  .bowl {
    position: relative;
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
      @include wh(200, 100);
      .dice {
        @include wh(100, 100);
        &.dice_1 {
          @include bgimage('../assets/images/Bigsmall/1.jpg');
        }
        &.dice_2 {
          @include bgimage('../assets/images/Bigsmall/2.jpg');
        }
        &.dice_3 {
          @include bgimage('../assets/images/Bigsmall/3.jpg');
        }
        &.dice_4 {
          @include bgimage('../assets/images/Bigsmall/4.jpg');
        }
        &.dice_5 {
          @include bgimage('../assets/images/Bigsmall/5.jpg');
        }
        &.dice_6 {
          @include bgimage('../assets/images/Bigsmall/6.jpg');
        }
        &.dice_7 {
          @include bgimage('../assets/images/Bigsmall/7.jpg');
        }
        &.dice_8 {
          @include bgimage('../assets/images/Bigsmall/8.jpg');
        }
        &.dice_9 {
          @include bgimage('../assets/images/Bigsmall/9.jpg');
        }
      }
    }

    .move {
      animation: clockwise 0.5s linear infinite;
    }
    @keyframes clockwise {
      0% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
