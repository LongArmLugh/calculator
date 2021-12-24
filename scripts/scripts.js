// TODO 
//  add 'clear all' button
//  handle dot logic
function load() {
    const buttons = document.querySelectorAll('.btn');
    view.screenMain = document.getElementById('screenTxt');

    state.reset();

    const keyPressEvent = function() {
        const key = this.dataset.key;
        const type = this.dataset.type;
        check(type, key);
    };

    // Once loaded eventListeners talk to check which talks to controller
    buttons.forEach( item => {
        item.addEventListener('click', keyPressEvent);
    });   
}
// ------------
function check(type, key) {
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
    expression: false,
    clear: true,
}
// ------------
const state = {
    // Modifies permit object properties
    phase: null,
    reset: function() {
        console.log('LOADING');
        data.total = 0;
        data.input = ['0'];
        state.toStart(); 
        view.render();  
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
const view = {
    // screenMain is set in load()
    screenMain: null,
    mainOut: null,
    render: function() {
        this.mainOut = data.input.join('');
        this.screenMain.textContent = this.mainOut;
        console.table(permit);
        console.log(`total: ${data.total}`);
        console.log(`input: ${data.input}`);
        console.log(`at: ${state.phase}`);
        console.log(">>>");   
    }
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
    if (type === 'clear') {
        state.reset();
        return
    }
    // handle dot
    // add input
    // update state
    // render
    console.log('key pressed: ' + key);

    if (state.phase === 'start') {
        data.clearInput();
        data.input.push(key);
        state.toLeftNum();
        view.render()

    } else if (state.phase === 'leftNum') {
        if (type === 'ops') {
            data.input.push(` ${key} `);
            state.toOperator();
            view.render();
        } else {
            data.input.push(key);
            view.render();
        }

    } else if (state.phase === 'operator') {
        data.input.push(key);
        state.toRightNum();
        view.render()

    } else if (state.phase === 'rightNum') {
        
        if (type === 'equal') {
            const total = calculate.operate(data.input);
            data.total = total;
            data.clearInput();
            data.input.push(total);
            state.toTotal();
            view.render();

        } else {
            data.input.push(key);
            view.render();
        }

    } else if (state.phase === 'total') {
        data.input.push(` ${key} `);
        state.toOperator();
        view.render();
    }
    
}

load();