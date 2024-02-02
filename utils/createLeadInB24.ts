import axios from '~/api/configurator/axios'

export default function b24LeadCreate() {
  if (localStorage.getItem('leadWasCreated')) return

  axios
    .get(
      'https://itsportal.bitrix24.ru/rest/706/gc1c0iz28zvqxvlk/crm.lead.add.json',
      {
        params: {
          'fields[NAME]': localStorage.getItem('userName'),
          'fields[TITLE]':
            'ITS Learning перешёл в конфигуратор НЕ ТРОГАЙТЕ плиз',
          'fields[PHONE][N0][VALUE]': localStorage.getItem('userPhone'),
          'fields[EMAIL][N0][VALUE]': localStorage.getItem('userEmail'),
          'fields[EMAIL][0][VALUE_TYPE]': 'WORK',
          'fields[ASSIGNED_BY_ID]': 664,
          'fields[OPPORTUNITY]': localStorage.getItem('userMany'),
        },
      }
    )
    .then(() => {
      localStorage.setItem('leadWasCreated', 'true')
    })
    .catch((error) => {
      console.log(error)
    })
}
