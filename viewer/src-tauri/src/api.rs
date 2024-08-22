use crate::{
    app_error,
    config::{app_env_static, AppEnv},
    pcb::{self, text::ASCIIText},
};
use pcb::lib::PCBAscii;
use tauri_plugin_http::reqwest;

#[tauri::command(async)]
pub fn get_app_env() -> AppEnv {
    let app_env = app_env_static.lock().unwrap();
    app_env.clone()
}

#[tauri::command(async)]
pub async fn get_asc_by_file_path(path: String) -> Result<Vec<ASCIIText>, app_error::ApiError> {
    let env = get_app_env();
    let asset_url = env.api_url + &path;
    let response = reqwest::get(asset_url).await?;
    if response.status().is_success() {
        let content = response.text().await?;
        let pcb_text = pcb::text::ASCIIText::from_str(&content);

        Ok(pcb_text)
    } else {
        Err(app_error::ApiError::HttpError(
            format!("Failed to load file: {}", response.status()).into(),
        ))
    }
}
