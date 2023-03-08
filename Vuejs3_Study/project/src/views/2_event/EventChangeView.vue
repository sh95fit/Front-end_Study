<template>
  <div>
    <select @change="changeCity($event)" v-model="selectedCity">
      <option value="">==도시선택==</option>
      <option :value="city.cityCode" :key="city.cityCode" v-for="city in cityList">{{ city.title }}</option>
    </select>
    <select>
      <option :value="dong.dongCode" :key="dong.dongCode" v-for="dong in selectedDongList">{{ dong.dongTitle }}</option>
    </select>
    <select>
      <option :value="dong.dongCode" :key="dong.dongCode" v-for="dong in dongList.filter((dong) => dong.cityCode === this.selectedCity)">{{ dong.dongTitle }}</option>
    </select>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      selectedCity: '',
      cityList: [
        { cityCode: '02', title: 'Seoul' },
        { cityCode: '051', title: 'Busan' },
        { cityCode: '064', title: 'Jeju' }
      ],
      dongList: [
        { cityCode: '02', dongCode: '1', dongTitle: 'Seoul_1' },
        { cityCode: '02', dongCode: '2', dongTitle: 'Seoul_2' },
        { cityCode: '02', dongCode: '3', dongTitle: 'Seoul_3' },
        { cityCode: '02', dongCode: '4', dongTitle: 'Seoul_4' },
        { cityCode: '051', dongCode: '1', dongTitle: 'Busal_1' },
        { cityCode: '051', dongCode: '2', dongTitle: 'Busal_2' },
        { cityCode: '064', dongCode: '1', dongTitle: 'Jeju_1' },
        { cityCode: '064', dongCode: '2', dongTitle: 'Jeju_2' },
        { cityCode: '064', dongCode: '3', dongTitle: 'Jeju_3' }
      ],
      selectedDongList: []
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    changeCity(event) {
      console.log(event.target.tagName)
      this.selectedDongList = this.dongList.filter((dong) => dong.cityCode === this.selectedCity)
    }
  }
}
</script>
