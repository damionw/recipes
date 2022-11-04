// See: https://github.com/clap-rs/clap#quick-example

use clap::{Arg, App};

fn main() {
// Both methods work: See https://programming-idioms.org/idiom/105/current-executable-name/1887/rust
//
//     let object_file = std::env::current_exe()
//         .ok()
//         .and_then(|pb| pb.file_name().map(|s| s.to_os_string()))
//         .and_then(|s| s.into_string().ok())
//         .unwrap();

    let object_file = std::env::current_exe()
        .expect("Can't get the executable's path")
        .file_name()
        .expect("Can't get the executable's filename")
        .to_string_lossy()
        .into_owned();

    let options = App::new(object_file.to_owned())
        .version("0.0.1")
        .about("This is a structopt/Clap demonstration")
        .arg(
            Arg::with_name("input")
                .long("input")
                .short("i")
                .help("Provide input file")
                .required(false)
                .default_value("-")
        )
        .get_matches();

    println!("{}: input={}", object_file, options.value_of("input").unwrap());
}
