export function formatNumber(number: number) {
  return Intl.NumberFormat('ru-RU').format(number)
}

export function emailValidate(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export function getErrorMessage(field: any) {
  if (field.$errors && field.$errors.length) {
    return field.$errors[0].$message
  }

  return ''
}
