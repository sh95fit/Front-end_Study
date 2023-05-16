// 클로저
// 은닉에 활용
// 함수와 어휘적 환경(Lexical Environment)의 조합
// 함수가 생성될 당시의 외부 변수를 기억
// 생성 이후에도 계속 접근 가능

function makeAdder(x) {
  return function(y) {
    return x+y;
  }
}

const add3 = makeAdder(3);
console.log(add3(2));

const add10 = makeAdder(10);
console.log(add10(5));
// 위에서 생성할 때 넣었던 외부변수 3을 기억함
console.log(add3(1));


// 추가
// setTimeout : 일정 시간이 지난 후 함수를 실행
// setInterval : 일정 시간 간격으로 함수를 반복
// *주의사항 : 0초를 적어도 실질적으로 0초가 아닌 코드를 해석하는 시간이 소요된다

function fn() {
  console.log('setTimeout')
}

// setTimeout(함수, delay(ms), 인수)
setTimeout(fn, 3000);


function showName(name) {
  console.log(name);
}

// setTimeout(함수, delay(ms), 인수)
const f = setTimeout(showName, 3000, 'test');


// setTimeout을 대기 시간 내에 취소하고 싶은 경우
clearTimeout(f)


// setInterval
const f1 = setInterval(showName, 1000, 'test2');

// setInterval을 중단할 때에도 동일하게 clearTimeout(f1) 실행
clearTimeout(f1)