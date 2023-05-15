const human = {
  name:'tester',
  age:29,
  tel:'01012341231',
  gender:'man'
}

console.log(human.name);
console.log(human['age']);

delete human.tel;

console.log(human);

for(let key in human){
  console.log(key);
  console.log(human[key]);
}


function test(name, age) {
  return {
    // name: name,
    name,
    // age: age,
    age,
    hobby: 'test'
  };
}

const tester1 = test('tester1', 29);
console.log(tester1);

console.log('name' in tester1);

if(tester1.name == 'tester1'){
  console.log('로그인 성공');
} else {
  console.log('로그인 실패');
}

// method
// 객체 프로퍼티에 할당된 함수
const superman = {
  name: 'test2',
  age:33,
  action: function() {
    console.log('method');
  }
}

// 줄여쓰기
const superk = {
  name: 'test2',
  age:33,
  action() {
    console.log('method_c');
  }
}

// 내부 인자 활용 시
const superr = {
  name: 'test3',
  age:33,
  action() {
    console.log(`Hello! ${this.name}`);
  },
  sayHi: function() {
    console.log(`Hello ${this.name}`)
  }
}



superman.action();
superk.action();
superr.action();


let tester4 = {
  name: 'tester4',
  // 화살표 함수는 일반 함수와 달리 자신만의 this를 가지지 않아 외부에서 값을 가져옴
  sayHi2: function() {
    console.log(`Hello ${this.name}`)
  }
}

tester4.sayHi2();