import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { setStore } from '~/lib/store'
import { HISTORY_TABS, VIEW_TAB } from '~/lib/store/constants'

export function useTab() {
  const [historyTabs, setHistoryTabs] = useState<Tab[]>([])
  const [viewTab, setViewTab] = useState<Tab | null>(null)

  useEffect(() => {
    setStore(HISTORY_TABS, historyTabs)
  }, [historyTabs])

  useEffect(() => {
    setStore(VIEW_TAB, viewTab)
  }, [viewTab])

  return useMemo(
    () => ({
      historyTabs,
      viewTab,
      setHistoryTabs,
      setViewTab,
    }),
    [historyTabs, viewTab],
  )
}

export const TabContext = createContext<ReturnType<typeof useTab> | null>(null)

export const useTabContext = () => {
  const context = useContext(TabContext)

  if (context == null) {
    throw new Error('missing tab provider')
  }

  return context
}
