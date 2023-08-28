export const format_currency = (currency: number) => new Intl.NumberFormat('de-DE').format(currency)

export const calculate_discount = (price: number, priceBeforDiscount: number) =>
  Math.ceil(100 - (price * 100) / priceBeforDiscount)

export const createSlug = (item_name: string, item_id: string) => {
  return (
    item_name
      .replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
      .replace(/ /g, '-') +
    '-id,' +
    item_id
  )
}

export const joinPathQuery = (query: Object) => {
  return Object.entries(query)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}

export const splitDate = (iso: string) => {
  const [yyyy, mm, dd, hh, mi] = iso.split(/[/:\-T]/)
  return `${hh}:${mi} ${dd}-${mm}-${yyyy}`
}
