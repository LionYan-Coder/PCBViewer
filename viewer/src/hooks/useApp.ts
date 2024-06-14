import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import Database from "@tauri-apps/plugin-sql";
import { invoke } from "@tauri-apps/api/core";
import { ErrorProps } from "~/app/error";

export function useAppContext() {
  const db = useRef<Database>();
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState<ErrorProps["error"] | null>(null);
  const ping = useRef(0);

  async function getAppEnv() {
    try {
      const value = await invoke<AppEnv>("get_app_env");
      return value;
    } catch (error) {
      setError({ label: "获取环境变量失败", desc: JSON.stringify(error) });
      throw error;
    }
  }

  const initdb = useCallback(async () => {
    try {
      if (ping.current === 0) {
        setConnecting(true);
        ping.current = ping.current + 1;
        const {
          mysql_url,
          mysql_database,
          mysql_password,
          mysql_port,
          mysql_user,
        } = await getAppEnv();
        const url = `mysql://${mysql_user}:${mysql_password}@${mysql_url}:${mysql_port}/${mysql_database}`;
        db.current = await Database.load(url).finally(() =>
          setConnecting(false)
        );
      }
    } catch (error) {
      setConnecting(false);
      setError({ label: "数据库连接失败", desc: JSON.stringify(error) });
      throw error;
    }
  }, []);

  async function select<T>(query: string, bindValues?: unknown[]) {
    return db.current?.select<T>(query, bindValues);
  }

  async function execute(query: string, bindValues?: unknown[]) {
    return db.current?.execute(query, bindValues);
  }

  async function close() {
    ping.current = 0;
    return db.current?.close();
  }

  return useMemo(
    () => ({
      db,
      initdb,
      select,
      execute,
      close,
      connecting,
      error,
      setError,
    }),
    [connecting, error, initdb]
  );
}

export const AppContext = createContext<ReturnType<
  typeof useAppContext
> | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);

  if (context == null) {
    throw new Error("missing db provider");
  }

  return context;
};
