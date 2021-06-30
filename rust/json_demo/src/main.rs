use serde_json::{Result, Value};
use  std::fs::read_to_string;

fn fetch() -> Value {
    let contents = read_to_string("demo.json").expect("Can't read JSON data");
    let v: Value = serde_json::from_str(contents.as_str()).expect("Invalid JSON");
    v
}

fn main() {
    let json = fetch();
    for (name, value) in json.as_object().unwrap().iter() {
        println!("{}", name);
    }
}
