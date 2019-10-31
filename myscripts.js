var mainDisplay = "0";
let secondaryDisplay = "0";

const numbers = document.querySelectorAll('button');
numbers.forEach((number, mainDisplay) => number.addEventListener('click', buttonEvent));

const operators = document.querySelectorAll('.operator');
//numbers.forEach(number => number.addEventListener('click', operatorEvent));

window.addEventListener('keydown', onPress);

function onPress(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    //console.log(e);
    //console.dir(key);
    //console.log(key.innerText);
    //const num = key.innerText;
    //if key.innerText === null return;
    //return key.innerText;
    processEvent(key.innerText);
}

function buttonEvent(e) {
    
    //const num = e.target.innerText;
    //console.dir(e.target.innerText);
    //console.log(e.target.id);
    processEvent(e.target.innerText);


    
    //alert("You clicked a number");
};

function processEvent(value) {
    const md = document.querySelector('#mainDisplay');
    let lastMd = mainDisplay[mainDisplay.length -1];
    //md.innerText = mainDisplay
    // mainDisplay +=e.target.innerText;
    // console.log(mainDisplay);
    if (value === "AC" ) {
        mainDisplay="0";
    }else if (value === "BS") {
        if (mainDisplay.length === 1) {
            mainDisplay="0";
        }else { 
            mainDisplay=mainDisplay.slice(0, -1);
        }
    }else if (!isNaN(value)){
        if (mainDisplay === "0" ) {
            mainDisplay = value;
        }else { 
            mainDisplay+=value;
        }
    }else if (value === ".") {
        if (!mainDisplay.includes(".")) {
            mainDisplay+=value;
        }
    }else if (value !== "=" && !isNaN(lastMd)){
        mainDisplay+=value;
    }else if (value === "=") {
        operate();
    }

    md.innerText = mainDisplay;
}

function add(a, b) {
    return a+b;
};

function subtract(a, b) {
    return a-b;
};

function multiply(a, b) {
    return a*b;
};

function divide(a, b) {
    return a/b;
};

function operate(a, b, operator) {
    if (operator === "add") {
        return add(a,b);
    }else if (operator === "subtract"){
        return subtract(a,b);
    }else if (operator === "multiply"){
        return multiply(a,b);
    }else if (operator === "divide"){
        return divide(a,b);
    }else {
        alert("invalid operator");        
    }
};
