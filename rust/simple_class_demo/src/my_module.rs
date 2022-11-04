pub mod my_module {
    pub struct MyClass {
        pub name: String,
        pub id: u8,
    }

    impl MyClass {
        pub fn new(id: u8, name: &str) -> MyClass {
            MyClass {
                name: String::from(name),
                id: id,
            }
        }

        pub fn show(&self) {
            println!("Id: {}, Name: {}", self.id, self.name);
        }
    }
}
