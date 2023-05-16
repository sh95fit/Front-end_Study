// Destructuring assignment
// 구조 분해 할당 구문은 배열이나 객체의 속성을 분해해서 그 값을 변수에 담을 수 있게 하는 표현식

let users = "Mike-Tom-Jane";
let [user1,user2,user3] = users.split('-');

console.log(user1, user2, user3);


let num = [3,2,4,7];

// default값 지정
let [a=1, b=4, c=5] = num;

console.log(a,b,c);

// 필요하지 않는 데이터는 공백을 이용해 제거
let [d, ,e] = num;

console.log(d,e);


// 객체 구조 분해
let user = {name:'test', age:30};

let {age, name} = user;
let {name: userName, age: userAge} = user;

console.log(name, age);
console.log(userName, userAge);