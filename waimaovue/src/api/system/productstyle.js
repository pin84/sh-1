import request from '@/utils/request'

// 查询货品列表
export function listProductstyle(query) {
  return request({
    url: '/system/productstyle/list',
    method: 'get',
    params: query
  })
}

// 查询货品详细
export function getProductstyle(productStyleId) {
  return request({
    url: '/system/productstyle/' + productStyleId,
    method: 'get'
  })
}

// 新增货品
export function addProductstyle(data) {
  return request({
    url: '/system/productstyle',
    method: 'post',
    data: data
  })
}

// 修改货品
export function updateProductstyle(data) {
  return request({
    url: '/system/productstyle',
    method: 'put',
    data: data
  })
}

// 删除货品
export function delProductstyle(productStyleId) {
  return request({
    url: '/system/productstyle/' + productStyleId,
    method: 'delete'
  })
}
