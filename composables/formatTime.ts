import { format } from 'date-fns'

export function formatTime(data: string | undefined) {
  if (data)
    return format(new Date(data), 'MMMM dd, yyyy')
}
