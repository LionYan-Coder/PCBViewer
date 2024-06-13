import { Key, ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { db } from '~/lib/db'
import { handleRcTree, handleTree } from '~/lib/proxy'

interface TreeAsset extends Asset {
  key: Key
  title: ReactNode
  children?: TreeAsset[]
}

const transformMap = {
  key: 'asset_id',
  title: 'asset_name',
}

export function useAsset() {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [assets, setAssets] = useState<Asset[]>([])

  const treeAssets = useMemo<TreeAsset[]>(() => {
    return handleTree(handleRcTree(assets, transformMap), 'asset_id', 'parent_id')
  }, [assets])

  useEffect(() => {
    async function fetchAssets() {
      try {
        const assets = await db.select<Asset[]>('SELECT * FROM tb_asset ORDER BY sort ASC')
        setAssets(assets)
      } catch (error) {
        setAssets([])
      }
    }
    fetchAssets()
  }, [])

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
    [assets, expandedKeys, selectedKeys, treeAssets],
  )
}

export const AssetContext = createContext<ReturnType<typeof useAsset> | null>(null)

export const useAssetContext = () => {
  const context = useContext(AssetContext)

  if (context == null) {
    throw new Error('missing asset provider')
  }

  return context
}
