# 1- Boolean operators
if true && !false && (true || false)
    puts "It goes into if statement"
  end
  
  # 2- Data types for operands of boolean operators, Boolean values
  
  test_true = true
  test_false = false
  
  def return_true
    true
  end
  
  def return_false
    false
  end
  
  nonempty_string_object = "test"
  empty_string_object = ""
  
  zero_integer = 0
  nonzero_integer = 1
  
  null_object = nil
  undefined_object = nil  # Ruby does not have an undefined value, using nil for demonstration
  
  complex_object = {
    a: 12
  }
  
  if nonempty_string_object
    puts "Truthy: nonempty_string_object"
  else
    puts "Falsy: nonempty_string_object"
  end
  
  if empty_string_object
    puts "Truthy: empty_string_object"
  else
    puts "Falsy: empty_string_object"
  end
  
  if nonzero_integer
    puts "Truthy: nonzero_integer"
  else
    puts "Falsy: nonzero_integer"
  end
  
  if zero_integer
    puts "Truthy: zero_integer"
  else
    puts "Falsy: zero_integer"
  end
  
  if null_object
    puts "Truthy: null_object"
  else
    puts "Falsy: null_object"
  end
  
  if return_true
    puts "Truthy: return_true()"
  else
    puts "Falsy: return_true()"
  end
  
  if return_false
    puts "Truthy: return_false()"
  else
    puts "Falsy: return_false()"
  end
  
  if return_false
    puts "Truthy: return_false"
  else
    puts "Falsy: return_false"
  end
  
  # 3- operator precedence rules
  # 4- operator associativity rules
  
  or_higher_precedence = false
  and_higher_precedence = false
  
  if false || false && true
    puts "If printed: means || higher precedence"
    or_higher_precedence = true
  else
    puts "Else printed: means && higher precedence"
  end
  
  if true || false || false
    puts "If printed: means || is left associative"
    and_higher_precedence = true
  else
    puts "Else printed: means || is right associative"
  end
  
  if true && !false
    puts "! has higher precedence than both && and ||. It is a prefix operator, so it is left associative"
  end
  
  # 5- Operand evaluation order
  
  expo1 = 2 ** 4 ** 2
  expo3 = 2 ** (4 ** 2)
  expo2 = (2 ** 4) ** 2
  puts expo1  # 65536
  puts expo2  # 256
  puts expo3  # 65536
  puts "expo1 and expo3 have the same value means ** is right associative. When grouping left numbers, the value changes, means also () has higher precedence than **"
  
  mult_operators1 = 5 * 6 / 3
  mult_operators2 = 6 / 3 * 5
  mult_operators3 = 12 / 2 % 4 * 5
  puts mult_operators1  # 10
  puts mult_operators2  # 10
  puts mult_operators3  # 10
  puts "All operations above have the same value which is 10. And by looking at operations, in all operations, the left operator is calculated first means the same precedence and left associative"
  
  additive = 5 + 2 * 10
  puts additive  # 25
  puts "* calculated before + means multiplication operation has higher precedence than addition operation"
  
  assignment_operator = 6
  assignment_operator += 2 * 5
  puts assignment_operator  # 16
  puts "+= means x + calculated before * means += has higher precedence than *"
  
  relational = 12 > 5 && 8 <= 8 || 5 >= 2
  puts relational  # true
  puts "> <= means relational operations have higher precedence than && ||"
  
  # 6- Short-circuit evaluation
  
  def get_a
    puts 'called A'
    true
  end
  
  def get_b
    puts 'called B'
    false
  end
  
  def get_c
    puts 'called C'
    false
  end
  
  puts get_a || get_b && get_c  # true
  puts "Even though && has higher precedence than ||, when the left side is true of ||, there is no need to run the right side"
  