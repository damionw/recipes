use crate::my_module::my_module::MyClass;
mod my_module;

fn main() {
    let myobj = MyClass::new(2, "one");

    myobj.show();
}
