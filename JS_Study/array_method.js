// Array 관련 함수


// push() : 뒤에 삽입
// pop() : 뒤에 삭제
// unshift() : 앞에 삽입
// shift() : 앞에 삭제



// splice(시작, 개수) : 특정 요소를 지움
// 삭제된 요소들은 반환한다!

let arr = [
  'test1', 'test2', 'test3', 'test4', 'test5'
]

let res = arr.splice(1,3);

console.log(arr)
console.log(res)


// splice(시작, 개수, 시작 위치에 추가할 요소들 ...)
// 즉 0을 넣으면 아무것도 지우지 않고 추가만 할 수 있다!
arr.splice(0,1,'test1','test2','test3','test4')

console.log(arr)



// slice(n,m) : n부터 m까지 반환! m이 개수가 아닌 인덱스!
// slice() : 괄호 안이 비어있는 경우 전체 배열 복사!
let arr2 = arr.slice();
console.log(arr2)

// concat(arr2, arr3 ...) : 배열을 합쳐 새 배열을 반환
let res1 = arr.concat(arr2);
console.log(res1)


// forEach(fn) : 배열 반복
let users = ['tester1', 'tester2', 'tester3']

users.forEach((item,index,arr) => {
  console.log(`${index +1} : ${item} / ${arr}`);
});


// indexOf(찾고자하는 값, 탐색시작인덱스) : 해당 값의 인덱스 반환
// lastIndexOf(찾고자하는 값) : 끝에서부터 탐색 시작!


// includes(값) : 해당 값을 포함하고 있는지 확인할 때 사용


// find(함수), findIndex(fn) : 함수를 적용해 찾을 때 활용
// find(함수) 첫번째 true 값만 반환! 인덱스가 아닌 값을 반환한다!
// findIndex(함수)의 경우 인덱스를 반환!
let arr3 = [1,1,2,3,4,5]

const result4 = arr3.find((item) => {
  return item%3 == 0;
})

console.log(result4)


// filter(함수) : 해당 함수를 만족하는 모든 요소를 배열로 반환!
const result5 = arr3.filter((item) => {
  return item%2 == 0;
})

console.log(result5)


// reverse() : 배열을 역순으로 재정렬


// map() : 함수를 받아 특정 기능을 수행하고 새로운 배열을 반환!
let userList = [
  { name:'tester1', age:23},
  { name:'tester2', age:19},
  { name:'tester3', age:33}
];

let newUserList = userList.map((user, index) => {
  return Object.assign({}, user, {
    isAdult: user.age > 20
  });
});

console.log(newUserList);


// join(), split()
let array1 = ["Hello", "Javascript", "Study"]

let res2 = array1.join();

console.log(res2);

let res3 = res2.split(',');

console.log(res3);


// Array.isArray(배열)
let arr4 = {
  name: "test",
  age: 30
}

let arr5 = [
  "test1", "test2", "test3"
]

console.log(Array.isArray(arr4));
console.log(Array.isArray(arr5));


// sort(함수) : 배열 자체를 재정렬해준다!
// 정렬을 할 때 숫자를 문자열로 판단하여 맨앞의 값을 기준으로 정렬이 된다!
// 제대로된 정렬을 위해서는 함수를 적용하여 재정렬해야한다!

let arr6 = [1,3,5,4,2,7,6];
let arr7 = ['a','b','c','e','g','f'];
let arr8 = [23, 12, 43, 28];

function fn(a,b) {
  return a-b;
}

arr6.sort();
arr7.sort();

arr8.sort(fn);

console.log(arr6);
console.log(arr7);
console.log(arr8);

// Lodash 활용 시
// _.sortBy(arr) 형태로 하여 문자, 숫자 자료형 상관없이 sort 적용이 간편하게 가능!


// reduce(함수, 초기값)
// (누적 계산값, 현재값) => { return 계산값 };
// 즉, 배열 전체의 합을 확인할 때 활용

// prev : 이전까지의 누적 값 , cur : 현재 값
const res4 = arr6.reduce((prev, cur)=>{
  return prev + cur;
}, 0);

console.log(res4);


let userList1 = [
  { name:'tester1', age:30},
  { name:'tester2', age:15},
  { name:'tester3', age:23},
  { name:'tester4', age:13},
  { name:'tester5', age:63},
]

let res5 = userList1.reduce((prev, cur)=>{
  if(cur.age > 19) {
    prev.push(cur.name);
  }
  return prev;
}, [])

console.log(res5)