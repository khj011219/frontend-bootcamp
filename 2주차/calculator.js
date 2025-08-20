// 계산기 JavaScript 코드

// 화면에 값 추가
function appendToDisplay(value) {
    document.getElementById('result').value += value;
}

// 화면 초기화
function clearDisplay() {
    document.getElementById('result').value = '';
}

// 마지막 입력 삭제
function deleteLast() {
    let display = document.getElementById('result');
    display.value = display.value.slice(0, -1);
}

// 계산 실행
function calculate() {
    let display = document.getElementById('result');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = '오류';
    }
}
