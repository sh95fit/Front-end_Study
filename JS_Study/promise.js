// Promise

// Promise 사용법
const ex = new Promise((resolve, reject) => {
  // code
})
// resolve : 성공했을 시 실행되는 함수
// reject : 실패했을 시 실행되는 함수

// Promise 객체는 defalt로 state, result를 가짐
// state : pending(대기)
// 성공 시 fulfilled(이행됨) 상태로 변환 및 value를 result로 반환
// 실패 시 rejected(거부됨) 상태로 변환 및 error를 result로 반환


const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('OK')
    reject(new Error("err..."));
  }, 3000)
});

console.log('Start')
pr.then(result => {
    console.log(result + ' Success')
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    console.log('End');
  });


  // 활용 예제
const f1 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 프로세스");
    }, 1000)
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("2번 프로세스");
      // rej(new Error("2번 프로세스 실패"));
    }, 1000)
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 프로세스");
    }, 1000)
  });
};

// 프로미스 체이닝 (Promise chaining)
console.log('Start');
console.time('시작');
f1()
  .then(res => f2(res))
  .then(res => f3(res))
  .then(res => console.log(res))
  .catch()
  .finally(() => {
    console.log('End');
    console.timeEnd('시작');
  })



  // Promise.all
  // 하나라도 오류가 발생하면 보여주지 않아야 하는 경우 활용!
  // 모두가 정상 처리되어야만 보여줄 수 있음
  console.time('x')
  Promise.all([f1(), f2(), f3()]).then((res) => {
    console.log(res);
    console.timeEnd('x');
  });


// Promise.race
// 하나라도 완료가 되면 프로세스 종료
console.time('y')
Promise.race([f1(), f2(), f3()]).then((res) => {
  console.log(res);
  console.timeEnd('y');
})

