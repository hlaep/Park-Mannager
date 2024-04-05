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

export const getDatesToShow = (searchDepth, datesWithTickets) => {
  if (isNaN(searchDepth))
    return console.error('searchDepth is not a number, at getDatesToShow')
  const sortedDates = datesWithTickets.sort((a, b) => b - a)
  const sortedDatesString = sortedDates.map(date => getFullDate(date))
  const uniqueDates = Array.from(new Set(sortedDatesString))
  const datesToReturn = [getFullDate(new Date())]
  for (let i = 0; i < uniqueDates.length; i++) {
    if (i > searchDepth) break
    datesToReturn.push(uniqueDates[i])
  }
  return datesToReturn
}

// Others
export const checkDuplicate = (item, arr) => {
  return arr.some(value => item === value.id)
}
