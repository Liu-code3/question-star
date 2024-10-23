import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

function formatTime<T extends string | number | Date | Dayjs | null | undefined>(date: T, formatType = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(formatType)
}

export {
  formatTime
}
