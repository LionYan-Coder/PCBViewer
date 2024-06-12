import { useEffect, useState } from "react";
import { ResizableLayout } from "./components/ResizableLayout";
import "./global.css";
import store from "./lib/store";
import { RESIZABLE_COLLAPSED, RESIZABLE_LAYOUT } from "./lib/store/constants";

function App() {
  const [layout, setLayout] = useState<number[] | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    async function fetchInitStore() {
      const layout = await store.get<number[]>(RESIZABLE_LAYOUT);
      const collapsed = await store.get<boolean>(RESIZABLE_COLLAPSED);
      setLayout(layout ?? undefined);
      setCollapsed(collapsed ?? false);
    }
    fetchInitStore();
  }, []);

  return (
    <div>
      <ResizableLayout
        defaultLayout={layout}
        defaultCollapsed={collapsed}
        navCollapsedSize={4}
      ></ResizableLayout>
    </div>
  );
}

export default App;
