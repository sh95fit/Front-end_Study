// toString()
// toString 괄호 내 숫자를 넣으면 해당 진수로 변환
let num = 10;

console.log(num.toString(2));
console.log(num.toString(16));

let num2 = 255;
console.log(num2.toString(2));
console.log(num2.toString(16));


// Math 관련함수
console.log(Math.PI);


// 올림 처리
let n1 = 5.1;
let n2 = 5.7;

console.log(Math.ceil(n1))
console.log(Math.ceil(n2))

// 반올림 처리
let n3 = 5.1;
let n4 = 5.7;

console.log(Math.round(n1))
console.log(Math.round(n2))


// 소수점 자릿수 설정 : toFixed()
// 문자열을 반환하므로 Number로 변환 필요!
let userRate = 11.1234;

console.log(Number(userRate.toFixed(2)));

// isNaN() 만이 NaN을 파악할 수 있다!
let x = Number('x')
console.log(x)
console.log(isNaN(x))

// parseInt()
// 문자열을 숫자로 바꿔줌
// Number와의 차이점 : 문자가 포함되어 있어도 문자를 제외시키고 변환해줌
// 조건 : 숫자가 가장 앞에 위치 해야함! 숫자 이후 최초 문자가 오는 위치에서 잘라 숫자로 변환
// 문자열을 숫자로 변환한 뒤 진수 변환 처리까지 가능
let m = '10px';
let m2 = 'f3';
let m3 = '1f3d';

console.log(parseInt(m));
console.log(parseInt(m2));
console.log(parseInt(m3));
console.log(parseInt(m2, 16));
console.log(parseInt(m3, 16));


// parseFloat()
// parseInt()와 동일하지만 부동소수점을 반환한다는 점에서 차이가 있다
let padding = "18.5%";
console.log(parseFloat(padding))
console.log(parseInt(padding))


// Math.random()
// 0 ~ 1 사이 무작위 숫자 생성
// 1에서 100까지 활용하고 싶은 경우
random_num = Math.floor(Math.random()*100)+1



// Math.max(), Math.min() : 최대/최소값 구하기
// Math.abs() : 절대값 구하기
// Math.pow(x,y) : 제곱 / x의 y 제곱
// Math.sqrt(c) : 제곱근 / c의 제곱근
