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
}

class CandidateMethods {
  candidateCreate(phone: string): Promise<candidateCreateResp> {
    // .post(
    //   "candidatecreate",
    //   JSON.stringify({
    //     id: phone,
    //   }),
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //     },
    //   }
    // )
    return fetch(
      "https://max43.ru:12233/ka_uprbase2/ru_RU/hs/education/v1/candidatecreate",
      {
        method: "POST",
        body: JSON.stringify({
          id: phone,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
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
