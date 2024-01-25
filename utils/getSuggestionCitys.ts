export default function (query: string) {
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
