<template>
  <div>
    <div>
      <input type="checkbox" id="html" value="HTML" v-model='favoriteLang' />
      <label for="HTML">HTML</label>
    </div>
    <div>
      <input type="checkbox" id="CSS" value="CSS" v-model='favoriteLang' />
      <label for="CSS">CSS</label>
    </div>
    <div>
      <input type="checkbox" id="JS" value="JS" v-model='favoriteLang' />
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
      favoriteLang: ['JS']
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
