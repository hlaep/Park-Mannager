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

export const getTicketsOfDate = (date, tickets) =>
  tickets.filte(ticket => getFullDate(ticket.exitTime) === getFullDate(date))

// Others
export const checkDuplicate = (item, arr) => {
  return arr.some(value => item === value.id)
}
