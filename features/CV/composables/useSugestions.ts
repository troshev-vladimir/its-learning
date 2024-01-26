import { ref } from 'vue'

export default function useSugestions() {
  const citys = ref<string[]>([])
  const companies = ref<string[]>([])
  const timer = ref<number>()
  const resetTimer = (cb: Function) => {
    timer.value = setTimeout(cb, 1000)
  }

  const sugestCity = async (value: string) => {
    const cb = async () => (citys.value = await getCitySuggestion(value))

    if (!timer) {
      try {
        cb()
      } catch (error) {
        companies.value = []
      }
    } else {
      resetTimer(cb)
    }
  }

  const sugestCompany = async (value: string) => {
    try {
      companies.value = await getCompanySuggestion(value)
    } catch (error) {
      companies.value = []
    }
  }
  return {
    citys,
    companies,
    sugestCity,
    sugestCompany,
  }
}

export function getCitySuggestion(query: string) {
  const url =
    'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
  const token = '3015b65404c060dcc9aacd5732122a53d87d1294'

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ query: query }),
  }

  return fetch(url, options)
    .then((response) => response.json())
    .then((result) =>
      result.suggestions.map((el: any) => {
        return el.value
      })
    )
    .catch((error) => console.log('error', error))
}

export function getCompanySuggestion(query: string) {
  const url =
    'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
  const token = '3015b65404c060dcc9aacd5732122a53d87d1294'

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ query: query }),
  }

  return fetch(url, options)
    .then((response) => response.json())
    .then((result) =>
      result.suggestions.map((el: any) => {
        return el.value
      })
    )
    .catch((error) => console.log('error', error))
}
