// add 
function add(a, b) {
    return +a + +b;
}
// subtract
function subtract(a, b) {
    return +a - +b;
}
// multiply
function multiply(a, b) {
    return +a * +b;
}
// divide
function divide(dividend, divisor) {
    const MESSAGE = 'SNARKY ERROR';
    return divisor === '0' ? MESSAGE : +dividend / +divisor;
}
// operate
function operate(operation, a, b) {
    operation(a, b);
}

const view = {
    // View Object
    screen: null,
    output: null,
    update: function(output) {
        this.output = output;
        this.screen.textContent = this.output;
    },
    reset: function() {
        this.output = null;
        this.screen.textContent = this.output;
    }
}
view.screen = document.getElementById('screenTxt');

const operator = {
    // Operator object
    atTotal: false,
    isActive: false,
    list: null,
    type: null,
    hasPeriod: false,
    activate: function() {
        if (this.isActive === false) {
            this.isActive = true;
        }
    },
    press: function() {
        if (this.type === '=') {
            this.atTotal = true;
            this.list.splice(0, this.list.length);
            this.list.push('total');
        } else if (this.isActive === false) {
            this.list.push(this.type);
            this.activate();
        } 
    },
}
// Input handling
// perhaps turn into an object that can detect state
// operators and period should toggle state to disable
// numbers should toggle state to enable operators.
const model = {
    // Model Object
    inputs: [],
    reset: function() {
        this.inputs.splice(0, this.inputs.length);
    }, 
    parse: function() {
        console.log('parsing');
    },
}


operator.list = model.inputs;

const addNumberEvent = function() {
    if (operator.atTotal === true) {
        operator.atTotal = false;
        model.reset();
        view.reset();
    }
    const btn = this.textContent;
    operator.isActive = false;
    model.inputs.push(btn);
    view.update(model.inputs.join(''));
};

const addOperatorEvent = function() {
    const btn = this.textContent;  
    switch (btn) { 
        case 'c':
            model.inputs.splice(0, model.inputs.length);
            view.reset();
            break;
        case '+/-':
            break;
        case '%':
            break;
        case '/':
            operator.type = '+';
            operator.press();
            break;
        case 'x':
            operator.type = '+';
            operator.press();
            break;
        case '-':
            operator.type = '+';
            operator.press();
            break;
        case '+':
            operator.type = '+';
            operator.press();
            break;
        case '.':
            operator.type = '+';
            operator.press();
            break;
        case '=':
            operator.type = '=';
            operator.press();
            break;
    }
    view.update(model.inputs.join(''));
}

const btnList = Array.from(document.querySelectorAll('.btn:not(.operator)'));
const operatorList = Array.from(document.querySelectorAll('.operator'));
btnList.forEach(item => {
    item.addEventListener('click', addNumberEvent);
});
operatorList.forEach(item => {
    item.addEventListener('click', addOperatorEvent);
});






// let a = prompt('a');
// let operation = prompt('operation');
// let b = prompt('b');

// if (operation === '+') {
//     alert(add(a, b));
// } else if (operation === '-') {
//     alert(subtract(a, b));
// } else if (operation === 'x' || operation === 'X') {
//     alert(multiply(a, b));
// } else if (operation === '/'){
//     alert(divide(a, b));
// } else {
//     alert('INVALID OPERATOR')
// }
