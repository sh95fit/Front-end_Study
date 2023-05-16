// call, apply, bind
// 함수 호출 방식과 관계없이 this를 지정할 수 있음

// call
// 모든 함수에서 사용할 수 있으며, this를 특정값으로 지정할 수 있다
const user1 = {
  name: 'user1',
};

const user2 = {
  name: 'user2',
};

function showThisName() {
  console.log(this.name);
}

showThisName();
showThisName.call(user1);
showThisName.call(user2);


function updateInfo(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
};

updateInfo.call(user1, 2000, 'tester1');
console.log(user1);

updateInfo.call(user2, 1995, 'tester2');
console.log(user2);


// apply
// 함수의 매개변수를 처리하는 방법 외 call과 동일
// call은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, apply는 매개변수를 배열로 받는다


function updateApply(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
};

updateApply.apply(user1, [2000, 'tester1']);
console.log(user1);

updateApply.apply(user2, [1995, 'tester2']);
console.log(user2);


const num = [3, 12, 5, 23 , 6, 1];
const minNum = Math.min(...num);
const maxNum = Math.max(...num);
const minNum1 = Math.min.apply(null, num);
const maxNum1 = Math.max.call(null, ...num);

// 배열을 그냥 넣는 경우 Math min/max에서 처리하지 못하고 Nan 반환
// 전개구문을 반영해 처리
console.log(minNum);
console.log(minNum1);
console.log(maxNum);
console.log(maxNum1);


// bind
// bind를 활용하면 함수의 this 값을 영구적으로 변경할 수 있다


const updateUser = updateInfo.bind(user1);

updateUser(1888, 'Admin');

console.log(user1);