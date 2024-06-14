"use client";

import { Key, ReactNode, useEffect, useState } from "react";
import { AssetContext, useAssetContext } from "~/hooks/useAsset";
import { TabContext, useTabContext } from "~/hooks/useTab";
import { getStore } from "~/lib/store";
import {
  EXPANDED_ASSETS,
  HISTORY_TABS,
  RESIZABLE_COLLAPSED,
  RESIZABLE_LAYOUT,
  SELECTED_ASSETS,
  VIEW_TAB,
} from "~/lib/store/constants";
import { ResizableLayout } from "./ResizableLayout";
import { Worker } from "@react-pdf-viewer/core";

export default function Layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const [layout, setLayout] = useState<number[] | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const assetContext = useAssetContext();
  const tabContext = useTabContext();
  useEffect(() => {
    async function fetchInitStore() {
      const layout = await getStore<number[]>(RESIZABLE_LAYOUT);
      const collapsed = await getStore<boolean>(RESIZABLE_COLLAPSED);
      const expandedAssets = await getStore<Key[]>(EXPANDED_ASSETS);
      const selectedAssets = await getStore<Key[]>(SELECTED_ASSETS);
      const historyTabs = await getStore<Tab[]>(HISTORY_TABS);
      const viewTab = await getStore<Tab>(VIEW_TAB);
      setLayout(layout ?? undefined);
      setCollapsed(collapsed ?? false);
      assetContext.setExpandedKeys(expandedAssets ?? []);
      assetContext.setSelectedKeys(selectedAssets ?? []);
      tabContext.setHistoryTabs(historyTabs ?? []);
      tabContext.setViewTab(viewTab ?? null);
    }
    fetchInitStore();
  }, []);
  return (
    <Worker workerUrl="/pdf.worker.min.js">
      <AssetContext.Provider value={assetContext}>
        <TabContext.Provider value={tabContext}>
          <ResizableLayout
            defaultLayout={layout}
            defaultCollapsed={collapsed}
            navCollapsedSize={4}
          >
            {children}
          </ResizableLayout>
        </TabContext.Provider>
      </AssetContext.Provider>
    </Worker>
  );
}
