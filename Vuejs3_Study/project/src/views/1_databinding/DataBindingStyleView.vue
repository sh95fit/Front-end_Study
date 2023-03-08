<template>
  <div>
    <div style="color: red; font-size:30px">스타일 바인딩 : 폰트색상-red, 폰트크기-30px</div>
    <div :style="style_1">스타일 바인딩 : 폰트색상-red, 폰트크기-30px</div>
    <button @click="style_1.color='blue'">색상 변경</button>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      style_1: {
        color: 'green',
        fontSize: '40px'
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
