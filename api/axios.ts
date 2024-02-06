import axios from 'axios'

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
    if (error.response && error.response.status === 401) {
      if (window) {
        window.location.replace('/auth?unauthorized=true')
      }
      return Promise.reject({ data: null, message: 'unauthorized' })
    }
    return Promise.reject(error.response?.data || error.message)
  }
)

export default instance
