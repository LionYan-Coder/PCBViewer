import { createContext, useContext, useMemo, useState } from "react";
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
