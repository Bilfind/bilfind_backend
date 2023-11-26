import 'dart:math';

void main() {
    print("deneme");
    // 1- Boolean operators
    if (true && !false && (true || false)) {
        print("It goes into if statement");
    }

    var testTrue = true;
    var testFalse = false;

    var nonemptyStringObject = "test";
    var emptyStringObject = "";
    var zeroInteger = 0;
    var nonzeroInteger = 1;
    var nullObject = null;
    int? undefinedObject;

    var complexObject = {
      "a": 12,
    };

    if (returnTrue()) {
      print("Truthy: returnTrue()");
    } else {
      print("Falsy: returnTrue()");
    }   

    if (returnFalse()) {
      print("Truthy: returnFalse()");
    } else {
      print("Falsy: returnFalse()");
    }

    // if (nonemptyStringObject) {
    // } 

    // if (emptyStringObject) {
    // } 

    // if (nonzeroInteger) {
    // } 

    // if (zeroInteger) {
    // } 

    // if (nullObject) {
    // }

    // if (returnFalse) {
    // } 
    print("When trying to use above types in if statement, it gives error because dart does not accept these values for boolean");
    print("Error: A value of type 'String' can't be assigned to a variable of type 'bool'.");
    print("statically written");

    // 3- operator precedence rules
    // 4- operator associativity rules

    if (false || false && true) {
        print("if printed: means || higher precedence");
    } else {
        print("else printed: means && higher precendence");
    }

    if (true || false || false) {
        print("if printed: means || left associative");
    } else {
        print("else printed: means || is right associative");
    }

    if (true && !false) {
        print("! has higher precedence that both && and ||. It is prefix operator so it is left associative");
    }


    num expo = pow(2, pow(4, 2));
    print(expo); // 65536
    print("in dart, expo is defined with function pow(a, b) therefore we can not talk about its precedence");

    var multOperators1 = 5 * 6 / 3;
    var multOperators2 = 6 / 3 * 5;
    var multOperators3 = 6 / 12 % 4 * 5;
    print(multOperators1); // 10
    print(multOperators2); // 10
    print(multOperators3); // 2.5
    print("both multOperators1 and multOperators2 have same value and multOperators3 has 2.5. And by looking operations, in all operations the left operator is calculated first means same precedence and left associative");

    var additive = 5 + 2 * 10;
    print(additive); // 25
    print("* calculated before + means multiplication operation has higher precedence than addition operation");

    var assignmentOperator = 6;
    assignmentOperator += 2 * 5;
    print(assignmentOperator); // 16
    print("+= means x + calculated before * means += has higher precedence than *");

    var relational = 12 > 5 && 8 <= 8 || 5 >= 2;
    print(relational); // true
    print("> <= means relational operations have higher precedence than && ||");

    print(getA() || getB() && getC()); // true
    print("Event though && has higher precedence than ||, when left side is true of ||, there is no need to run the right side");
}   

bool returnTrue() {
    return true;
}

bool returnFalse() {
    return false;
}

bool getA() { 
    print('called A');
    return true; 
}
bool getB() { 
    print('called B');
    return false; 
}
bool getC() { 
    print('called C');
    return false; 
}