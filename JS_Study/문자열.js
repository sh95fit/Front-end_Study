// `` : 여러 줄을 포함할 수 있으며, 변수 지정이 가능하다
let text1 = `aaaaaa sdkfljdlkfjdlk
asdklfjsdlkfjsdlkf
klsdkfjklsdfjdlkfj`;

let num = 10
let num1 = `This num is ${num}`

console.log(text1)
console.log(num1)


// 문자열 길이
console.log(text1.length)


// 배열처럼 한 글자씩 추출할 수는 있으나 한 글자만 변경하지는 못한다!
console.log(text1[1])


// 대소문자 변환
// toUpperCase() : 대문자로 변환
// toLowerCase() : 소문자로 변환
let text2 = 'Hello JS, Nice to meet you!';

console.log(text2.toUpperCase());
console.log(text2.toLowerCase());


// 문자열 인덱스 찾는 방법
// indexOf('찾고자하는 단어')
// 찾고자 하는 단어가 여러개여도 가장 첫번째 단어의 인덱스만 반환!
console.log(text2.indexOf('Nice'))


// 문자열 슬라이싱
// slice(start, end)
console.log(text2.slice(2,5));


// substring(n, m)
// 시작과 끝이 아닌 인덱스 범위로하여 슬라이싱
// 즉 음수값을 적용할 수 없다! 음수는 0으로 인식!
console.log(text2.substring(5,2));


// substr(n, m)
// n은 시작 인덱스 , m은 인덱스가 아닌 개수!
console.log(text2.substr(2,5));


// trim() : 앞뒤 공백 제거
let tr = '        here   ';
console.log(tr.trim())


// repeat(n)
// 문자열을 n번 반복
console.log(text2.repeat(3));


// 문자열 크기 비교는 아스키코드 기준으로 적용된다
// 아스키 코드 얻는 방법
// codePointAt(0);
// fromCodePoint(숫자);
console.log("b".codePointAt(0));
console.log(String.fromCodePoint(98));

