import { type CandidateProgressResp, type CandidateProgressReq } from './types'
import { type UserId, type Candidate } from '~/api/candidate/types'

import axios from '../axios'
import type { UTMs } from '~/stores/user'

export interface candidateCreateResp {
  id: string
  Name: string
  Confirm: boolean
  RegistrationDate: string
  alreadyExists: boolean
}

class CandidateMethods {
  candidateCreate(
    phone: string,
    resend: boolean = false
  ): Promise<candidateCreateResp> {
    return axios
      .post(
        'candidatecreate',
        JSON.stringify({
          id: phone,
          createnewpin: resend,
        })
      )
      .then((response) => {
        return response.data[0]
      })
      .catch((error) => {
        throw error
      })
  }

  сandidateConfirmation(
    id: UserId,
    pin: string,
    utm?: UTMs
  ): Promise<Candidate> {
    return axios
      .put('candidateconfirmation', {
        id,
        pin,
        utm,
      })
      .then((response) => {
        return response.data[0]
      })
      .catch((error) => {
        throw error
      })
  }

  candidateUpdate(user: Candidate) {
    return axios
      .put('candidateupdate', user)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }

  candidateCurrentProgress(
    params: CandidateProgressReq
  ): Promise<CandidateProgressResp> {
    return axios
      .get('candidatecurrentprogress', {
        params,
      })
      .then((response) => {
        if (!response.data) return []
        return response.data[0]
      })
      .catch((error) => {
        throw error
      })
  }
}

export default new CandidateMethods()
