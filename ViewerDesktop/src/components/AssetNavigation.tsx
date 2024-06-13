import { Key, ReactNode, useCallback } from 'react'
import Tree, { TreeNode } from 'rc-tree'
import { DataNode, EventDataNode } from 'rc-tree/lib/interface'
import '~/assets/tree.css'
import { ChevronRightIcon, FolderIcon, FolderOpenIcon } from '~/assets/icons'
import PDFImg from '~/assets/pdf.png'
import PCBImg from '~/assets/pcb.png'
import { cn } from '~/lib/utils'
import { useAssetContext } from '~/hooks/useAsset'

interface TreeAsset extends Asset {
  key: Key
  title: ReactNode
  children?: TreeAsset[]
}

const motion = {
  motionName: 'node-motion',
  motionAppear: false,
  onAppearStart: () => ({ height: 0 }),
  onAppearActive: (node: { scrollHeight: any }) => ({
    height: node.scrollHeight,
  }),
  onLeaveStart: (node: { offsetHeight: any }) => ({
    height: node.offsetHeight,
  }),
  onLeaveActive: () => ({ height: 0 }),
}

export function AssetNavigation() {
  const { expandedKeys, selectedKeys, setSelectedKeys, setExpandedKeys, treeAssets } =
    useAssetContext()

  const handleClickNode = useCallback(
    (asset: TreeAsset, keys: Key[]) => {
      if (asset && asset.asset_type !== 'DIR') {
        setSelectedKeys([asset.asset_id])
      } else {
        const index = keys.findIndex((key) => key === asset.asset_id)
        if (index !== -1) {
          const newExpandedKeys = [...keys]
          newExpandedKeys.splice(index, 1)
          setExpandedKeys(newExpandedKeys)
        } else {
          setExpandedKeys([...keys, asset.asset_id])
        }
      }
    },
    [setExpandedKeys, setSelectedKeys],
  )

  const generateTreeNode = useCallback(
    (treeData?: TreeAsset[]) => {
      return treeData?.map((asset) => (
        <TreeNode
          key={asset.key}
          title={
            <span>
              <span
                className='absolute w-full h-full cursor-pointer left-0'
                onClick={() => handleClickNode(asset, expandedKeys)}
              ></span>
              {asset.title}
            </span>
          }
          data={asset}
        >
          {generateTreeNode(asset.children)}
        </TreeNode>
      ))
    },
    [expandedKeys, handleClickNode],
  )

  function handleSelect(
    keys: Key[],
    info: {
      event: 'select'
      selected: boolean
      node: EventDataNode<DataNode>
      selectedNodes: DataNode[]
      nativeEvent: MouseEvent
    },
  ) {
    const data = (info.node as any).data as TreeAsset
    if (data && data.asset_type !== 'DIR') {
      setSelectedKeys(keys)
    } else {
      setSelectedKeys([])
    }
  }

  function handleExpand(keys: Key[]) {
    setExpandedKeys(keys)
  }

  return (
    <div>
      <Tree
        selectable
        expandAction='click'
        className='select-none text-sm text-zinc-950'
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onSelect={handleSelect}
        onExpand={handleExpand}
        motion={motion}
        switcherIcon={(row) => {
          if (!row.isLeaf) {
            return (
              <ChevronRightIcon
                className={cn(
                  'text-base text-zinc-500 transition-transform',
                  row.expanded ? 'rotate-90' : 'rotate-0',
                )}
              />
            )
          } else return null
        }}
        icon={(row) => {
          const asset = (row.data as any).data as TreeAsset
          if (asset.asset_type === 'DIR') {
            if (row.expanded) {
              return <FolderOpenIcon className='text-blue-600 text-base mr-4' />
            }
            return <FolderIcon className='text-yellow-600 text-base  mr-4' />
          }

          if (asset.asset_type === 'PDF') {
            return <img src={PDFImg} alt='' />
          }
          if (asset.asset_type === 'PCB') {
            return <img src={PCBImg} alt='' />
          }
          return <img src={PCBImg} alt='' />
        }}
      >
        {generateTreeNode(treeAssets)}
      </Tree>
    </div>
  )
}
