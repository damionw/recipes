use json;

fn main() {
    let obj = json::object!{
        name: "Freddy"
    };

    println!("Object name: {}", obj["name"]);
}
