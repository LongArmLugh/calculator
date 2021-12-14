// calc functions
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

// const screenOut = document.getElementById('screenTxt');

// Create an object:
const view = {
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
