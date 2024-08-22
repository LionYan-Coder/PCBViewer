import {
  Key,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { handleRcTree, handleTree } from "~/lib/proxy";
import { useApp } from "./useApp";

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
  const { select } = useApp();
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);

  const treeAssets = useMemo<TreeAsset[]>(() => {
    return handleTree(
      handleRcTree(assets, transformMap),
      "asset_id",
      "parent_id"
    );
  }, [assets]);

  const fetchAsset = useCallback(
    async (id: string) => {
      try {
        const result = await select<Asset[]>(
          "SELECT * FROM tb_asset WHERE asset_id = ?",
          [parseInt(id)]
        );
        if (result && result.length === 1) {
          setCurrentAsset(result[0]);
        }
      } catch (error) {
        setCurrentAsset(null);
        throw error;
      }
    },
    [select]
  );

  return useMemo(
    () => ({
      expandedKeys,
      setExpandedKeys,
      selectedKeys,
      setSelectedKeys,
      assets,
      setAssets,
      treeAssets,
      fetchAsset,
      currentAsset,
    }),
    [assets, currentAsset, expandedKeys, fetchAsset, selectedKeys, treeAssets]
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
