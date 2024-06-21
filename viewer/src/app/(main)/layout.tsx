"use client";

import { ReactNode, useEffect, useState } from "react";
import { getStore } from "~/lib/store";
import {
  HISTORY_TABS,
  RESIZABLE_COLLAPSED,
  RESIZABLE_LAYOUT,
  VIEW_TAB,
} from "~/lib/store/constants";
import { ResizableLayout } from "./ResizableLayout";
import { AssetProvider } from "~/providers/AssetProvider";
import { TabviewProvider } from "~/providers/TabViewProvider";

export default function Layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const [layout, setLayout] = useState<number[] | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  useEffect(() => {
    async function fetchInitStore() {
      const layout = await getStore<number[]>(RESIZABLE_LAYOUT);
      const collapsed = await getStore<boolean>(RESIZABLE_COLLAPSED);

      setLayout(layout ?? undefined);
      setCollapsed(collapsed ?? false);
    }
    fetchInitStore();
  }, []);
  return (
    <AssetProvider>
      <TabviewProvider>
        <ResizableLayout
          defaultLayout={layout}
          defaultCollapsed={collapsed}
          navCollapsedSize={10}
        >
          {children}
        </ResizableLayout>
      </TabviewProvider>
    </AssetProvider>
  );
}
