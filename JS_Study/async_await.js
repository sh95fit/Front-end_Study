// async
// 항상 Promise를 반환

async function getName() {
  return Promise.resolve('test success')
  // throw new Error('err ...');
}

console.log(getName());

getName().then((test) => {
  setTimeout(() => {
    console.log(test);
  }, 3000);
}).catch((err) => {
  console.log(err);
})


// await
// async 함수 내에서만 활용 가능
async function showName() {
  const result = await getName("Test");
  console.log(result);
}

console.log('시작')
showName();



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

console.log('test');
async function test() {
  try {
    // const result1 = await f1();
    // const result2 = await f2(result1);
    // const result3 = await f3(result2);
    // console.log(result3);
    const result = await Promise.all([f1(), f2(), f3()])
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  console.log('test End')
}


test();