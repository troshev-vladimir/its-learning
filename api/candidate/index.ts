import { type CandidateProgressResp, type CandidateProgressReq } from './types';
import { 
  type UserId, 
  type Candidate 
} from "~/api/candidate/types";

import axios from "../axios";
const event = new CustomEvent("server-error");
const eventWithPayload = (payload: object) => {
  return new CustomEvent("server-error", { detail: payload });
};

export interface candidateCreateResp {
  id: string;
  Name: string;
  Confirm: boolean;
  RegistrationDate: string;
  alreadyExists: boolean;
}

class CandidateMethods {
  candidateCreate(
    phone: string,
    resend: boolean = false
  ): Promise<candidateCreateResp> {
    return axios
      .post(
        "candidatecreate",
        JSON.stringify({
          id: phone,
          createnewpin: resend,
        })
      )
      .then((response) => {
        return response.data[0];
      })
      .catch((error) => {
        throw error;
      });
  }

  сandidateConfirmation(id: UserId, pin: string): Promise<Candidate> {
    return axios
      .put("candidateconfirmation", { id, pin })
      .then((response) => {
        return response.data[0];
      })
      .catch((error) => {
        throw error;
      });
  }

  candidateUpdate(user: Candidate) {
    return axios
      .put("candidateupdate", user)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
        throw error;
      });
  }

  candidateCurrentProgress(
    params: CandidateProgressReq
  ): Promise<CandidateProgressResp> {
    return axios
      .get("candidatecurrentprogress", {
        params,
      })
      .then((response) => {
        if (!response.data) return [];
        return response.data[0];
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default new CandidateMethods();
