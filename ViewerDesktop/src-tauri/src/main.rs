// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use std::env;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[derive(Clone, Serialize, Deserialize)]
struct AppEnv {
    mysql_url: String,
    mysql_port: String,
    mysql_database: String,
    mysql_user: String,
    mysql_password: String,
}

#[tauri::command]
fn get_app_env() -> AppEnv {
    dotenv().ok();
    let mysql_url = env::var("MYSQL_URL").unwrap_or_else(|_| "locahost".to_string());
    let mysql_port = env::var("MYSQL_PORT").unwrap_or_else(|_| "3306".to_string());
    let mysql_database = env::var("MYSQL_DATABASE").unwrap_or_else(|_| "PCBViewer".to_string());
    let mysql_user = env::var("MYSQL_USER").unwrap_or_else(|_| "root".to_string());
    let mysql_password = env::var("MYSQL_PASSWORD").expect("missing MYSQL_PASSWORD envrioment");

    AppEnv {
        mysql_url,
        mysql_port,
        mysql_database,
        mysql_user,
        mysql_password,
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_app_env])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
