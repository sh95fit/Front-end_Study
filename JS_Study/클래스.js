// 클래스 예제
class UserInfo {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  showName() {
    console.log(this.name, this.age);
  }
}

// 클래스는 new를 통해 인스턴스를 생성해주지 않으면 사용할 수 없다!
const tester = new UserInfo('tester', 39);

console.log(tester)
console.log(tester.showName())



// 클래스 상속
// extends

class Car {
  constructor(color) {
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log('drive ...');
  }
  stop() {
    console.log('STOP!');
  }
}

class Car1 extends Car {
  constructor(color){
    super(color);
    this.navigation = 1;
  }
  park() {
    console.log('Parking');
  }
  // 메소드 오버라이딩
  stop() {
    // 부모 클래스의 함수를 활용할 때 super 사용
    super.stop()
    console.log('stop')
  }
}

const car2 = new Car1('blue')

console.log(car2.stop())
console.log(car2.navigation)
console.log(car2.color)