/*
Boolean operators
Data types for operands of boolean operators, Boolean values (Truthy and Falsy values)
Operator precedence rules
Operator associativity rules
Operand evaluation order
Short-circuit evaluation

*/

// 1- Boolean operators
if (true && !false && (true || false)) {
  console.log("It goes into if statement");
}

// 2- Data types for operands of boolean operators, Boolean values

const testTrue = true;
const testFalse = false;

function returnTrue() {
  return true;
}

function returnFalse() {
  return false;
}

const nonemptyStringObject = "test";
const emptyStringObject = "";

const zeroInteger = 0;
const nonzeroInteger = 1;

const nullObject = null;
const undefinedObject = undefined;

const complexObject = {
  a: 12,
};

if (nonemptyStringObject) {
  console.log("inside if statement - nonemptyStringObject");
} else {
  console.log("Falsy: nonemptyStringObject");
}

if (emptyStringObject) {
  console.log("Truthy: emptyStringObject");
} else {
  console.log("Falsy: emptyStringObject");
}

if (nonzeroInteger) {
  console.log("Truthy: nonzeroInteger");
} else {
  console.log("Falsy: nonzeroInteger");
}

if (zeroInteger) {
  console.log("Truthy: zeroInteger");
} else {
  console.log("Falsy: zeroInteger");
}

if (nullObject) {
  console.log("Truthy: nullObject");
} else {
  console.log("Falsy: nullObject");
}

if (returnTrue()) {
  console.log("Truthy: returnTrue()");
} else {
  console.log("Falsy: returnTrue()");
}

if (returnFalse()) {
  console.log("Truthy: returnFalse()");
} else {
  console.log("Falsy: returnFalse()");
}

if (returnFalse) {
  console.log("Truthy: returnFalse");
} else {
  console.log("Falsy: returnFalse");
}

// 3- operator precedence rules
// 4- operator associativity rules

if (false || false && true) {
    console.log("if printed: means || higher precedence");
    orHigherPrecedence = true;
} else {
    console.log("else printed: means && higher precendence");
}

if (true || false || false) {
    console.log("if printed: means || is left associative");
    andHigherPrecedence = true;
} else {
    console.log("else printed: means || is right associative");
}

if (true && !false) {
    console.log("! has higher precedence that both && and ||. It is prefix operator so it is left associative")
}

// 5- Operand evaluation order

const expo1 = 2 ** 4 ** 2;
const expo3 = 2 ** (4 ** 2);
const expo2 = (2 ** 4) ** 2;
console.log(expo1); // 65536
console.log(expo2); // 256
console.log(expo3); // 65536
console.log("expo1 and expo3 have same value means ** is right associative. when grouping left numbers, value changes means also () has higher precedence than **");

const multOperators1 = 5 * 6 / 3;
const multOperators2 = 6 / 3 * 5;
const multOperators3 = 6 / 12 % 4 * 5;
console.log(multOperators1); // 10
console.log(multOperators2); // 10
console.log(multOperators3); // 2.5
console.log("both multOperators1 and multOperators2 have same value and multOperators3 has 2.5. And by looking operations, in all operations the left operator is calculated first means same precedence and left associative");

const additive = 5 + 2 * 10;
console.log(additive); // 25
console.log("* calculated before + means multiplication operation has higher precedence than addition operation");

let assignmentOperator = 6;
assignmentOperator += 2 * 5;
console.log(assignmentOperator); // 16
console.log("+= means x + calculated before * means += has higher precedence than *");

const relational = 12 > 5 && 8 <= 8 || 5 >= 2;
console.log(relational); // true
console.log("> <= means relational operations have higher precedence than && ||");

// 6- Short-circuit evaluation
function getA() { 
    console.log('called A');
    return true; 
}
function getB() { 
    console.log('called B');
    return false; 
}
function getC() { 
    console.log('called C');
    return false; 
}

console.log(getA() || getB() && getC()); // true
console.log("Event though && has higher precedence than ||, when left side is true of ||, there is no need to run the right side")