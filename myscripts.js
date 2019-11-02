'use strict';

// Using global variables for this.  In a future version I would fix this.  As this 
// is just a variable associated with the display, similar behavior could be achieved by reading 
// from the display.  Not sure the performance impacts of that, though.
var mainDisplay = "0";
var secondaryDisplay = "0";
let shiftDown = false;
const buttons = document.querySelectorAll('button');
buttons.forEach((button, mainDisplay) => button.addEventListener('click', buttonEvent));

window.addEventListener('keydown', onPress);
window.addEventListener('keyup', checkShift);//Need for checking for shift

function onPress(e) {//This and buttonEvent are used to pipe in the necessary data to the analysis function.
    let keyPass=keyLookup(e.keyCode);
    if (keyPass === undefined) return;
    processEvent(keyPass);
}

function buttonEvent(e) {
    processEvent(e.target.innerText);
};

function processEvent(value) {//This is the main functiion where everything important happens.
    const md = document.querySelector('#mainDisplay');
    const sd = document.querySelector('#secondaryDisplay');

    // I found it easier to manipulate the information if it was split into different array items.
    // However, it was still useful to have everything in one string to make backspace easier to use.
    let operatorArray = mainDisplay.split(" ");
    // When adding an operator to the string, a trailing space was added.  This was causing an extra item to be added to the array.
    if (operatorArray[operatorArray.length-1] === "") operatorArray.splice(operatorArray.length-1,1);
    let lastMd = operatorArray[operatorArray.length-1] 

    // Loop to run through the various inputs that couuld be made.  Could be re-factored at a later date.
    if (value === "AC" ) {
        mainDisplay="0";
        md.classList.add("newNumber");
        secondaryDisplay = "";
        sd.innerText = secondaryDisplay;
    }else if (value === "BS") {
        if (mainDisplay.length === 1 || md.classList.contains("newNumber")) {
            mainDisplay="0";
        } else {
            if (lastMd === " ") mainDisplay=mainDisplay.slice(0, -1);
            mainDisplay=mainDisplay.slice(0, -1);
        }
    }else if (!isNaN(value)){
        if (mainDisplay === "0"  || md.classList.contains("newNumber")) {
            md.classList.remove("newNumber");
            mainDisplay = value;
        }else { 
            mainDisplay+=value;
        }
    }else if (value === ".") {
        if (!operatorArray[operatorArray.length-1].includes(".")) {
            mainDisplay+=value;
            md.classList.remove("newNumber");
        }
    }else if (value !== "=" && !isNaN(lastMd)){
        mainDisplay = mainDisplay+ " " + value + " ";
        md.classList.remove("newNumber");
    } else if (value === "=") {
            md.classList.add("newNumber");
            operate();
    }

    md.innerText = mainDisplay;
    

}

function add(a, b) {
    return Number(a)+Number(b);
};

function subtract(a, b) {
    return Number(a)-Number(b);
};

function multiply(a, b) {
    return Number(a)*Number(b);
};

function divide(a, b) {
    return round(Number(a)/Number(b),4);
};

function operate() {
    const md = document.querySelector('#mainDisplay');
    const sd = document.querySelector('#secondaryDisplay');
    sd.innerText = mainDisplay;
    let operatorArray = mainDisplay.split(" ");

    // If the user has a trailing operator, this strips that
    if (operatorArray.length%2 === 0){
        //console.log("remove trailing operator");
        operatorArray.splice(operatorArray.length-1,1);
    }

    stringOperate(operatorArray, multiply);
    stringOperate(operatorArray, divide);
    stringOperate(operatorArray, add);
    stringOperate(operatorArray, subtract);

    // To account for large numbers, in a future version I'd go back and make this a little bit more logical- it's pretty arbitrary.
    if (operatorArray[0] > 10e8 || operatorArray[0] < -10e8) {
        operatorArray[0] = Number(operatorArray[0]).toExponential(8);
    }
    mainDisplay = ""+operatorArray[0]; //Make sure that this casts to string
    md.innerText = mainDisplay;
    if (operatorArray[0] === "Divide By Zero Error") {
        sd.innerText = "";
    } else {
        sd.innerText = sd.innerText + " = " + operatorArray[0];
    }

};


function stringOperate(operatorArray, callback) {
    let i = 1;
    let operator = "";
    switch (callback) {
        case multiply:
            operator = "*";
            break;
        case divide:
            operator = "/";
            break;
        case add:
            operator = "+";
            break;
        case subtract:
            operator = "-";
            break;
    }
    // Indexes added to make sure that this doesn't get caught in an endless loop
    while(operatorArray.includes(operator) && i<1000) {

        if(operatorArray[i] === operator){
            operatorArray.splice(i-1,3,callback(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }

};

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function keyLookup(key) {
    if (key <= 57 && key >= 48 && !shiftDown) {
        return (key - 48)+"";
    }
    else {
        switch (key) {
            case 16:
                shiftDown = true;
                break;
            case 56:
                return "*";
            case 189:
                return "-";
            case 187:  
            case 13:
                return shiftDown ? "+" : "=";
            case 191:
                return "/";
            case 190:
                return ".";
            case 8:
                return "BS";
            case 27:
                return "AC";
        }
    }
    
};

function checkShift(e) {
    if (e.keyCode === 16) {
        shiftDown = false;
    }
};