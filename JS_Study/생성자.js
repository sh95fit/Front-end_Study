function User(name, age) {
  // this = {}; 자동 선언
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  }
  // return this; 자동 리턴
}

// 생성자 함수의 경우 new를 활용해 선언
let user1 = new User('Mike', 30);
let user2 = new User('John', 29);
let user3 = new User('Poll', 27);

user1.sayName();
user2.sayName();
user3.sayName();


console.log(user1, user2, user3)
