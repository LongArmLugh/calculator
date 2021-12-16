function load() {
    // On page load
    // TODO
// >addNumberEvent
//check atNumber istead
// make period trigger atNumber
const numberPressEvent = function() {
    if (operations.atTotal === true) {
        operations.atTotal = false;
        model.reset();
        view.reset();
        // add total to screen
    }
    const btn = this.textContent;
    if (btn === '0') {
        if (operations.hasPeriod === true) {
            operations.numberPress();
            model.inputs.push(btn);
            view.update(model.inputs.join(''));
        }
        if (operations.atNumber === true) {
            operations.numberPress();
            model.inputs.push(btn);
            view.update(model.inputs.join(''));
        }
        // Zero does nothing if above conditions are false
    } else {
        operations.numberPress();
        model.inputs.push(btn);
        view.update(model.inputs.join(''));
    }  
};

    const operatorPressEvent = function() {
        const self = this.textContent;
        // console.log(`${item.textContent}`);
        const index = operations.operators.findIndex(o => o.type === self);
        
        //console.log(operations.operators[index]);
        operations.operators[index].setPermission();
        if (operations.operators[index].permission) {
            operations.operators[index].addInput(self);
            operations.operators[index].use();
            operations.operators[index].permission = false;
            if (operations.operators[index].type !== '.' ) {
                operations.atNumber = false;
            }
        }
    }


view.screen = document.getElementById('screenTxt');
operations.list = model.inputs;


const btnList = Array.from(document.querySelectorAll('.btn:not(.operator)'));
const operatorList = Array.from(document.querySelectorAll('.operator'));
btnList.forEach(item => {
    item.addEventListener('click', addNumberEvent);
});
operatorList.forEach(item => {
    item.addEventListener('click', addOperatorEvent);
});
}

const state = {
    // Stores state and flags
    // reset()
    // Start, Int, Ops, Expression
    hasPeriod: false,
    state: 'start',
    controller: function(input) {
        // Called by keypresses
        // TODO
    },
    reset: function() {
        this.hasPeriod = false;
        this.state = 'start';
    } 
};

const data = {
    // at start ['0'];
    // if state == start
    //      clear data
    // data
    // total
    // reset()
    total: '0',
    inputs: [this.total],
    addOps: function(input) {
        this.inputs.push(` ${input} `);
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
    update: function(output) {
        this.output = output; // makes no assumptions on output
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
    setType: function(element) {
        this.type = element.textContent;
    },
    permission: true,
    // set according to state
    setPermission: function() {
        if(operations.atNumber === true) {
            this.permission = true;
        }
    },
    // combine to one function
    use: function() {
        operations.hasPeriod = false;
        operations.isExpression = false;
        console.log('+ used');
    },
    addInput: function(btn) {
        model.inputs.push(btn);
        view.update(model.inputs.join(''));
    }
};

const opsIn = {
    // triggers calculation if state == expression
    // updates data
    // updates view
    // updates state
    type: '', // set on assignment
    permission: false,
    setType: function(element) {
        this.type = element.textContent;
    },
    setPermission: function() {
        if(operations.atNumber === true) {
            this.permission = true;
        }
    },
    use: function() {
        operations.hasPeriod = false;
        operations.isExpression = false;
        console.log('/ used');
    },
    addInput: function(btn) {
        model.inputs.push(btn);
        view.update(model.inputs.join(''));
    }
};

const zedIn = {
    // if state == int
    //      updates data 
    //      updates view
    //      updates state
    // TODO
};

const total = {
    // update data to total
    // state to total (similar to start)
};

const clear = {
    // resets
    //      data
    //      view
    //      state
    type: 'c',
    permission: true,
    // combine into one
    use: function() {
        state.reset();
        data.list.splice(0, data.list.length);
        data.total = '0';
    },
    addInput: function(btn) {
        model.reset();
        view.update(model.inputs.join(''));
    }
};

load();