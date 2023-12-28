export function required(value?: string | number) {
  if (value == null || (typeof value == 'string' && value.length <= 0))
    throw { status: 'error', message: 'Обязательно для заполнения' }
}
