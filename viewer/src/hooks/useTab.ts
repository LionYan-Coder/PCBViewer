import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setStore } from "~/lib/store";
import { HISTORY_TABS, VIEW_TAB } from "~/lib/store/constants";
export const HomeTab: Tab = {
  label: "主页",
  key: "/",
  type: "ROUTE",
};
export function useTabContext() {
  const [historyTabs, setHistoryTabs] = useState<Tab[]>([HomeTab]);
  const [viewTab, setViewTab] = useState<Tab | null>({ ...HomeTab });

  function setHomeTab() {
    setHistoryTabs([HomeTab]);
    setViewTab({ ...HomeTab });
  }

  useEffect(() => {
    setStore(HISTORY_TABS, historyTabs);
  }, [historyTabs]);

  useEffect(() => {
    setStore(VIEW_TAB, viewTab);
  }, [viewTab]);

  return useMemo(
    () => ({
      historyTabs,
      viewTab,
      setHistoryTabs,
      setViewTab,
      setHomeTab,
    }),
    [historyTabs, viewTab]
  );
}

export const TabContext = createContext<ReturnType<
  typeof useTabContext
> | null>(null);

export const useTab = () => {
  const context = useContext(TabContext);

  if (context == null) {
    throw new Error("missing tab provider");
  }

  return context;
};
