type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium') {
  return new Date(date).toLocaleDateString('en-US', { dateStyle })
}