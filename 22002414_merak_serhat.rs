use std::f64::consts::PI;

fn main() {
    println!("deneme");

    // 1- Boolean operators
    if true && !false && (true || false) {
        println!("It goes into if statement");
    }

    let test_true = true;
    let test_false = false;

    let nonempty_string_object = "test";
    let empty_string_object = "";
    let zero_integer = 0;
    let nonzero_integer = 1;
    let null_object: Option<bool> = None;
    let undefined_object: Option<i32> = None;

    let complex_object = [("a", 12)];

    if return_true() {
        println!("Truthy: return_true()");
    } else {
        println!("Falsy: return_true()");
    }

    if return_false() {
        println!("Truthy: return_false()");
    } else {
        println!("Falsy: return_false()");
    }

    // Commented out because Rust does not allow using non-boolean types in if conditions
    // if nonempty_string_object {
    // }

    // if empty_string_object {
    // }

    // if nonzero_integer {
    // }

    // if zero_integer {
    // }

    // if null_object {
    // }

    // if return_false {
    // }

    println!("When trying to use the above types in if statements, it gives an error because Rust does not accept these values for boolean");
    println!("Error: mismatched types");

    // 3- operator precedence rules
    // 4- operator associativity rules

    if false || false && true {
        println!("if printed: means || higher precedence");
    } else {
        println!("else printed: means && higher precedence");
    }

    if true || false || false {
        println!("if printed: means || left associative");
    } else {
        println!("else printed: means || right associative");
    }

    if true && !false {
        println!("! has higher precedence than both && and ||. It is a prefix operator, so it is left associative");
    }

    // 5- Operand evaluation order

    let expo1 = 2_u32.pow(4_u32.pow(2));
    let expo2 = (2_u32.pow(4)).pow(2);
    let expo3 = 2_u32.pow(4_u32.pow(2));
    println!("{}", expo1); // 65536
    println!("{}", expo2); // 256
    println!("{}", expo3); // 65536
    println!("expo1 and expo3 have the same value means pow is right associative. When grouping left numbers, the value changes means also () has higher precedence than pow");

    let mult_operators1 = 5 * 6 / 3;
    let mult_operators2 = 6 / 3 * 5;
	let mult_operators3 = 12 / 2 % 4 * 5;
    println!("{}", mult_operators1); // 10
    println!("{}", mult_operators2); // 10
    println!("{}", mult_operators3); // 10
    println!("All operations above have the same value which is 10. And by looking at operations, in all operations, the left operator is calculated first means the same precedence and left associative");

    let additive = 5 + 2 * 10;
    println!("{}", additive); // 25
    println!("* calculated before + means multiplication operation has higher precedence than addition operation");

    let mut assignment_operator = 6;
    assignment_operator += 2 * 5;
    println!("{}", assignment_operator); // 16
    println!("+= means x + calculated before * means += has higher precedence than *");

    let relational = 12 > 5 && 8 <= 8 || 5 >= 2;
    println!("{}", relational); // true
    println!("> <= means relational operations have higher precedence than && ||");

    // 6- Short-circuit evaluation

    fn get_a() -> bool {
        println!("called A");
        true
    }

    fn get_b() -> bool {
        println!("called B");
        false
    }

    fn get_c() -> bool {
        println!("called C");
        false
    }

    println!("{}", get_a() || get_b() && get_c()); // true
    println!("Even though && has higher precedence than ||, when the left side is true of ||, there is no need to run the right side");
}

fn return_true() -> bool {
    true
}

fn return_false() -> bool {
    false
}
