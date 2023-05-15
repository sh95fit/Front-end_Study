// 함수 작성 시 유의사항
// 한번에 한 작업에 집중
// 읽기 쉽고 어떤 동작인지 알 수 있게 네이밍


function showError() {
  console.log('에러 발생');
}

showError();


// 호이스팅!
sayHello('rest');

function sayHello(name) {
  let msg = `Hello, ${name}`;
  console.log(msg += ',' + name);
}

sayHello("test");


// 함수 선언문 vs 함수 표현식
// 함수 선언문은 어디서든 호출 가능! (순차적인 순서와 무관하게 호출 가능 -> 호이스팅!)
// 함수 표현식은 코드에 도달하면 생성된다!


// 함수 작성 위치보다 위에 적을 경우 에러 발생!
// testHello();


// 화살표 함수의 경우 리턴문이 1줄인 경우 괄호 생략이 가능하다!

let testHello = () => console.log('Hello');

testHello();