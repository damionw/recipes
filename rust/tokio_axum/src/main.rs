//See: https://github.com/tokio-rs/axum

use axum::{
    response::Html,
    response::Json,
    routing::get,
    Router
};

use std::net::SocketAddr;
use serde::{Deserialize, Serialize};
// use serde_json::json;
// use std::error::Error;

#[derive(Debug)]
enum Err {
}

#[derive(Debug, Serialize, Deserialize)]
struct MyStruct {
    myvalue: usize
}

impl MyStruct {
    fn new() -> Self {
        Self {
            myvalue: 99
        }
    }
}

#[tokio::main]
async fn main() {
    // build our application with a route
    let app = Router::new()
        .route("/", get(handler))
        .route("/api/", get(api_handler))
    ;

    // run it
    let addr = SocketAddr::from(([127, 0, 0, 1], 3002));

    println!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> Html<&'static str> {
    Html("<h1>Hello, World!</h1>")
}

async fn api_handler() -> Json<MyStruct> {
    Json(MyStruct::new())
}
