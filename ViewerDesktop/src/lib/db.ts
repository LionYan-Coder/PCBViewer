import Database from '@tauri-apps/plugin-sql'
import { getAppEnv } from './command'

// eslint-disable-next-line camelcase
const { mysql_url, mysql_database, mysql_password, mysql_port, mysql_user } = await getAppEnv()

// eslint-disable-next-line camelcase
const url = `mysql://${mysql_user}:${mysql_password}@${mysql_url}:${mysql_port}/${mysql_database}`
export const db = await Database.load(
  // eslint-disable-next-line camelcase
  `mysql://${mysql_user}:${mysql_password}@${mysql_url}:${mysql_port}/${mysql_database}`,
)

export function closeDB() {
  db.close()
}
