import {
  Key,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { handleRcTree, handleTree } from "~/lib/proxy";

interface TreeAsset extends Asset {
  key: Key;
  title: ReactNode;
  children?: TreeAsset[];
}

const transformMap = {
  key: "asset_id",
  title: "asset_name",
};

export function useAssetContext() {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const treeAssets = useMemo<TreeAsset[]>(() => {
    return handleTree(
      handleRcTree(assets, transformMap),
      "asset_id",
      "parent_id"
    );
  }, [assets]);

  return useMemo(
    () => ({
      expandedKeys,
      setExpandedKeys,
      selectedKeys,
      setSelectedKeys,
      assets,
      setAssets,
      treeAssets,
    }),
    [assets, expandedKeys, selectedKeys, treeAssets]
  );
}

export const AssetContext = createContext<ReturnType<
  typeof useAssetContext
> | null>(null);

export const useAsset = () => {
  const context = useContext(AssetContext);

  if (context == null) {
    throw new Error("missing asset provider");
  }

  return context;
};
