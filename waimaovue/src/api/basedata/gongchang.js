import request from '@/utils/request'

// 查询工厂设置列表
export function listGongchang(query) {
  return request({
    url: '/basedata/gongchang/list',
    method: 'get',
    params: query
  })
}

// 查询工厂设置详细
export function getGongchang(gongchangId) {
  return request({
    url: '/basedata/gongchang/' + gongchangId,
    method: 'get'
  })
}

// 新增工厂设置
export function addGongchang(data) {
  return request({
    url: '/basedata/gongchang',
    method: 'post',
    data: data
  })
}

// 修改工厂设置
export function updateGongchang(data) {
  return request({
    url: '/basedata/gongchang',
    method: 'put',
    data: data
  })
}

// 删除工厂设置
export function delGongchang(gongchangId) {
  return request({
    url: '/basedata/gongchang/' + gongchangId,
    method: 'delete'
  })
}
