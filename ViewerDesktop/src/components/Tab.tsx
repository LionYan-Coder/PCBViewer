import { ReactNode } from 'react'
import { CloseIcon } from '~/assets/icons'
import { useTabContext } from '~/hooks/useTab'
import { cn } from '~/lib/utils'

export function Tab() {
  const { historyTabs } = useTabContext()
  return (
    <div className='w-full relative flex h-11'>
      {historyTabs.map((tab) => (
        <TabItem key={tab.key} data={tab}>
          {tab.label}
        </TabItem>
      ))}

      <div className='absolute w-full left-0 right-0 bottom-0 z-[1] h-[1px] bg-zinc-200'></div>
    </div>
  )
}

export function TabItem({ children, data }: { children: Readonly<ReactNode>; data: Tab }) {
  const { viewTab, setViewTab, historyTabs, setHistoryTabs } = useTabContext()
  function handleClose() {
    const prevTabs = [...historyTabs]
    const index = prevTabs.findIndex((v) => v.key === data.key)
    prevTabs.splice(index, 1)
    setHistoryTabs(prevTabs)
    if (data.key === viewTab?.key) {
      setViewTab(prevTabs[index - 1] ?? null)
    }
  }

  function handleChangeTab() {
    setViewTab(data)
  }

  return (
    <div
      className='group flex items-center flex-1 max-w-44 cursor-pointer relative py-3'
      onClick={handleChangeTab}
    >
      <div className='relative z-[1] w-full h-full flex justify-center items-center border-r border-zinc-200'>
        <span
          className={cn(
            'whitespace-nowrap overflow-hidden truncate px-4 text-xs text-zinc-700 group-hover:text-zinc-800 transition-colors',
            { '!text-primary': viewTab && viewTab.key === data.key },
          )}
        >
          {children}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          className='group/close absolute right-1  rounded bg-inherit hover:bg-zinc-200 transition-colors p-[3px] flex justify-center items-center'
        >
          <CloseIcon className='text-xs text-zinc-600 group-hover/close:text-zinc-700 opacity-0 group-hover:opacity-100 transition-all' />
        </button>
      </div>
      <div
        className={cn(
          'h-[1px] bg-primary absolute z-[2] bottom-0 right-2 left-2 transition-opacity',
          viewTab && viewTab.key === data.key ? 'opacity-100' : 'opacity-0',
        )}
      ></div>
    </div>
  )
}
