import request from '@/utils/request'
import type { RouterVo, AjaxResult } from '@/types'

// 获取路由
export const getRouters = (): Promise<AjaxResult<RouterVo>> => {
  return request({
    url: '/system/menu/getRouters',
    method: 'get'
  })
}
