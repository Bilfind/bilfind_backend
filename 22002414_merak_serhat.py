# 1- Boolean operators
if True and not False and (True or False):
    print("It goes into if statement")

# 2- Data types for operands of boolean operators, Boolean values

testTrue = True
testFalse = False

def returnTrue():
    return True

def returnFalse():
    return False

nonemptyStringObject = "test"
emptyStringObject = ""

zeroInteger = 0
nonzeroInteger = 1

nullObject = None
undefinedObject = None  # Python does not have an undefined value, using None for demonstration

complexObject = {
  "a": 12,
}

if nonemptyStringObject:
    print("Truthy: nonemptyStringObject")
else:
    print("Falsy: nonemptyStringObject")

if emptyStringObject:
    print("Truthy: emptyStringObject")
else:
    print("Falsy: emptyStringObject")

if nonzeroInteger:
    print("Truthy: nonzeroInteger")
else:
    print("Falsy: nonzeroInteger")

if zeroInteger:
    print("Truthy: zeroInteger")
else:
    print("Falsy: zeroInteger")

if nullObject:
    print("Truthy: nullObject")
else:
    print("Falsy: nullObject")

if returnTrue():
    print("Truthy: returnTrue()")
else:
    print("Falsy: returnTrue()")

if returnFalse():
    print("Truthy: returnFalse()")
else:
    print("Falsy: returnFalse()")

if returnFalse:
    print("Truthy: returnFalse")
else:
    print("Falsy: returnFalse")

# 3- operator precedence rules
# 4- operator associativity rules

orHigherPrecedence = False
andHigherPrecedence = False

if False or False and True:
    print("If printed: means || higher precedence")
    orHigherPrecedence = True
else:
    print("Else printed: means && higher precedence")

if True or False or False:
    print("If printed: means || is left associative")
    andHigherPrecedence = True
else:
    print("Else printed: means || is right associative")

if True and not False:
    print("! has higher precedence than both && and ||. It is prefix operator so it is left associative")

# 5- Operand evaluation order

expo1 = 2 ** 4 ** 2
expo3 = 2 ** (4 ** 2)
expo2 = (2 ** 4) ** 2
print(expo1)  # 65536
print(expo2)  # 256
print(expo3)  # 65536
print("expo1 and expo3 have same value means ** is right associative. when grouping left numbers, value changes means also () has higher precedence than **")

multOperators1 = 5 * 6 / 3
multOperators2 = 6 / 3 * 5
multOperators3 = 6 / 12 % 4 * 5
print(multOperators1)  # 10
print(multOperators2)  # 10
print(multOperators3)  # 2.5
print("both multOperators1 and multOperators2 have same value and multOperators3 has 2.5. And by looking operations, in all operations the left operator is calculated first means same precedence and left associative")

additive = 5 + 2 * 10
print(additive)  # 25
print("* calculated before + means multiplication operation has higher precedence than addition operation")

assignmentOperator = 6
assignmentOperator += 2 * 5
print(assignmentOperator)  # 16
print("+= means x + calculated before * means += has higher precedence than *")

relational = 12 > 5 and 8 <= 8 or 5 >= 2
print(relational)  # True
print("> <= means relational operations have higher precedence than && ||")

# 6- Short-circuit evaluation

def getA():
    print('called A')
    return True

def getB():
    print('called B')
    return False

def getC():
    print('called C')
    return False

print(getA() or getB() and getC())  # True
print("Even though && has higher precedence than ||, when the left side is true of ||, there is no need to run the right side")
