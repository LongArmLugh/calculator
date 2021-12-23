// Get this working on console first calling a control function
//  called keyPress(key)
//  then involve the screen
// load()
// ------------
function check(key) {
    // Assumes key matches one of the permit property keys
    // Passes value to controller
    if (permit[key]) {
        controller(key);
    }
}
// ------------
const permit = {
    int: false,
    zed: false,
    dot: false,
    ops: false,
    equal: false,
    expression: false
}
// ------------
const state = {
    // Modifies permit object properties
    toTotal: function() {
        permit.int = false;
        permit.zed = false;
        permit.dot = false;
        permit.ops = true;
        permit.equal = false;
        permit.expression = false;
    },
    toStart: function() {
        permit.int = true;
        permit.zed = false;
        permit.dot = true;
        permit.ops = false;
        permit.equal = false;
        permit.expression = false;
    },
    toLeftNum: function() {
        // TODO period special cases
        permit.int = true;
        permit.zed = true;
        permit.dot = true;
        permit.ops = true;
        permit.equal = false;
        permit.expression = false;
    },
    toOperator: function() {
        permit.int = true;
        permit.zed = false;
        permit.dot = true;
        permit.ops = false;
        permit.equal = false;
        permit.expression = false;
    }, 
    toRightNum: function() {
        // TODO handle period logic
        permit.int = true;
        permit.zed = true;
        permit.dot = true;
        permit.ops = false;
        permit.equal = true;
        permit.expression = true;
    },
    toggleDot: function() {
        // TODO
        permit.int = false;
        permit.zed = false;
        permit.dot = false;
        permit.ops = false;
        permit.equal = false;
        permit.expression = false;
    }, 
    toggleZed: function() {
        // TODO
        permit.int = false;
        permit.zed = false;
        permit.dot = false;
        permit.ops = false;
        permit.equal = false;
        permit.expression = false;
    },  
}
// -------------
function render(str) {
    console.log(str)
}
// -------------
const data = {
    total: 0,
    input: '',
}
// --------------
const calculate = {
    // TODO old version to be actualized
    // Parses data into total + ops + num by detecting white space
    // Stores functions for processing data
    // Resets screen with total as default
    // add 
    add: function(a, b) {
        return +a + +b;
    },
    // subtract
    subtract: function(a, b) {
        return +a - +b;
    },
    // multiply
    multiply: function(a, b) {
        return +a * +b;
    },
    // divide
    divide: function(dividend, divisor) {
        if (+divisor === 0) {
            // TODO dividing by zero will Rickroll you
            // Message whatever you do, don't divide by zero 
            alert('Dividing by zero breaks the simulation!');
            return 'madness';
            // Timeout magic
        } else {
            return +dividend / +divisor;
        }
    },
    // operate
    operate: function(inputs) {
        const inputsArr = inputs.join('').split(' ');
        const operator = inputsArr[1];
        let total;
        switch(operator) {
            case '+':
                total = this.add(inputsArr[0], inputsArr[2]);
                break;
            case '-':
                total = this.subtract(inputsArr[0], inputsArr[2]);
                break;
            case 'x':
                total = this.multiply(inputsArr[0], inputsArr[2]);
                break;
            case '/':
                total = this.divide(inputsArr[0], inputsArr[2]);
                break;
        }
        return total;
    }
};
// --------------
// controller()