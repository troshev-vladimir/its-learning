import { UserId, Candidate } from "@/types/candidate";
import axios from "../axios";
const event = new Event("server-error");

export interface candidateCreateResp {
  id: string;
  Name: string;
}

export interface candidateCreateResp {
  id: string;
  Name: string;
  Confirm: boolean;
  RegistrationDate: string;
}

class CandidateMethods {
  candidateCreate(phone: string): Promise<candidateCreateResp> {
    return axios
      .get("CandidateCreate", { params: { id: phone } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
        throw error;
      });
  }

  сandidateConfirmation(id: UserId, pin: string) {
    axios
      .put("CandidateConfirmation", { id, pin })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
        throw error;
      });
  }

  candidateUpdate(user: Candidate) {
    axios
      .put("CandidateUpdate", user)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
        throw error;
      });
  }
}

export default new CandidateMethods();
