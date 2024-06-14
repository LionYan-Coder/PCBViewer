import { useEffect } from "react";
import { TabContext, useTabContext } from "~/hooks/useTab";
import { getStore, setStore } from "~/lib/store";
import { HISTORY_TABS, VIEW_TAB } from "~/lib/store/constants";

export function TabviewProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = useTabContext();
  const { viewTab, setViewTab, historyTabs, setHistoryTabs } = context;

  useEffect(() => {
    setStore(HISTORY_TABS, historyTabs);
  }, [historyTabs]);

  useEffect(() => {
    setStore(VIEW_TAB, viewTab);
  }, [viewTab]);

  useEffect(() => {
    async function initStore() {
      const historyTabs = await getStore<Tab[]>(HISTORY_TABS);
      const viewTab = await getStore<Tab>(VIEW_TAB);
      setHistoryTabs(historyTabs ?? []);
      setViewTab(viewTab ?? null);
    }
    initStore();
  }, []);

  return <TabContext.Provider value={context}>{children}</TabContext.Provider>;
}
