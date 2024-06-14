import { Key, useEffect } from "react";
import { useApp } from "~/hooks/useApp";
import { AssetContext, useAssetContext } from "~/hooks/useAsset";
import { getStore, setStore } from "~/lib/store";
import { EXPANDED_ASSETS, SELECTED_ASSETS } from "~/lib/store/constants";

export function AssetProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { select } = useApp();
  const context = useAssetContext();
  const {
    setAssets,
    selectedKeys,
    expandedKeys,
    setExpandedKeys,
    setSelectedKeys,
  } = context;
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

    async function initStore() {
      const expandedAssets = await getStore<Key[]>(EXPANDED_ASSETS);
      const selectedAssets = await getStore<Key[]>(SELECTED_ASSETS);
      setExpandedKeys(expandedAssets ?? []);
      setSelectedKeys(selectedAssets ?? []);
    }
    fetchAssets();
    initStore();
  }, []);

  useEffect(() => {
    setStore(EXPANDED_ASSETS, expandedKeys);
  }, [expandedKeys]);

  useEffect(() => {
    setStore(SELECTED_ASSETS, selectedKeys);
  }, [selectedKeys]);
  return (
    <AssetContext.Provider value={context}>{children}</AssetContext.Provider>
  );
}
