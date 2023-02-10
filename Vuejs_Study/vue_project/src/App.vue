<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <div >
      {{ logo }}
      <h4 class="blue" :style="스타일1">xx 원룸</h4>
      <p>xx 만원</p>
    </div>
    <div>
      <h4 class="red" :style='스타일2'>yy 원룸</h4>
      <p>yy 만원</p>
    </div> -->

    <!-- <div class="test">
      <li v-for="(product, i) in products" :key="i">
        <p><a href="#" :style="스타일1">{{ product }}</a></p>
        <div v-if="i==0">{{price_0}} 만원</div>
        <div v-else-if="i==1">{{price_1}} 만원</div>
      </li>
    </div> -->
    <div class="black-bg" v-if="modal_state == true">
      <div class="white-bg">
        <h4>Modal 테스트</h4>
        <p>Modal Content</p>
        <button @click="toggle">닫기</button>
      </div>
    </div>

    <div v-for="(product, i) in products" :key="i">
      <img src="./assets/logo.png" class="item-img">
      <h4 @click="toggle">{{ product }}</h4>
      <p>{{ prices[i] }} 만원</p>
      <button v-on:click="increase(i)">Select</button> <span>수량 : {{ count[i] }}</span>
    </div>

    <div>
      <h4>{{ info[0].title }}</h4>
    </div>

  </div>
</template>

<script>

import data from './assets/test.js';

export default {
  name: 'App',
  data() {
    return {
      // logo : "Hun's Shop",
      //  price_0 : 80,
      //  price_1 : 50,
      스타일1 : 'color : blue',
      스타일2 : 'color : red',
      products : ['A상품', 'B상품', 'C상품'],
      prices : ['50', '30', '40'],
      count : [0,0,0],
      modal_state : false,
      info : data,
    }
  },
  methods : {
    increase(i) {
      this.count[i] += 1;
    },
    toggle() {
      if (this.modal_state == true) {
        this.modal_state = false;
      }
      else if (this.modal_state == false) {
        this.modal_state = true;
      }
    }
  },
  components: {

  }
}
</script>

<style>

/* 모달창 디자인 */
body {
  margin : 0
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; 
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; 
  padding: 20px;
}
.white-bg {
  width: 100%; 
  background: white;
  border-radius: 8px;
  padding: 20px;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

div .test {
  list-style: none;
}

div .test a {
  text-decoration: none;
}

.item-img {
  width : 10%;
  margin-top : 40px;
}

</style>
