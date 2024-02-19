import axios from 'axios'
import { CustomError } from '~/api/CustomError'

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
        new CustomError(
          'HTTP_ERROR',
          400,
          error.response,
          'Проблема с сетью, перезагрузите страницу или попробуйте позже'
        )
      )
    }

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      return Promise.reject(
        new CustomError('AUTH_ERROR', error.response.status, {})
      )
    }

    return Promise.reject(
      new CustomError(error.response.err, error.response.status, {})
    )
  }
)

export default instance
