// Rest parameters(나머지 매개변수), Spread syntax(전개 구문)


// 이전
function showName(name) {
  console.log(name);
  // arguments를 통해 함수로 넘어온 모든 인수에 접근할 수 있다! (함수 내에서 이용 가능한 지역변수)
  // 배열 내장 메서드는 없으므로 주의!(ex> forEach, map)
  console.log(arguments.length);
  console.log(arguments[0]);
  console.log(arguments[1]);
}

// 매개변수 개수가 맞지 않아도 에러는 발생하지 않는다!
// showName('test1');
showName('test1', 'test2');
// showName();


// 나머지 매개변수 (Rest parameters)
// 나머지 매개변수는 항상 마지막에 위치시킨다!

function showLabel(...labels) {
  console.log(labels);
  labels.forEach(label => console.log(label));
}

showLabel('label1','label2');
showLabel('label1');
showLabel();  // 빈 배열! undefined x


// 생성자 함수 활용
function User(name, age, ...skills) {
  this.name = name;
  this.age = age;
  this.skills = skills;
}

const user1 = new User('tester1', 29, 'html', 'css');
const user2 = new User('tester2', 30, 'react', 'js');
const user3 = new User('tester3', 43, 'python', 'vue');

console.log(user1)
console.log(user2)
console.log(user3)


// 전개구문(Spread syntax) : 배열
let arr1= [1,2,3];
let arr2= [4,5,6];

let result = [...arr1, ...arr2];

console.log(result);


// 전개구문(Spread syntax) : 복제
let user4 = {name:'tester4', age:40};
let user5 = {...user4};

user5.name = "Tom";

console.log(user4);
console.log(user5);