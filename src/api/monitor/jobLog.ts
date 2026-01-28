import request from '@/utils/request'
import type { JobLogQueryParams, SysJobLog, AjaxResult, TableDataInfo } from '@/types'

// 查询调度日志列表
export function listJobLog(query: JobLogQueryParams): Promise<TableDataInfo<SysJobLog[]>> {
  return request({
    url: '/schedule/job/log/list',
    method: 'get',
    params: query
  })
}

// 删除调度日志
export function delJobLog(jobLogId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/schedule/job/log/' + jobLogId,
    method: 'delete'
  })
}

// 清空调度日志
export function cleanJobLog(): Promise<AjaxResult> {
  return request({
    url: '/schedule/job/log/clean',
    method: 'delete'
  })
}

