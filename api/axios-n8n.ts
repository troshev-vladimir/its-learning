import axios from 'axios'

export default axios.create({
  baseURL: 'https://n8n.itseducation.ru/webhook',
  headers: {
    Authorization: '__n8n_BLANK_VALUE_e5362baf-c777-4d57-a609-6eaf1f9e87f6',
  },
})
