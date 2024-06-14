import { Key, ReactNode } from "react";
import Tree, { TreeNode } from "rc-tree";
import { DataNode, EventDataNode } from "rc-tree/lib/interface";
import {
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
  SearchIcon,
} from "~/assets/icons";
import PDFImg from "~/assets/image/pdf.png";
import PCBImg from "~/assets/image/pcb.png";
import { cn } from "~/lib/utils";
import { useAsset } from "~/hooks/useAsset";
import { useTab } from "~/hooks/useTab";
import { Button, Input } from "~/components/ui";
import Image from "next/image";

import "~/assets/style/tree.scss";
import { useRouter } from "next/navigation";

interface TreeAsset extends Asset {
  key: Key;
  title: ReactNode;
  children?: TreeAsset[];
}

const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onAppearStart: () => ({ height: 0 }),
  onAppearActive: (node: { scrollHeight: any }) => ({
    height: node.scrollHeight,
  }),
  onLeaveStart: (node: { offsetHeight: any }) => ({
    height: node.offsetHeight,
  }),
  onLeaveActive: () => ({ height: 0 }),
};

export function Sidebar() {
  const {
    expandedKeys,
    selectedKeys,
    setSelectedKeys,
    setExpandedKeys,
    treeAssets,
  } = useAsset();

  const { setHistoryTabs, setViewTab, historyTabs } = useTab();
  const router = useRouter();
  function generateTreeNode(treeData?: TreeAsset[]) {
    return treeData?.map((asset) => (
      <TreeNode
        key={asset.key}
        title={
          <span>
            <span className="absolute w-full h-full cursor-pointer left-0"></span>
            {asset.title}
          </span>
        }
        data={asset}
      >
        {generateTreeNode(asset.children)}
      </TreeNode>
    ));
  }

  function handleSelect(
    _: Key[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode<DataNode>;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) {
    const data = (info.node as any).data as TreeAsset;
    if (data.asset_type !== "DIR") {
      setSelectedKeys([data.key.toString()]);
      if (historyTabs.findIndex((tab) => tab.key === data.key) === -1) {
        setHistoryTabs((prevTabs) => [
          ...prevTabs,
          { key: data.key, label: data.asset_name, type: data.asset_type },
        ]);
      }

      setViewTab({
        key: data.key,
        label: data.asset_name,
        type: data.asset_type,
      });

      router.replace("/viewer");
    } else if (data.children) {
      const index = expandedKeys.findIndex((key) => key == data.key);
      if (index !== -1) {
        const newExpandedKeys = [...expandedKeys];
        newExpandedKeys.splice(index, 1);
        setExpandedKeys(newExpandedKeys);
      } else {
        setExpandedKeys([...expandedKeys, data.key.toString()]);
      }
    }
  }

  // function handleExpand(keys: Key[]) {
  //   setExpandedKeys(keys)
  // }

  return (
    <div>
      <Search />
      <Tree
        selectable
        className="select-none text-sm text-zinc-950 p-2"
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        // onExpand={handleExpand}
        onSelect={handleSelect}
        motion={motion}
        switcherIcon={(row) => {
          if (!row.isLeaf) {
            return (
              <ChevronRightIcon
                className={cn(
                  "text-base text-zinc-500 transition-transform",
                  row.expanded ? "rotate-90" : "rotate-0"
                )}
              />
            );
          } else return null;
        }}
        icon={(row) => {
          const asset = (row.data as any).data as TreeAsset;
          if (asset.asset_type === "DIR") {
            if (row.expanded) {
              return (
                <FolderOpenIcon className="text-blue-600 text-base mr-4" />
              );
            }
            return <FolderIcon className="text-yellow-600 text-base  mr-4" />;
          }

          if (asset.asset_type === "PDF") {
            return <Image src={PDFImg} alt="" />;
          }
          if (asset.asset_type === "PCB") {
            return <Image src={PCBImg} alt="" />;
          }
          return <Image src={PCBImg} alt="" />;
        }}
      >
        {generateTreeNode(treeAssets)}
      </Tree>
    </div>
  );
}

function Search() {
  return (
    <div className="relative border-b border-zinc-200">
      <div className="w-full h-11 flex justify-center items-center px-4 space-x-3">
        <Button className="h-8" variant="outline">
          复位
        </Button>
        <Input className="flex-1" type="text" />
        <Button className="h-8 w-8" size="icon">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}
