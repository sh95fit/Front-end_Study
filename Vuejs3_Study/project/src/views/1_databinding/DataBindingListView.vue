<template>
  <div>
    <div>
      <select>
        <option value="">-</option>
        <option :value="city.code" :key="city.code" v-for="city in cities"> {{ city.title }}</option>
      </select>
    </div>
    <div>
      <table>
        <thead>
          <tr>제품번호</tr>
          <tr>제품명</tr>
          <tr>가격</tr>
          <tr>주문수량</tr>
          <tr>합계</tr>
        </thead>
        <tbody>
          <tr :key="drink.drinkId" v-for="drink in drinkList">
            <td> {{drink.drinkId }}</td>
            <td> {{drink.drinkName }}</td>
            <td> {{drink.price }}</td>
            <td> <input type="number" v-model="drink.qty"> </td>
            <td> {{ drink.price * drink.qty }} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  componets: {},
  data() {
    return {
      cities: [
        { title: '서울', code: '02' },
        { title: '부산', code: '051' },
        { title: '제주', code: '064' }
      ],
      drinkList: [
        {
          drinkId: '1',
          drinkName: '코카콜라',
          price: 700,
          qty: 1
        },
        {
          drinkId: '2',
          drinkName: '펩시',
          price: 800,
          qty: 3
        },
        {
          drinkId: '3',
          drinkName: '환타',
          price: 600,
          qty: 2
        },
        {
          drinkId: '4',
          drinkName: '칠성',
          price: 900,
          qty: 4
        },
        {
          drinkId: '5',
          drinkName: '나랑드',
          price: 1000,
          qty: 1
        }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
