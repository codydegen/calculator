const numbers = document.querySelectorAll('button');
numbers.forEach(number => number.addEventListener('click', buttonEvent));

const operators = document.querySelectorAll('.operator');
numbers.forEach(number => number.addEventListener('click', operatorEvent));

window.addEventListener('keydown', onPress);

function onPress(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    console.log(e);
    console.dir(key);
    console.log(key.innerText);
    const num = key.innerText;
    //if key.innerText === null return;
    return key.innerText;
}

function buttonEvent(e) {
    const num = e.target.innerText;
    console.dir(e.target.innerText);
    console.log(e.target.id);
    //alert("You clicked a number");
};

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
