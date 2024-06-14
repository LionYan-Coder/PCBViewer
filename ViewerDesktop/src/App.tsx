import { Key, useEffect, useState } from 'react'
import { ResizableLayout } from './components/ResizableLayout'
import './global.css'
import { getStore } from './lib/store'
import {
  EXPANDED_ASSETS,
  HISTORY_TABS,
  RESIZABLE_COLLAPSED,
  RESIZABLE_LAYOUT,
  SELECTED_ASSETS,
  VIEW_TAB,
} from './lib/store/constants'
import { AssetContext, useAsset } from './hooks/useAsset'
import { TabContext, useTab } from './hooks/useTab'
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // const queryClient = new QueryClient();
  const [layout, setLayout] = useState<number[] | undefined>(undefined)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const assetContext = useAsset()
  const tabContext = useTab()
  useEffect(() => {
    async function fetchInitStore() {
      const layout = await getStore<number[]>(RESIZABLE_LAYOUT)
      const collapsed = await getStore<boolean>(RESIZABLE_COLLAPSED)
      const expandedAssets = await getStore<Key[]>(EXPANDED_ASSETS)
      const selectedAssets = await getStore<Key[]>(SELECTED_ASSETS)
      const historyTabs = await getStore<Tab[]>(HISTORY_TABS)
      const viewTab = await getStore<Tab>(VIEW_TAB)
      setLayout(layout ?? undefined)
      setCollapsed(collapsed ?? false)
      assetContext.setExpandedKeys(expandedAssets ?? [])
      assetContext.setSelectedKeys(selectedAssets ?? [])
      tabContext.setHistoryTabs(historyTabs ?? [])
      tabContext.setViewTab(viewTab ?? null)
    }
    fetchInitStore()
  }, [])
  return (
    <AssetContext.Provider value={assetContext}>
      <TabContext.Provider value={tabContext}>
        <ResizableLayout
          defaultLayout={layout}
          defaultCollapsed={collapsed}
          navCollapsedSize={4}
        ></ResizableLayout>
      </TabContext.Provider>
    </AssetContext.Provider>
  )

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <ResizableLayout
  //       defaultLayout={layout}
  //       defaultCollapsed={collapsed}
  //       navCollapsedSize={4}
  //     ></ResizableLayout>
  //   </QueryClientProvider>
  // );
}

export default App
