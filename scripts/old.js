function load() {
    // let phrase = ['f', 'u', 'c', 'k'];
    // console.log(phrase.join(''));

    const numberPressEvent = function() {
        const btn = this.textContent;
        // console.log(btn);
        if (btn === '0') {
            zedIn.press();
        } else {
           numIn.press(btn); 
        }
    };

    const operatorPressEvent = function() {
        const btn = this.textContent;
        if (btn === 'c') {
            clear.press();
        } else if (btn === '=') {
            totalOp.press();
        } else {
            opsIn.press(btn);
            // console.log(btn);           
        }

    }

    view.screen = document.getElementById('screenTxt');
    view.update(data.formStr());

    const btnList = Array.from(document.querySelectorAll('.btn:not(.operator)'));
    const operatorList = Array.from(document.querySelectorAll('.operator'));

    // Disable btns
    const hash = operatorList.find(el => el.textContent === '#');
    const modulo = operatorList.find(el => el.textContent === '%');
    hash.disabled = true;
    modulo.disabled = true;

    btnList.forEach( item => {
        item.addEventListener('click', numberPressEvent);
    });
    operatorList.forEach(item => {
        item.addEventListener('click', operatorPressEvent);
    });
}

const state = {
    // Stores state and flags
    // reset()
    // Start, Int, Ops, Expression
    expression: false,
    hasPeriod: false,
    state: 'Start',
    updateState: function(newState) {
        switch(this.state) {
            case 'Start':
                // Only Integers and period -> Int
                console.log(`start triggered`);
                zedIn.enable = true;
                opsIn.enable = true;
                this.state = newState;
                break;
            case 'Int':
                // Everything enabled, period has exceptions -> Ops
                if (newState === 'Ops') {
                    // zedIn.enable = false;
                    opsIn.enable = false;
                }
                this.state = newState;
            break;
            case 'Ops':
                // Only Natural numbers available -> Expression
                this.expression = true;
                // zedIn.enable = true;
                opsIn.enable = true;
                totalOp.enable = true;
                this.state = newState;
                break;
            case 'Expression':
                // Similar to Int but allows total and triggers a total with opsIn 
                // -> Int OR Start(with Total) 
                if (newState === 'Ops') {
                    this.expression = false;
                    zedIn.enable = false;
                    opsIn.enable = false;
                    total.enable = false;
                } 
                if (newState === 'runningTotal') {
                    this.expression = false;
                    numIn.enable = false;
                    zedIn.enable = false;
                    opsIn.enable = true;
                    totalOp.enable = false;
                }
                if (newState === 'Start') {
                    this.reset();
                }
                this.state = newState;
                break;
            case 'equalTotal': {
                if (newState === 'Int') {
                    zedIn.enable = true;
                    opsIn.enable = true;
                }
                this.state = newState;
                break;
            }
            case 'runningTotal': {
                if (newState === 'Int') {
                    numIn.enable = true;
                }
                this.state = newState;
                break;
            }
        }
    },
    reset: function() {
        this.expression = false;
        this.hasPeriod = false;
        this.state = 'Start';
        data.inputs = ['0'];
        data.total = 0;
    } 
    // numEvent: function() 
};

const data = {
    // at start ['0'];
    // if state == start
    //      clear data
    // data
    // total
    // reset()
    total: 0,
    inputs: ['0'],
    // inputsStr: 'meow',
    formStr: function() {
        return this.inputs.join('');
    },
    addNumber: function(numIn) {
        this.inputs.push(numIn);
    },
    addOps: function(opsIn) {
        this.inputs.push(` ${opsIn} `);
    },
    reset: function() {
        this.inputs.splice(0, this.inputs.length);
    }, 
};

const view = {
    // Handles display
    // starts with zed
    //reset()
    // View Object
    screen: null, // set by load()
    output: null, // usually set to data.inputs, no assumptions
    update: function(inputStr) {
        // makes no assumptions on output
        this.output = inputStr;
        this.screen.textContent = this.output;
    },
    reset: function() {
        this.output = null;
        this.screen.textContent = this.output;
    }
};

const calculator = {
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

// Inputs
const numIn = {
    // updates data 
    // updates view
    // updates state
    // model differently BIG TODO!!!
    type: '', // set on assignment
    enable: true,
    setType: function(btn) {
        this.type = btn;
    },
    press: function(btn) {
        if (state.state === 'Start') {
            data.reset();
        }
        if (state.state === 'equalTotal') {
            data.reset();
            state.updateState('Int');
        } 
        if (this.enable === true) {
            this.setType(btn);
            data.addNumber(btn);
            view.update(data.inputs.join(''));
            if (state.state === 'Start') {
                state.updateState('Int');
            } 
            if (state.state === 'Ops') {
                state.updateState('Expression');
            }   
        }
    }
};

const opsIn = { // Operation In
    // Bug adding the '/' after reset
    type: '', // set on assignment
    enable: false,
    setType: function(btn) {
        this.type = btn;
    },
    press: function(btn) {
        this.setType(btn);
        if (state.state === 'Expression' || state.state === 'atTotal') {
            const total = calculator.operate(data.inputs);
            if (total === 'madness') { // You divided by zero, you goon!
                clear.press();
            } else {
            data.total = total;
            data.reset();
            data.inputs.push(`${total}`);
            view.update(data.formStr());
            state.updateState('runningTotal');                
            }
        } else if (this.enable === true) {
            numIn.enable = true;
            data.addOps(this.type);
            view.update(data.formStr());
            state.updateState('Ops');
        }
    }
};

const zedIn = {
    // Should allow after operations
    type: '0',
    enable: false,
    press: function() {
        if (this.enable === true) {
            data.addNumber(this.type);
            view.update(data.inputs.join(''));
            if (state.state === 'Ops') {
                state.updateState('Expression');
            }  
        }
    },
    // TODO
};

const totalOp = {
    
    press: function() {
        if (state.state === 'Expression') {
            const total = calculator.operate(data.inputs); // evaluates expression
            if (total === 'madness') { // You divided by zero, you goon!
                clear.press();
            } else {
            numIn.enable = false;
            zedIn.enable = false;
            data.reset();
            data.total = total;
            data.inputs.push(`${total}`);
            view.update(data.formStr());
            state.updateState('runningTotal');                
            }
        }
    }
    // should set state to Int
    // update data to total
    // state to total (similar to start)
};

const clear = {
    // resets all
    type: 'c',
    // combine into one
    press: function() {
        zedIn.enable = false; // Should have been handled by state.reset() but it's bugged
        data.reset();
        state.reset();
        view.reset();
        view.update(data.formStr());
    }
};

load();