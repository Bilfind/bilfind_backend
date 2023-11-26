-- 1- Boolean operators
if true and not false and (true or false) then
    print("It goes into if statement")
end

-- 2- Data types for operands of boolean operators, Boolean values

testTrue = true
testFalse = false

function returnTrue()
    return true
end

function returnFalse()
    return false
end

nonemptyStringObject = "test"
emptyStringObject = ""

zeroInteger = 0
nonzeroInteger = 1

nullObject = nil
undefinedObject = nil  -- Lua does not have an undefined value, using nil for demonstration

complexObject = {
    a = 12
}

if nonemptyStringObject then
    print("inside if statement - nonemptyStringObject")
else
    print("Falsy: nonemptyStringObject")
end

if emptyStringObject then
    print("Truthy: emptyStringObject")
else
    print("Falsy: emptyStringObject")
end

if nonzeroInteger then
    print("Truthy: nonzeroInteger")
else
    print("Falsy: nonzeroInteger")
end

if zeroInteger then
    print("Truthy: zeroInteger")
else
    print("Falsy: zeroInteger")
end

if nullObject then
    print("Truthy: nullObject")
else
    print("Falsy: nullObject")
end

if returnTrue() then
    print("Truthy: returnTrue()")
else
    print("Falsy: returnTrue()")
end

if returnFalse() then
    print("Truthy: returnFalse()")
else
    print("Falsy: returnFalse()")
end

if returnFalse then
    print("Truthy: returnFalse")
else
    print("Falsy: returnFalse")
end

-- 3- operator precedence rules
-- 4- operator associativity rules

orHigherPrecedence = false
andHigherPrecedence = false

if false or false and true then
    print("If printed: means || higher precedence")
    orHigherPrecedence = true
else
    print("Else printed: means && higher precedence")
end

if true or false or false then
    print("If printed: means || is left associative")
    andHigherPrecedence = true
else
    print("Else printed: means || is right associative")
end

if true and not false then
    print("! has higher precedence than both && and ||. It is a prefix operator, so it is left associative")
end

-- 5- Operand evaluation order

expo1 = 2 ^ 4 ^ 2
expo3 = 2 ^ (4 ^ 2)
expo2 = (2 ^ 4) ^ 2
print(expo1)  -- 65536
print(expo2)  -- 256
print(expo3)  -- 65536
print("expo1 and expo3 have the same value means ^ is right associative. When grouping left numbers, the value changes, means also () has higher precedence than ^")

multOperators1 = 5 * 6 / 3
multOperators2 = 6 / 3 * 5
multOperators3 = 6 / 12 % 4 * 5
print(multOperators1)  -- 10
print(multOperators2)  -- 10
print(multOperators3)  -- 2.5
print("both multOperators1 and multOperators2 have the same value, and multOperators3 has 2.5. And by looking at operations, in all operations, the left operator is calculated first means the same precedence and left associative")

additive = 5 + 2 * 10
print(additive)  -- 25
print("* calculated before + means multiplication operation has higher precedence than addition operation")

assignmentOperator = 6
assignmentOperator = assignmentOperator + 2 * 5
print(assignmentOperator)  -- 16
print("+= means x + calculated before * means += has higher precedence than *")

relational = 12 > 5 and 8 <= 8 or 5 >= 2
print(relational)  -- true
print("> <= means relational operations have higher precedence than && ||")

-- 6- Short-circuit evaluation

function getA()
    print('called A')
    return true
end

function getB()
    print('called B')
    return false
end

function getC()
    print('called C')
    return false
end

print(getA() or getB() and getC())  -- true
print("Even though && has higher precedence than ||, when the left side is true of ||, there is no need to run the right side")
