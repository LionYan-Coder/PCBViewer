mod api;
mod app_error;
mod config;
mod pcb;

use config::{app_env_static, AppEnv};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let devtools = tauri_plugin_devtools::init();
    tauri::Builder::default()
        .setup(|_| {
            let mut app_env = app_env_static.lock().unwrap();
            *app_env = AppEnv::new();
            Ok(())
        })
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(devtools)
        .invoke_handler(tauri::generate_handler![
            api::get_app_env,
            api::get_asc_by_file_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
