import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询组别/商标列表
export function listCustomer(query) {
  return request({
    url: '/system/customer/list',
    method: 'get',
    params: query
  })
}

// 查询组别/商标详细
export function getCustomer(id) {
  return request({
    url: '/system/customer/'  + parseStrEmpty(id),
    method: 'get'
  })
}

// 新增组别/商标
export function addCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'post',
    data: data
  })
}

// 修改组别/商标
export function updateCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'put',
    data: data
  })
}

// 删除组别/商标
export function delCustomer(id) {
  return request({
    url: '/system/customer/' + id,
    method: 'delete'
  })
}
