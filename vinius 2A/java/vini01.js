const display = document.getElementById('display');
let current = '0';
let previous = '';
let op = null;

function updateDisplay() {
    display.value = current;
}

function appendNumber(val) {
    if (val === '.' && current.includes('.')) return;
    if (current === '0' && val !== '.') current = val;
    else current += val;
    updateDisplay();
}

function setOperation(operator) {
    if (previous !== '') calculate();
    op = operator;
    previous = current;
    current = '0';
}

function calculate() {
    let a = parseFloat(previous);
    let b = parseFloat(current);
    if (isNaN(a) || isNaN(b)) return;
    let res;
    switch (op) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': 
            if (b === 0) { 
                alert('Erro: divisão por zero'); 
                clearAll(); 
                return; 
            }
            res = a / b; 
            break;
        default: return;
    }
    current = res.toString();
    op = null;
    previous = '';
    updateDisplay();
}

function clearAll() {
    current = '0';
    previous = '';
    op = null;
    updateDisplay();
}

document.querySelectorAll('.num').forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.innerText));
});

document.querySelectorAll('.op').forEach(btn => {
    btn.addEventListener('click', () => setOperation(btn.innerText));
});

document.getElementById('equal').addEventListener('click', () => {
    if (op && previous !== '') calculate();
});

document.getElementById('clear').addEventListener('click', clearAll);

updateDisplay();