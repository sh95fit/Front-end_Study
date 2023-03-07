<template>
  <div>
    <div>
      <input type="radio" id="html" value="HTML" v-model='favoriteLang' />
      <label for="HTML">HTML</label>
    </div>
    <div>
      <input type="radio" id="CSS" value="CSS" v-model='favoriteLang' />
      <label for="CSS">CSS</label>
    </div>
    <div>
      <input type="radio" id="JS" value="JS" v-model='favoriteLang' />
      <label for="JS">JavaScript</label>
    </div>
    <div>선택한 언어는 {{ favoriteLang }}</div>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      favoriteLang: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
