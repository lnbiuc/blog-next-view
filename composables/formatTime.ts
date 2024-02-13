import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function formatTime(data: string | undefined | null | Date) {
  if (data)
    return format(new Date(data), 'MMM dd, yyyy')
  else
    return ''
}

export function formatZHTime(data: string | undefined | null | Date) {
  if (data)
    return format(new Date(data), 'yyyy年MM月dd日', { locale: zhCN })
  else
    return ''
}
