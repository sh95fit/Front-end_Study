// for문
let num = 0

for (let i=0; i<10; i++) {
  num++;
  console.log(num);
}

console.log("----------------------");

// while문
let num1 = 0
let j=0

while (j < 10) {
  num1++;
  console.log(num1);
  j++;
}

console.log("----------------------");

// 최소 1회 실행이 필요한 경우 활용
do {
  j++;
  console.log(j);
} while (j < 10)

// break : 즉시 반복문 종료
// continue : 해당 조건의 루프를 종료하고 다음 조건 실행