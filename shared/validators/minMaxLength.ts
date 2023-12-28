export function minMaxLength(minLength: number, maxLength: number) {
  return (value: string | [any]) => {
    if (value.length >= minLength && value.length <= maxLength) return

    if (minLength == maxLength) {
      throw {
        status: 'error',
        message: `Длина значения минимум ${minLength} символов`,
      }
    } else {
      throw {
        status: 'error',
        message: `Длина значения должна состоять не менее ${minLength} и не более ${maxLength}`,
      }
    }
  }
}
