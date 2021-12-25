// TODO 
// Sign flip does not apply on rightNum state.
// resize text to fit screen dynamically
//  >> https://stackoverflow.com/questions/18229230/dynamically-changing-the-size-of-font-size-based-on-text-length-using-css-and-ht
function load() {
    const buttons = document.querySelectorAll('.btn');
    view.screenMain = document.getElementById('screenTxt');

    state.reset();

    const keyPressEvent = function() {
        const key = this.dataset.key;
        const type = this.dataset.type;
        console.log(`keypress: ${type}`);
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
        console.log(`check: ${type}`);
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
    sign: false,
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
    },
    toStart: function() {
        this.phase = 'start';
        permit.int = true;
        permit.zed = false;
        permit.dot = true;
        permit.ops = false;
        permit.equal = false;
        permit.sign = false;
    },
    toLeftNum: function() {
        this.phase = 'leftNum';
        permit.int = true;
        permit.zed = true;
        permit.dot = true;
        permit.ops = true;
        permit.equal = false;
        permit.sign = true;
    },
    toOperator: function() {
        this.phase = 'operator';
        permit.int = true;
        permit.zed = false;
        permit.dot = true;
        permit.ops = false;
        permit.equal = false;
        permit.sign = false;
    }, 
    toRightNum: function() {
        this.phase = 'rightNum';
        permit.int = true;
        permit.zed = true;
        permit.dot = true;
        permit.ops = false;
        permit.equal = true;
        permit.sign = true;
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
    // Modulo
    modulo: function(dividend, divisor) {
        if (+divisor === 0) {
            // TODO dividing by zero will Rickroll you
            // Message whatever you do, don't divide by zero 
            // Timeout magic
        } else {
            console.log(`modulo!`);
            return +dividend % +divisor;
        }
    },
    // Flip sign
    signFlip: function() {
        // I should inplement this in operate and allow only during leftNum, rightNum or total states
        //   as written it only affects the last digit instead of the number itself
        if ( !+data.input.join('') ) { // Handles '0', '0.', and '0.0...'
            // i.e. if falsy do nothing
            return;
        }
        let n = data.input.pop();
        n *= -1;
        data.input.push(n);
        console.log(n);
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
            case '%':
                total = this.modulo(inputsArr[0], inputsArr[2]);
                break;
        }
        return total;
    }
};
// --------------
function controller(type, key) {
    // -------------
    console.log('key pressed: ' + key);
    // Exceptional Inputs
    if (type === 'clear') {
        state.reset();
        return
    }

    if (type === 'sign') {
        // TODO call when entering a minus sign at start state
        calculate.signFlip();
        view.render();
        return;
    }

    // if (type === 'dot') {
    //     if (state === 'start') {
    //         data.input.push(`0${key}`);
    //         state.toLeftNum();
    //         view.render();
    //     }
    // }
    // handle dot
    // add input
    // update state
    // render
    //---------------
    // General Inputs control logic, handles integer inputs, operators and totals
    //  along with the basic flow of states
    if (state.phase === 'start') {
        if (type === 'dot') {
            data.clearInput(); 
            data.input.push('0');
            data.input.push('.');
            state.toLeftNum();
            permit.dot = false;
            view.render();
        } else {
            data.clearInput(); 
            data.input.push(key);
            state.toLeftNum();
            view.render() 
        }
        
        
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
        if (type === 'dot') {
            data.input.push('0');
            data.input.push('.');
            state.toRightNum();
            permit.dot = false;
            view.render();
        } else {
            data.input.push(key);
            state.toRightNum();
            view.render();
        }


    } else if (state.phase === 'rightNum') {
        
        if (type === 'equal') {
            const total = calculate.operate(data.input);
            data.total = total;
            data.clearInput();
            data.input.push(total);
            state.toTotal();
            view.render();

        } else if (type === 'dot') {
            data.input.push(key);
            permit.dot = false;
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