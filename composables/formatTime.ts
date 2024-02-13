import { format } from 'date-fns'

export function formatTime(data: string | undefined | null | Date) {
  if (data)
    return format(new Date(data), 'MMM dd, yyyy')
  else
    return ''
}
