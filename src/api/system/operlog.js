import request from '@/service/index.js'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/system/operlog/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/system/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/system/operlog/clean',
    method: 'delete'
  })
}
