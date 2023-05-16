// Generator
// 함수의 실행을 중간에 멈췄다가 재개할 수 있는 기능
// 값을 미리 만들어두지 않아 메모리 효율을 높일 수 있다
// ex> Redux Saga

// next() : yield로 구분되어 있는 단계 중 다음 단계로 이동하는 함수
// return(value) : 다음 단계로 가지 않고 바로 done : true 반환 후 종료
// throw() : 해당 단계에서 에러 반환 후 done : true 반환 후 종료

// iterable  (반복이 가능하다!)
// Symbol.iterator 메서드가 존재
// Symbol.iterator는 iterator를 반환해야한다

// iterator
// next 메서드를 가진다
// next 메서드는 value와 done 속성을 가진 객체를 반환
// 작업이 완료되면 done은 true가 된다




function* fn() {
  try {
    console.log(1);
    yield 1;
    console.log(2);
    yield 2;
    console.log(3);
    yield 3;
    console.log(4);
    return 'finish';
  } catch (e) {
    console.log(e);
  }
}

const a = fn();


console.log(a.next());
console.log(a.throw(new Error('err')));
console.log(a.next());
console.log(a.return('END'));
console.log(a.next());
console.log(a.next());
console.log(a.next());




function* fn1() {
  const num1 = yield "First num =>";
  console.log(num1);

  const num2 = yield "Second num =>";
  console.log(num2);

  return num1+num2;
}

const b= fn1();

console.log(b.next());
console.log(b.next(6));
console.log(b.next(5));
console.log(b.next());



function* gen1() {
  yield "1";
  yield "2";
  yield "3";
  yield "4";
  yield "5";
}

function* gen2() {
  yield "test";
  yield* gen1();
  yield 'end';
}

// 구조분해할당의 경우 done이 true가 될 때까지 진행
console.log(...gen2());