import {
  Key,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { handleRcTree, handleTree } from "~/lib/proxy";
import { setStore } from "~/lib/store";
import { EXPANDED_ASSETS, SELECTED_ASSETS } from "~/lib/store/constants";
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
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const { select } = useApp();

  const treeAssets = useMemo<TreeAsset[]>(() => {
    return handleTree(
      handleRcTree(assets, transformMap),
      "asset_id",
      "parent_id"
    );
  }, [assets]);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const assets = await select<Asset[]>(
          "SELECT * FROM tb_asset ORDER BY sort ASC"
        );
        setAssets(assets || []);
      } catch (error) {
        setAssets([]);
      }
    }
    fetchAssets();
  }, []);

  useEffect(() => {
    setStore(EXPANDED_ASSETS, expandedKeys);
  }, [expandedKeys]);

  useEffect(() => {
    setStore(SELECTED_ASSETS, selectedKeys);
  }, [selectedKeys]);

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
