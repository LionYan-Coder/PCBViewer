import { invoke } from '@tauri-apps/api/core'
export async function getAppEnv() {
  try {
    const value = await invoke<AppEnv>('get_app_env')
    return value
  } catch (error) {
    console.error('获取环境变量失败', error)
    throw error
  }
}
