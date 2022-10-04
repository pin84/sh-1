import request from '@/utils/request'

// 查询包装辅料列表
export function listBaozhuang(query) {
  return request({
    url: '/system/baozhuang/list',
    method: 'get',
    params: query
  })
}

// 查询包装辅料详细
export function getBaozhuang(baozhuangId) {
  return request({
    url: '/system/baozhuang/' + baozhuangId,
    method: 'get'
  })
}

// 新增包装辅料
export function addBaozhuang(data) {
  return request({
    url: '/system/baozhuang',
    method: 'post',
    data: data
  })
}

// 修改包装辅料
export function updateBaozhuang(data) {
  return request({
    url: '/system/baozhuang',
    method: 'put',
    data: data
  })
}

// 删除包装辅料
export function delBaozhuang(baozhuangId) {
  return request({
    url: '/system/baozhuang/' + baozhuangId,
    method: 'delete'
  })
}
