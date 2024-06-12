import { ReactNode, useState } from "react";
import { Resizable } from "./ui";
import store from "~/lib/store";
import { cn } from "~/lib/utils";
import { RESIZABLE_COLLAPSED, RESIZABLE_LAYOUT } from "~/lib/store/constants";

interface Props {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children?: ReactNode;
}

export function ResizableLayout({
  children,
  defaultLayout = [265, 1095],
  defaultCollapsed = false,
  navCollapsedSize,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <Resizable.PanelGroup
      direction="horizontal"
      className="min-h-screen w-full bg-muted/40"
      onLayout={(sizes: number[]) => {
        console.log("sizes", sizes);

        store.set(RESIZABLE_LAYOUT, sizes);
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
          store.set(RESIZABLE_COLLAPSED, false);
        }}
        onCollapse={() => {
          setIsCollapsed(true);
          store.set(RESIZABLE_COLLAPSED, true);
        }}
        className={cn(
          "hidden sm:block relative h-screen overflow-y-hidden",
          isCollapsed && "min-w-0 transition-all duration-300 ease-in-out"
        )}
      ></Resizable.Panel>
      <Resizable.Handle className="hidden sm:flex h-screen" withHandle />
      <Resizable.Panel
        defaultSize={defaultLayout[1]}
        minSize={30}
        className="transition-all duration-300 ease-in-out h-screen !overflow-auto"
        id="content"
      >
        <div className="w-full flex flex-col">
          <main>{children}</main>
        </div>
      </Resizable.Panel>
    </Resizable.PanelGroup>
  );
}
