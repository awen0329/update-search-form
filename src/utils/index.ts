import { getDate, getDay, getDaysInMonth, getMonth, getYear, lastDayOfMonth } from "date-fns"

export * as Validator from "./validateSchemas"

export async function mockDelay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export function daysPerCalendarPage(month: number, year: number) {
  const currentMonthDates = getDaysInMonth(new Date(year, month))
  const firstWeekDayOfMonth = getDay(new Date(year, month))
  const lastWeekDayOfMonth = getDay(lastDayOfMonth(new Date(year, month)))
  const lastMonthDate = new Date(month === 1 ? year - 1 : year, month === 1 ? 12 : month - 1)
  const lastMonthDates = getDaysInMonth(lastMonthDate)
  
  let calendarDates = []
  for (let i = firstWeekDayOfMonth - 1; i >= 0; i--) {
    calendarDates.push({ type: "previous", date: lastMonthDates - i })
  }
  for (let i = 1; i <= currentMonthDates; i++) {
    calendarDates.push({ type: "current", date: i })
  }
  
  for (let i = 1; i <= 6 - lastWeekDayOfMonth; i++) {
    calendarDates.push({ type: "next", date: i })
  }
  
  return calendarDates
}

export { getYear, getDate, getMonth }

export function getHaversineDistance(point1: [number, number], point2: [number, number]) {
  const [lat1, lon1] = point1
  const [lat2, lon2] = point2

  const R = 6371
  const x1 = lat2 - lat1
  const dLat = (x1 * Math.PI) / 180
  const x2 = lon2 - lon1
  const dLon = (x2 * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d
}
