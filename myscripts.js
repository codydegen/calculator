var mainDisplay = "0";
var secondaryDisplay = "0";

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
    let operatorArray = mainDisplay.split(" ");
    //md.innerText = mainDisplay
    // mainDisplay +=e.target.innerText;
    // console.log(mainDisplay);
    if (value === "AC" ) {
        mainDisplay="0";
    }else if (value === "BS") {
        if (mainDisplay.length === 1) {
            mainDisplay="0";
        }else{
            if (lastMd === " ") mainDisplay=mainDisplay.slice(0, -1);
            mainDisplay=mainDisplay.slice(0, -1);
        }
    }else if (!isNaN(value)){
        if (mainDisplay === "0" ) {
            mainDisplay = value;
        }else { 
            mainDisplay+=value;
        }
    }else if (value === ".") {
        if (!operatorArray[operatorArray.length-1].includes(".")) {
            mainDisplay+=value;
        }
    }else if (value !== "=" && !isNaN(lastMd)){
        mainDisplay = mainDisplay+ " " + value + " ";
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
    const md = document.querySelector('#mainDisplay');
    const sd = document.querySelector('#secondaryDisplay');
    sd.innerText = mainDisplay;
    let operatorArray = mainDisplay.split(" ");
    let total = 0;
    let subtotal = 0;
    let i = 0;
    let left = 0;
    let right = 0;

    if (operatorArray.length%2 === 0){
        console.log("remove trailing operator");
        operatorArray.splice(operatorArray.length-1,1);
    }
    i = 1;
    while(operatorArray.includes("*")) {

        if(operatorArray[i] === "*"){
            operatorArray.splice(i-1,3,multiply(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }

    i = 1;
    while(operatorArray.includes("/")) {

        if(operatorArray[i] === "/"){
            operatorArray.splice(i-1,3,divide(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }

    i = 1;
    while(operatorArray.includes("-")) {

        if(operatorArray[i] === "-"){
            operatorArray.splice(i-1,3,subtract(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }

    i = 1;
    while(operatorArray.includes("+")) {

        if(operatorArray[i] === "+"){
            operatorArray.splice(i-1,3,add(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }
    mainDisplay = ""+operatorArray[0];
    md.innerText = mainDisplay;
    sd.innerText = sd.innerText + " = " + operatorArray[0];

    // if (operator === "add") {
    //     return add(a,b);
    // }else if (operator === "subtract"){
    //     return subtract(a,b);
    // }else if (operator === "multiply"){
    //     return multiply(a,b);
    // }else if (operator === "divide"){
    //     return divide(a,b);
    // }else {
    //     alert("invalid operator");        
    // }
};
