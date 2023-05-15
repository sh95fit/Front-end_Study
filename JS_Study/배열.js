// 배열 (Array)
// 순서가 있는 리스트
// 문자 뿐만 아니라 숫자, 객체, 함수 등도 포함할 수 있음

let ArrayN = ['test1','test2','test3'];

console.log(ArrayN[1])
console.log(ArrayN.length)
ArrayN.push('test4')
console.log(ArrayN)
ArrayN.pop()
console.log(ArrayN)
ArrayN.unshift('test0')
console.log(ArrayN)
ArrayN.shift();
console.log(ArrayN)


for(let n of ArrayN) {
  console.log(n);
}