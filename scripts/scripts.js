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
        }
        opsIn.press(btn);
        console.log(btn);
    }

    view.screen = document.getElementById('screenTxt');
    view.update(data.formStr());

    const btnList = Array.from(document.querySelectorAll('.btn:not(.operator)'));
    const operatorList = Array.from(document.querySelectorAll('.operator'));

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
                    zedIn.enable = false;
                    opsIn.enable = false;
                }
                this.state = newState;
            break;
            case 'Ops':
                // Only Natural numbers available -> Expression
                this.expression = true;
                zedIn.enable = true;
                opsIn.enable = true;
                total.enable = true;
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
                if (newState === 'Start') {
                    this.reset();
                }
                this.state = newState;
                break;
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
        const MESSAGE = 'SNARKY ERROR';
        return divisor === '0' ? MESSAGE : +dividend / +divisor;
    },
    // operate
    operate: function(operation, a, b) {
        operation(a, b);
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
    // triggers calculation if state == expression
    // updates data
    // updates view
    // updates state
    type: '', // set on assignment
    enable: false,
    setType: function(btn) {
        this.type = btn;
    },
    press: function() {
        this.setType(btn);
        if (state.state === 'Expression') {
            // TODO
        }
        if (this.enable === true) {
            data.addOps(this.type);
            view.update(data.formStr());
        } 
    }
};

const zedIn = {
    type: '0',
    enable: false,
    press: function() {
        if (this.enable === true) {
            data.addNumber(this.type);
            view.update(data.inputs.join(''));
        }
    },
    // TODO
};

const total = {
    // update data to total
    // state to total (similar to start)
};

const clear = {
    // resets all
    type: 'c',
    // combine into one
    press: function() {
        state.reset();
        zedIn.enable = false; // Should have been handled by state.reset() but it's bugged
        view.update(data.formStr());
    }
};

load();