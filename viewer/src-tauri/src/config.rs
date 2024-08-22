use std::{env, sync::Mutex};

use dotenv::dotenv;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};

lazy_static! {
    pub static ref app_env_static: Mutex<AppEnv> = Mutex::new(AppEnv::new());
}

#[derive(Clone, Serialize, Deserialize)]
pub struct AppEnv {
    pub mysql_url: String,
    pub mysql_port: String,
    pub mysql_database: String,
    pub mysql_user: String,
    pub mysql_password: String,
    pub api_url: String,
}

impl AppEnv {
    pub fn new() -> Self {
        dotenv().ok();
        let mysql_url = env::var("MYSQL_URL").unwrap_or_else(|_| "locahost".to_string());
        let mysql_port = env::var("MYSQL_PORT").unwrap_or_else(|_| "3306".to_string());
        let mysql_database = env::var("MYSQL_DATABASE").unwrap_or_else(|_| "PCBViewer".to_string());
        let mysql_user = env::var("MYSQL_USER").unwrap_or_else(|_| "root".to_string());
        let mysql_password = env::var("MYSQL_PASSWORD").expect("missing MYSQL_PASSWORD envrioment");
        let api_url = env::var("API_URL").expect("missing API_URL envrioment");
        AppEnv {
            mysql_url,
            mysql_port,
            mysql_database,
            mysql_user,
            mysql_password,
            api_url,
        }
    }
}
