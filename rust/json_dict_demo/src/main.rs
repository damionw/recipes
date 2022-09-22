// See:
// https://docs.rs/json/0.12.4/json
use json;

fn main() {
    let obj = json::object!{
        name: "Freddy"
    };

    println!("Object name: {}", obj["name"]);
}
