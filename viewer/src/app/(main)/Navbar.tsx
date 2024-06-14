import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { CloseIcon } from "~/assets/icons";
import { useTab } from "~/hooks/useTab";
import { cn } from "~/lib/utils";

export function Navbar() {
  const { historyTabs } = useTab();
  return (
    <div className="w-full fixed z-50 top-0 flex h-11 bg-background">
      {historyTabs.map((tab) => (
        <Tab key={tab.key} data={tab}>
          {tab.label}
        </Tab>
      ))}

      <div className="absolute w-full left-0 right-0 -bottom-[1px] z-[1] h-[1px] bg-zinc-200"></div>
    </div>
  );
}

export function Tab({
  children,
  data,
}: {
  children: Readonly<ReactNode>;
  data: Tab;
}) {
  const router = useRouter();

  const { viewTab, setViewTab, historyTabs, setHistoryTabs } = useTab();
  function handleClose() {
    const prevTabs = [...historyTabs];
    const index = prevTabs.findIndex((v) => v.key === data.key);
    prevTabs.splice(index, 1);
    setHistoryTabs(prevTabs);
    if (data.key === viewTab?.key) {
      const obj = prevTabs[index - 1];
      if (obj) {
        setViewTab(obj);
      } else {
        router.replace("/overview");
        setViewTab(null);
      }
      setViewTab(obj ?? null);
    }
  }

  function handleChangeTab() {
    setViewTab(data);
    if (data.type === "ROUTE") {
      router.replace(data.key);
    }
    if (data.type === "PDF") {
      router.replace("/viewer");
    }
  }

  return (
    <div
      className="group flex items-center flex-1 max-w-44 cursor-pointer relative py-3"
      onClick={handleChangeTab}
    >
      <div className="relative z-[1] w-full h-full flex justify-center items-center border-r border-zinc-200">
        <span
          className={cn(
            "whitespace-nowrap overflow-hidden truncate px-4 text-xs text-zinc-700 group-hover:text-zinc-800 transition-colors",
            { "!text-primary": viewTab && viewTab.key === data.key }
          )}
        >
          {children}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="group/close absolute right-1  rounded bg-inherit hover:bg-zinc-200 transition-colors p-[3px] flex justify-center items-center"
        >
          <CloseIcon className="text-xs text-zinc-600 group-hover/close:text-zinc-700 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      </div>
      <div
        className={cn(
          "h-[1px] bg-primary absolute z-[2] -bottom-[1px] right-2 left-2 transition-opacity",
          viewTab && viewTab.key === data.key ? "opacity-100" : "opacity-0"
        )}
      ></div>
    </div>
  );
}
