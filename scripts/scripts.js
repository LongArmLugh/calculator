// Starting conditions
// TODO add 'clear all' button
function load() {

    state.reset();

    render();

    const keyPressEvent = function() {
        const key = this.dataset.key;
        const type = this.dataset.type;
        check(type, key);
    };

    const buttons = document.querySelectorAll('.btn');

    // Once loaded eventListeners talk to check which talks to controller
    buttons.forEach( item => {
        item.addEventListener('click', keyPressEvent);
    });   
}
// ------------
function check(type, key) {
    // Assumes key matches one of the permit property keys
    // Passes value to controller
    if (permit[type]) {
        controller(type, key);
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
    phase: null,
    reset: function() {
        console.log('LOADING');
        data.total = 0;
        data.input = [];
        state.toStart();   
    },
    toTotal: function() {
        this.phase = 'total';
        permit.int = false;
        permit.zed = false;
        permit.dot = false;
        permit.ops = true;
        permit.equal = false;
        permit.expression = false;
    },
    toStart: function() {
        this.phase = 'start';
        permit.int = true;
        permit.zed = false;
        permit.dot = true;
        permit.ops = false;
        permit.equal = false;
        permit.expression = false;
    },
    toLeftNum: function() {
        // TODO period special cases
        this.phase = 'leftNum';
        permit.int = true;
        permit.zed = true;
        permit.dot = true;
        permit.ops = true;
        permit.equal = false;
        permit.expression = false;
    },
    toOperator: function() {
        this.phase = 'operator';
        permit.int = true;
        permit.zed = false;
        permit.dot = true;
        permit.ops = false;
        permit.equal = false;
        permit.expression = false;
    }, 
    toRightNum: function() {
        // TODO handle period logic
        this.phase = 'rightNum';
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
function render() {  
    console.table(permit);
    console.log(`total: ${data.total}`);
    console.log(`input: ${data.input}`);
    console.log(`at: ${state.phase}`);
    console.log(">>>");
    
}
// -------------
const data = {
    total: null,
    input: null,
    clearInput: function() {
        this.input.splice(0, this.input.length);
    }, 
}
// --------------
const calculate = {
    // Call with 'calculate.operate(data.input)'
    // Parses data into total + ops + num by detecting white space
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
function controller(type, key) {
    // handle dot
    // add input
    // update state
    // render
    console.log('key pressed: ' + key);

    if (state.phase === 'start') {
        data.input.push(key);
        state.toLeftNum();
        render()

    } else if (state.phase === 'leftNum') {
        if (type === 'ops') {
            data.input.push(` ${key} `);
            state.toOperator();
            render();
        } else {
            data.input.push(key);
            render();
        }

    } else if (state.phase === 'operator') {
        data.input.push(key);
        state.toRightNum();
        render()

    } else if (state.phase === 'rightNum') {
        
        if (type === 'equal') {
            const total = calculate.operate(data.input);
            data.total = total;
            data.clearInput();
            data.input.push(total);
            state.toTotal();
            render();

        } else {
            data.input.push(key);
            render();
        }

    } else if (state.phase === 'total') {
        data.input.push(` ${key} `);
        state.toOperator();
        render();
    }
    
}

load();