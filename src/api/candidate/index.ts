import { UserId, Candidate } from "@/types/candidate";
import axios from "../axios";
import store from "@/store";
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
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  сandidateConfirmation(id: UserId, pin: string) {
    return axios
      .put("candidateconfirmation", { id, pin })
      .then((response) => {
        store.commit("setUserToken", response.data.token);
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
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
    id: string,
    token: string,
    programPromocode: string
  ): any {
    return axios
      .get("candidatecurrentprogress", {
        params: { id, token, promo: programPromocode },
      })
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
