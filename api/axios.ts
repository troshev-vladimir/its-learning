import axios, { AxiosError } from 'axios'
import { CustomError } from '~/api/CustomError'
import type { ResponceError } from './types'

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
  function (error: AxiosError<ResponceError>) {
    console.log('axios interceptor', error.response)

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

    if (error.response.status === 401 || error.response.status === 403) {
      if (error.response.data.error === 'TOKEN_ERROR') {
        const access = useFetch('/api/auth/refresh')

        if (!access) {
          // logout
        } else {
          //retry
        }
      }

      return Promise.reject(
        new CustomError(
          'AUTH_ERROR',
          error.response.status,
          error.response.data
        )
      )
    }

    return Promise.reject(
      new CustomError(
        error.response.data.error,
        error.response.status,
        error.response.data
      )
    )
  }
)

export default instance
