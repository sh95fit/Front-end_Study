<template>
  <div>
    <button @click="increaseCounter">Add 1</button>
    <p>{{ counter }}</p>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      counter: 0
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    increaseCounter() {
      this.counter += 1
    }
  }
}
</script>
