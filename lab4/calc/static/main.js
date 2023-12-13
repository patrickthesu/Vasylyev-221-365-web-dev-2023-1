const screen = document.querySelector('.screen span');

// Функция priority позволяет получить 
// значение приоритета для оператора.
// Возможные операторы: +, -, *, /.

function priority(operation) {
    if (operation == '+' || operation == '-') {
        return 1;
    } else {
        return 2;
    }
}

// Проверка, является ли строка str числом.
function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}

// Проверка, является ли строка str цифрой.
function isDigit(str) {
    return /^\d{1}$/.test(str);
}

// Проверка, является ли строка str оператором.
function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}

// Функция tokenize принимает один аргумент -- строку
// с арифметическим выражением и делит его на токены 
// (числа, операторы, скобки). Возвращаемое значение --
// массив токенов.

function tokenize(str) {
    let tokens = [];
    let lastNumber = '';
    for (char of str) {
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            if(lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        } 
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        } 
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    return tokens;
}

// Функция compile принимает один аргумент -- строку
// с арифметическим выражением, записанным в инфиксной 
// нотации, и преобразует это выражение в обратную 
// польскую нотацию (ОПН). Возвращаемое значение -- 
// результат преобразования в виде строки, в которой 
// операторы и операнды отделены друг от друга пробелами. 
// Выражение может включать действительные числа, операторы 
// +, -, *, /, а также скобки. Все операторы бинарны и левоассоциативны.
// Функция реализует алгоритм сортировочной станции 
// (https://ru.wikipedia.org/wiki/Алгоритм_сортировочной_станции).

function compile(str) {
    let out = [];
    let stack = [];
    for (token of tokenize(str)) {
        if (isNumeric(token)) {
            out.push(token);
        } else if (isOperation(token)) {
            while (
                stack.length > 0 &&
                isOperation(stack[stack.length - 1]) && 
                priority(stack[stack.length - 1]) >= priority(token)
            ) {
                out.push(stack.pop());
            }
            stack.push(token);
        } else if (token == '(') {
            stack.push(token);
        } else if (token == ')') {
            while (stack.length > 0 && stack[stack.length-1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    return out.join(' ');
}

function performOperation(a, b, operator) {
    switch (operator) {
    case '+':
        return a + b;
    case '-':
        return a - b;
    case '*':
        return a * b;
    case '/':
        if (b == 0) return 'Деление на ноль';
        return a / b;
    default:
        return 'Неизвестная операция';
    }
}

function evaluate(str) {
    let stack = [];

    let tokens = str.split(' ');

    for (token of tokens) {
        if (isNumeric(token)) {
            stack.push(parseFloat(token));
        } else if (isOperation(token)) {
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            let result = performOperation(operand1, operand2, token);
            if (!isNumeric(result)) return result;
            stack.push(result);
        }
    }

    return stack.pop();
}

function clickHandler(event) { 
    if (screen.textContent === 'Деление на ноль' || 
        screen.textContent === 'Неизвестная операция') {
        screen.textContent = '';
    }

    if (isDigit(event.target.textContent) ||
        /^[\(\)]{1}$/.test(event.target.textContent)
    ) {
        screen.textContent += event.target.textContent;
    } else if (event.target.textContent === '.' ||
        isOperation(event.target.textContent)
    ) {
        if ((screen.textContent.slice(-1) !== '.' &&
            !isOperation(screen.textContent.slice(-1))) &&
            screen.textContent !== ''
        ) {
            screen.textContent += event.target.textContent;
        }
    } else if (event.target.textContent === 'C') {
        screen.textContent = '';
    } else if (event.target.textContent === '=') {
        let result = evaluate(compile(screen.textContent));
        result = isNumeric(result) ? result.toFixed(2) : result;
        screen.textContent = result;
    }
}


window.onload = function () {
    document.querySelector(
        '.buttons'
    ).addEventListener('click', clickHandler);
};
