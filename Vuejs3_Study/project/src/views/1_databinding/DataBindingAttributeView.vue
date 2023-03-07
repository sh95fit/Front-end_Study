<template>
  <div>
    <input type="text" v-bind:value="userId" readonly />
    <input type="text" :value="userId" readonly />
    <br>
    <img :src="imgSrc" alt="" style="width:100px; height:auto;">
    <br>
    <input type="search" v-model="txt1" />
    <button :disabled="txt1 === ''">조회</button>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      userId: 'test',
      imgSrc: 'https://cdn.pixabay.com/photo/2023/01/11/18/26/bird-7712475__340.jpg',
      txt1: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
