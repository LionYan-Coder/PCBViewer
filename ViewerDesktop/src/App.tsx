import { useEffect, useState } from 'react'
import { ResizableLayout } from './components/ResizableLayout'
import './global.css'
import store from './lib/store'
import { RESIZABLE_COLLAPSED, RESIZABLE_LAYOUT } from './lib/store/constants'
import { AssetContext, useAsset } from './hooks/useAsset'
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // const queryClient = new QueryClient();
  const [layout, setLayout] = useState<number[] | undefined>(undefined)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const context = useAsset()
  useEffect(() => {
    async function fetchInitStore() {
      const layout = await store.get<number[]>(RESIZABLE_LAYOUT)
      const collapsed = await store.get<boolean>(RESIZABLE_COLLAPSED)
      setLayout(layout ?? undefined)
      setCollapsed(collapsed ?? false)
    }
    fetchInitStore()
  }, [])
  return (
    <AssetContext.Provider value={context}>
      <ResizableLayout
        defaultLayout={layout}
        defaultCollapsed={collapsed}
        navCollapsedSize={4}
      ></ResizableLayout>
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
