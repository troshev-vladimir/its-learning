import axios from 'axios'
import { CustomError } from './errors'

const instance = axios.create({
  baseURL: 'https://max43.ru:12233/ka_uprbase2/ru_RU/hs/education/v1',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (!error.response) {
      return Promise.reject(
        new CustomError({
          message:
            'Проблема с сетью, перезагрузите страницу или попробуйте позже',
          description: 'На транспортном уровне',
          statusCode: error.response.status,
        })
      )
    }
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      return Promise.reject(
        new CustomError({
          message: 'Не авторизован или нет доступа',
          description: '',
          statusCode: error.response.status,
        })
      )
    }
    return Promise.reject(error.response?.data || error.message)
  }
)

export default instance
