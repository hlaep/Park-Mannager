// Dates
export const checkDuplicateDate = (time, dates) => {
  return dates.some(date => getFullDate(time) === date)
}

export const getFullDate = date => {
  if (!date) return console.error('paremeter of getFullDate is undefined')
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

export const getLatestDateBeforeDate = (currentDate, allDates) => {
  const sortedDates = sortByTimeAndRemoveDuplicates(allDates)
  let latestDate
  sortedDates.forEach((date, index) => {
    if (date === getFullDate(currentDate)) {
      latestDate = sortedDates[index + 1]
    }
  })
  if (latestDate === undefined) return currentDate
  return latestDate
}

export const getTicketsOfDate = (date, tickets) => {
  if (!date) throw Error('Date is undefined, at getTicketsOfDate')
  if (typeof date === 'string') {
    // if date is already treated to dd/mm/yyyy string format
    return tickets.filter(ticket => getFullDate(ticket.exitTime) === date)
  } else {
    tickets.filter(ticket => getFullDate(ticket.exitTime) === getFullDate(date))
  }
}

// Others
export const checkDuplicate = (item, arr) => {
  return arr.some(value => item === value.id)
}
