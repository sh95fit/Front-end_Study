// let : 1회 선언 후 값 변경은 가능
// const : 절대 바뀌지 않는 상수

// null은 0을 반환하지만 undefined는 NaN을 반환한다!
// 숫자 사이에 문자가 1개 이상 포함되면 NaN으로 변환된다!
console.log(
  Number(null),
  Number(undefined),
  Number("1234abc"),
  Number(true),
  Number(false)
)


// false : 숫자 0, 빈 문자열 '', null, undefined, NaN
// 그외 true
console.log(
  Boolean(0),
  Boolean(''),
  Boolean(null),
  Boolean(undefined),
  Boolean(NaN),
)
