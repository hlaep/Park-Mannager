// Dates
export const checkDuplicateDate = (time, dates) => {
  return dates.some(date => getFullDate(time) === date)
}

export const getFullDate = date => {
  // Transforms instance of date or timestamp into a date string formated like 'dd/mm/yyyy'
  // If it is alredy formated it returns it back.
  if (!date) return console.error('paremeter of getFullDate is undefined')
  if (typeof date === 'string') return date
  if (!(date instanceof Date)) date = new Date(date)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${day}/${month}/${year}`
}
const sortByTimeAndRemoveDuplicates = dates => {
  const sortedDates = dates.sort((a, b) => b - a)
  const sortedDatesString = sortedDates.map(date => getFullDate(date))
  const uniqueDates = Array.from(new Set(sortedDatesString))
  return uniqueDates
}

export const getDateBeforeOrAfterDate = (currentDate, allDates, before) => {
  const sortedDates = sortByTimeAndRemoveDuplicates(allDates)
  let latestDate
  sortedDates.forEach((date, index) => {
    if (date === getFullDate(currentDate)) {
      latestDate = before ? sortedDates[index + 1] : sortedDates[index - 1]
    }
  })
  if (latestDate === undefined) {
    return null
  }
  return latestDate
}

export const getTicketsOfDate = (date, tickets) =>
  tickets.filter(ticket => getFullDate(ticket.exitTime) === getFullDate(date))

const getYesterdayOfDate = (date, times) => {
  const repeat = times || 1

  const currentTimestamp = date
  const oneDayMilliseconds = 24 * 60 * 60 * 1000
  const dayBeforeTimestamp = currentTimestamp - oneDayMilliseconds * repeat
  return dayBeforeTimestamp
}

export const getDateName = date => {
  // date === instance of date or 'dd/mm/yyyy'
  const arbitraryDate = getFullDate(date)
  const today = getFullDate(new Date())
  switch (arbitraryDate) {
    case today:
      return 'Hoje'
    case getFullDate(getYesterdayOfDate(new Date())):
      return 'Ontem'
    //case getYesterdayOfDate(new Date(), 2):

    default:
      return arbitraryDate
  }
}
