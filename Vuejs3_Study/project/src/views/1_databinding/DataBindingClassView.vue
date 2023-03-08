<template>
  <div>
    <div :class="{ 'text-red':hasError, active:isActive }">클래스 바인딩</div>
    <div :class="{ 'text-red':class_2[0], active:class_2[1] }">클래스 바인딩 2</div>
    <button @click="toggleButton">토글버튼</button>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      isActive: false,
      hasError: false,
      class_2: ['isActive', 'hasError']
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    toggleButton() {
      this.isActive = !this.isActive
      this.hasError = !this.hasError
      this.class_2 = [!this.isActive, !this.hasError]
    }
  }
}
</script>

<style scoped>
.active {
  background-color: greenyellow;
  font-weight: bold;
}

.text-red {
  color: red;
}

</style>
