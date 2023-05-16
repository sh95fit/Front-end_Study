// 상속 예제

const car = {
  wheels : 4,
  drive() {
    console.log('drive ...');
  },
}

const car1 = {
  color : 'red',
}

const car2 = {
  color : 'blue',
}

const car3 = {
  color : 'green',
}

car1.__proto__ = car;
car2.__proto__ = car;
car3.__proto__ = car;

console.log(car1.wheels, car2.wheels, car3.drive)


// 프로토타입 체인
// 상속의 상속을 이어나갈 수 있음

for(p in car1) {
  if(car1.hasOwnProperty(p)){
    console.log('o', p);
  } else {
    console.log('x', p);
  }
}


const carInfo = function(color) {
  this.color = color;
}

const car4 = new carInfo('dark');
const car5 = new carInfo('white');


// car4.__proto__ = car;
// car5.__proto__ = car;

// 생성자에서 임의로 속성을 추가해줄 수 있다
// 속성은 하나씩 추가해서 사용하는 것이 안전!
carInfo.prototype.wheels = 5;
carInfo.prototype.drive = function () {
  console.log('drive .....')
};


console.log(car4.wheels)
console.log(car5.drive())


console.log(car4.constructor === carInfo);
console.log(car4 instanceof carInfo);