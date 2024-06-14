import { ReactNode, useState } from "react";
import { Resizable } from "~/components/ui";
import { setStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import { RESIZABLE_COLLAPSED, RESIZABLE_LAYOUT } from "~/lib/store/constants";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface Props {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children?: ReactNode;
}

export function ResizableLayout({
  children,
  defaultLayout = [30, 70],
  defaultCollapsed = false,
  navCollapsedSize,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <Resizable.PanelGroup
      direction="horizontal"
      className="min-h-screen w-full bg-muted/40"
      onLayout={(sizes: number[]) => {
        setStore(RESIZABLE_LAYOUT, sizes);
      }}
    >
      <Resizable.Panel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={0}
        maxSize={70}
        onExpand={() => {
          setIsCollapsed(false);
          setStore(RESIZABLE_COLLAPSED, false);
        }}
        onCollapse={() => {
          setIsCollapsed(true);
          setStore(RESIZABLE_COLLAPSED, true);
        }}
        className={cn(
          "hidden sm:block relative h-screen overflow-y-hidden bg-zinc-100",
          isCollapsed && "min-w-0 transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar />
      </Resizable.Panel>
      <Resizable.Handle className="hidden sm:flex h-screen" withHandle />
      <Resizable.Panel
        defaultSize={defaultLayout[1]}
        minSize={30}
        className="transition-all duration-300 ease-in-out h-screen !overflow-auto"
        id="content"
      >
        <div className="w-full flex flex-col  pt-11">
          <Navbar />
          <main className="overflow-auto">{children}</main>
        </div>
      </Resizable.Panel>
    </Resizable.PanelGroup>
  );
}
