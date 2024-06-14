export function handleTree(data: any[], id?: string, parentId?: string, children?: string) {
  const config: any = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  const childrenListMap: any = {}
  const nodeIds: any = {}
  const tree: any[] = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o: any[]) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

export function handleRcTree(data: any[], transform: Record<string, string>, isDelOld = false) {
  return data.map((v) => {
    const raw = { ...v }
    Object.entries(transform).forEach(([newKey, oldKey]) => {
      raw[newKey] = v[oldKey]
      if (isDelOld) {
        delete raw[oldKey]
      }
    })

    return raw
  })
}
