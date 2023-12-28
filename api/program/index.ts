import axios from '../axios'
import type { AxiosResponse } from 'axios'
import type { Program } from '~/api/program/types'
import type { getProgramsRequest } from './types'
class Programm {
  getAll(params: getProgramsRequest): Promise<Program[]> | never {
    return axios
      .get<Program[]>('programms', {
        params,
      })
      .then((response: AxiosResponse<Program[]>) => {
        if (!response.data || !response.data.length) return []
        return response.data
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
  }
}

export default new Programm()
