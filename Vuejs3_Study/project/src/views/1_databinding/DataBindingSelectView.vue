<template>
  <div>
    <select v-model="selectedCity">
      <option value=""></option>
      <option value="02">서울</option>
      <option value="051">부산</option>
      <option value="064">제주</option>
    </select>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      selectedCity: '051'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
