import request from '@/utils/request'

// 查询资产数据列表
export function listAsset(query) {
  return request({
    url: '/asset/asset/list',
    method: 'get',
    params: query
  })
}

// 查询资产数据详细
export function getAsset(assetId) {
  return request({
    url: '/asset/asset/' + assetId,
    method: 'get'
  })
}

// 新增资产数据
export function addAsset(data) {
  return request({
    url: '/asset/asset',
    method: 'post',
    data: data
  })
}

// 修改资产数据
export function updateAsset(data) {
  return request({
    url: '/asset/asset',
    method: 'put',
    data: data
  })
}

// 删除资产数据
export function delAsset(assetId) {
  return request({
    url: '/asset/asset/' + assetId,
    method: 'delete'
  })
}
