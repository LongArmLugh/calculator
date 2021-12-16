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

// Probably should have made a universal permissions function with all the checks 
// to be called by each operation instead of managing it in each onbject in the list
// going to each is tedious and confusing

const operations = {
    // >Requires model obj and view obj
    // Flags
    // hasLeadZero: true;
    isExpression: false,
    atNumber: false,
    hasOperator: false,
    hasPeriod: false,
    leadingZero: false,
    atTotal: false,
    operators: [
        // List should probably be made programatically
        {
            type: '+',
            permission: false,
            setPermission: function() {
                if(operations.atNumber === true) {
                    this.permission = true;
                }
            },
            use: function() {
                operations.hasPeriod = false;
                operations.isExpression = false;
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
                operations.hasPeriod = false;
                operations.isExpression = false;
                console.log('- used');
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
                operations.hasPeriod = false;
                operations.isExpression = false;
                console.log('x used');
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
                operations.hasPeriod = false;
                operations.isExpression = false;
                console.log('/ used');
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
                if (operations.isExpression === true) {
                    this.permission = true;
                }
            },
            use: function() {
                operations.hasPeriod = false;
                operations.isExpression = false;
                console.log('= used');
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
                if (operations.hasPeriod === true) {
                    this.permission = false;
                }
            },
            use: function() {
                operations.atNumber = true;
                operations.hasPeriod = true;
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            // Future feature
            type: '%',
            permission: false,
            setPermission: function() {
                if(operations.atNumber === true) {
                    // this.permission = true;
                }
            },
            use: function() {
                operations.hasPeriod = false;
                operations.isExpression = false;
                console.log('+ used');
            },
            addInput: function(btn) {
                model.inputs.push(btn);
                view.update(model.inputs.join(''));
            }
        },
        {
            // Future feature
            type: "#",
            permission: false,
            setPermission: function() {
                if(operations.atNumber === true) {
                    // this.permission = true;
                }
            },
            use: function() {
                operations.hasPeriod = false;
                operations.isExpression = false;
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
        // this.hasLeadZero = true;
        this.isExpression = false;
        this.atNumber = false;
        this.hasOperator = false;
        this.hasPeriod = false;
        // this.leadingZero = false;
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

const numberEventFlags = {
    hasLeadZero: false,
}
// >addNumberEvent
//check atNumber istead
// make period trigger atNumber
const addNumberEvent = function() {
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
        if (operations.operators[index].type !== '.' ) {
            operations.atNumber = false;
        }
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




