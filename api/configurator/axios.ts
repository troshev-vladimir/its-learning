import axios from 'axios'

const username = 'REST_API'
const password = 'IPA_TSER'
// const authorizationBasic = window.btoa(username + ":" + password);

const instance = axios.create({
  baseURL: 'https://max43.ru:12233/ka_uprbase2/ru_RU/hs/education/v1',
  // process.env.NODE_ENV === "development"
  //   ? "https://max43.ru:12244/ka_uprbase2/ru_RU/hs/education/v1"
  //   : "https://max43.ru:12233/ka_uprbase2/ru_RU/hs/education/v1",

  timeout: 10000,
  // withCredentials: true,
  auth: {
    username: username,
    password: password,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Basic ' + btoa(`${username}:${password}`),
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
