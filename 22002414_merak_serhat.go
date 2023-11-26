package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println("deneme")

	// 1- Boolean operators
	if true && !false && (true || false) {
		fmt.Println("It goes into if statement")
	}

	if returnTrue() {
		fmt.Println("Truthy: returnTrue()")
	} else {
		fmt.Println("Falsy: returnTrue()")
	}

	if returnFalse() {
		fmt.Println("Truthy: returnFalse()")
	} else {
		fmt.Println("Falsy: returnFalse()")
	}
	
	/*
	    var nonemptyStringObject = "test"
		var emptyStringObject = ""
		var zeroInteger = 0
		var nonzeroInteger = 1
		var nullObject interface{} = nil
		var undefinedObject interface{} // Go does not have an undefined value, using nil for demonstration
	    complexObject := map[string]int{
		    "a": 12,
	    }
	*/

	// if nonemptyStringObject {
	// }

	// if emptyStringObject {
	// }

	// if nonzeroInteger {
	// }

	// if zeroInteger {
	// }

	// if nullObject {
	// }

	// if returnFalse {
	// }
	fmt.Println("When trying to use above types in if statement, it gives an error because Go does not accept these values for boolean")
	fmt.Println("Error: non-bool used as if condition")

	// 3- operator precedence rules
	// 4- operator associativity rules

	if false || false && true {
		fmt.Println("if printed: means || higher precedence")
	} else {
		fmt.Println("else printed: means && higher precedence")
	}

	if true || false || false {
		fmt.Println("if printed: means || left associative")
	} else {
		fmt.Println("else printed: means || is right associative")
	}

	if true && !false {
		fmt.Println("! has higher precedence that both && and ||. It is prefix operator so it is left associative")
	}

	expo := math.Pow(2, math.Pow(4, 2))
	fmt.Println(expo) // 65536
	fmt.Println("In Go, expo is calculated using math.Pow(a, b), therefore we can not talk about its precedence")

	multOperators1 := 5 * 6 / 3
	multOperators2 := 6 / 3 * 5
	multOperators3 := 12 / 2 % 4 * 5
	fmt.Println(multOperators1) // 10
	fmt.Println(multOperators2) // 10
	fmt.Println(multOperators3) // 10
	fmt.Println("All operations above have the same value which is 10. And by looking at operations, in all operations, the left operator is calculated first means the same precedence and left associative")

	additive := 5 + 2*10
	fmt.Println(additive) // 25
	fmt.Println("* calculated before + means multiplication operation has higher precedence than addition operation")

	assignmentOperator := 6
	assignmentOperator += 2 * 5
	fmt.Println(assignmentOperator) // 16
	fmt.Println("+= means x + calculated before * means += has higher precedence than *")

	relational := 12 > 5 && 8 <= 8 || 5 >= 2
	fmt.Println(relational) // true
	fmt.Println("> <= means relational operations have higher precedence than && ||")

	fmt.Println(getA() || getB() && getC()) // true
	fmt.Println("Event though && has higher precedence than ||, when left side is true of ||, there is no need to run the right side")
}

func returnTrue() bool {
	return true
}

func returnFalse() bool {
	return false
}

func getA() bool {
	fmt.Println("Called A")
	return true
}

func getB() bool {
	fmt.Println("Called B")
	return false
}

func getC() bool {
	fmt.Println("Called C")
	return false
}
