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
    const sd = document.querySelector('#secondaryDisplay');

    let lastMd = mainDisplay[mainDisplay.length -1];
    let operatorArray = mainDisplay.split(" ");
    //md.innerText = mainDisplay
    // mainDisplay +=e.target.innerText;
    // console.log(mainDisplay);
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

    if (operatorArray.length%2 === 0){
        console.log("remove trailing operator");
        operatorArray.splice(operatorArray.length-1,1);
    }

    stringMultiply(operatorArray);
    stringDivide(operatorArray);
    stringAdd(operatorArray);
    stringSubtract(operatorArray);
    if (operatorArray[0] > 10e8 || operatorArray[0] < -10e8) {
        operatorArray[0] = operatorArray[0].toExponential(5);
    }
    mainDisplay = ""+operatorArray[0];
    md.innerText = mainDisplay;
    if (operatorArray[0] === "Divide By Zero Error") {
        sd.innerText = "";
    } else {
        sd.innerText = sd.innerText + " = " + operatorArray[0];
    }

};
function stringMultiply(operatorArray) {
    let i = 1;
    while(operatorArray.includes("*")) {

        if(operatorArray[i] === "*"){
            operatorArray.splice(i-1,3,multiply(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }

};

function stringDivide(operatorArray) {
    let i = 1;
    while(operatorArray.includes("/")) {

        if(operatorArray[i] === "/"){
            if (operatorArray[i+1] === "0") {
                operatorArray.splice(0,operatorArray.length-1,"Divide By Zero Error");
            }
            else {operatorArray.splice(i-1,3,divide(operatorArray[i-1],operatorArray[i+1]))};
        } else { i+=2; }
    }

};

function stringAdd(operatorArray) {
    let i = 1;
    while(operatorArray.includes("+")) {

        if(operatorArray[i] === "+"){
            operatorArray.splice(i-1,3,add(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }

};

function stringSubtract(operatorArray) {
    let i = 1;
    while(operatorArray.includes("-")) {

        if(operatorArray[i] === "-"){
            operatorArray.splice(i-1,3,subtract(operatorArray[i-1],operatorArray[i+1]));
        } else { i+=2; }
    }

};

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }