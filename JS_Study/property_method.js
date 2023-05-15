// Computed property (계산된 프로퍼티)

let a = 'age';

const user = {
  name : 'test',
  [a] : 29,
  ['te'+'st'] : 'testing'
}

console.log(user);


// Method

// Object.assign() : 객체 복제
const cloneUser = Object.assign({}, user);    // 첫번째 값은 초기값!! 추가할 내용이 없으면 미반영!
cloneUser.name = 'test1';
console.log(cloneUser);
console.log(user.name);

const cloneUser2 = Object.assign({gender:'m'}, user);    // 첫번째 값은 초기값!! 추가할 내용이 없으면 미반영!  ** 다중으로 합칠 수 있음!
console.log(cloneUser2);

// Object.keys()
console.log(Object.keys(user));
console.log(Object.keys(cloneUser2));

// Object.values()
console.log(Object.values(user));
console.log(Object.values(cloneUser2));

// Object.entries()
const result1 = Object.entries(user);
const result2 = Object.entries(cloneUser2);

console.log(result1);
console.log(result2);

// Object.fromEntries()
let arr = [
  ['test', 'tester'],
  ['test1','tester1']
]

const result3 = Object.fromEntries(arr)
console.log(result3);


// Symbol() : 유일성이 보장된다!
// 또한 일반 호출로 호출되지 않는다!
// 원본을 변경하지 않고 속성을 추가할 수 있음
const k = Symbol('hello');
const q = Symbol();
console.log(k === q);
console.log(k.description);


// Symbol.for() : 전역 심볼
// 하나의 심볼만 보장받을 수 있다!
// 없으면 생성, 있으면 불러오기
// Symbol 함수는 매번 다른 Symbol 값을 생성하지만 Symbol.for 메서드는 하나를 생성한 뒤 키를 통해 같은 Symbol 공유
const k1 = Symbol.for('test key1');
const q1 = Symbol.for('test key2');
console.log(k1 === q1)
console.log(Symbol.keyFor(k1))

// 숨겨진 Symbol key를 확인하는 방법
// Object.getOwnPropertySymbols();
console.log(Object.getOwnPropertySymbols(k));
console.log(Reflect.ownKeys(user)); // 심볼이 있는 경우 함께 보여줌
