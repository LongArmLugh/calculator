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

const operations = {
    // >Requires model obj and view obj
    // Flags
    isExpression: false,
    atNumber: false,
    hasOperator: false,
    hasPeriod: false,
    leadingZero: false,
    atTotal: false,
    operators: [
        // List should be rewritten to be made programatically
        {
            type: '+',
            permission: false,
            setPermission: function() {
                if(operations.atNumber === true) {
                    this.permission = true;
                }
            },
            use: function() {
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            type: '-',
            permission: false,
            setPermission: function() {
                if(operations.atNumber === true) {
                    this.permission = true;
                }
            },
            use: function() {
                console.log('= used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            type: 'x',
            permission: false,
            setPermission: function() {
                if(operations.atNumber === true) {
                    this.permission = true;
                }
            },
            use: function() {
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            type: '/',
            permission: false,
            setPermission: function() {
                if(operations.atNumber === true) {
                    this.permission = true;
                }
            },
            use: function() {
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            type: '=',
            permission: true,
            setPermission: function() {
                this.permission = true;
            },
            use: function() {
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            type: 'c',
            permission: true,
            setPermission: function() {
                this.permission = true;
            },
            use: function() {
                operations.reset();
                operations.list.splice(0, operations.list.length);
            },
            addInput: function(btn) {
                model.reset();
                view.update(model.inputs.join(''));
            }
        },
        {
            type: '.',
            permission: true,
            setPermission: function() {
                this.permission = true;
            },
            use: function() {
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            type: '%',
            permission: false,
            setPermission: function() {
                this.permission = true;
            },
            use: function() {
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            type: "#",
            permission: false,
            setPermission: function() {
                this.permission = true;
            },
            use: function() {
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
    ],
    isNumber: function(char) {
        return /^[0-9]$/.test(char);
    },
    reset: function() {
        this.isExpression = false;
        this.atNumber = false;
        this.hasOperator = false;
        this.hasPeriod = false;
        this.leadingZero = false;
        this.atTotal = false;
    },
    operatorPress: function() {
        this.isExpression = false;
    }, 
    numberPress: function() {
        if (!this.atNumber) {
            this.atNumber = true;
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

view.screen = document.getElementById('screenTxt');
operations.list = model.inputs;

// >addNumberEvent
const addNumberEvent = function() {
    if (operations.atTotal === true) {
        operations.atTotal = false;
        model.reset();
        view.reset();
    }
    const btn = this.textContent;
    if (btn === '0') {
        // TODO
    } else {
        operations.numberPress();
        model.inputs.push(btn);
        view.update(model.inputs.join(''));
    }  
};

// >addOperatorEvent
// Till not clear on accessing objects 
// so instead of using a variable for refference I called 
// it directly each time.
const addOperatorEvent = function() {
    const self = this.textContent;
    // console.log(`${item.textContent}`);
    const index = operations.operators.findIndex(o => o.type === self);
    
    //console.log(operations.operators[index]);
    operations.operators[index].setPermission();
    if (operations.operators[index].permission) {
        operations.operators[index].addInput(self);
        operations.operators[index].use();
        operations.operators[index].permission = false;
        operations.atNumber = false;
    }
}

const btnList = Array.from(document.querySelectorAll('.btn:not(.operator)'));
const operatorList = Array.from(document.querySelectorAll('.operator'));
btnList.forEach(item => {
    item.addEventListener('click', addNumberEvent);
});
operatorList.forEach(item => {
    item.addEventListener('click', addOperatorEvent);
});
// operatorList.forEach(item => {
//     item.addEventListener('click', console.log(item.textContent));
// });





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
