// See:
//   https://pola-rs.github.io/polars/polars/docs/eager/index.html#creation-of-data-structures

use polars::prelude::*;
use polars::df;

fn main() {
    // use macro
    let mydf = df! [
        "names" => ["a", "b", "c"],
        "values" => [1, 2, 3],
        "values_nulls" => [Some(1), None, Some(3)]
    ]?;

    // from a Vec<Series>
    // let s1 = Series::new("names", &["a", "b", "c"]);
    // let s2 = Series::new("values", &[Some(1), None, Some(3)]);
    // let df = DataFrame::new(vec![s1, s2])?;

    println!("Count: {}", mydf.length());
}
