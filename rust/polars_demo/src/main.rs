use polars::prelude::*;

fn schema() -> Schema {
    Schema::new(
        vec![
            Field::new("One", DataType::Utf8),
            Field::new("Two", DataType::Float64),
        ]
    )
}

fn fetch(path: &str) -> Result<DataFrame> {
    CsvReader::from_path(path)?
        .with_schema(Arc::new(schema()))
        .finish()
}

fn main() -> Result<()> {
    let df = fetch("demo.csv")?;

    println!("Rows = {}", df.height());

    Ok(())
}
