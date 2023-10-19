import axios from "../axios";
import { Tariff, Installment } from "@/types/tariff";
const event = new Event("server-error");
const unauthorized = new Event("unauthorized");

class TariffMethods {
  getTariffs() {
    return axios
      .get<Tariff[]>("list")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
        throw error;
      });
  }

  getInstallment(
    id: string,
    payment: number,
    promocode: string,
    method: number,
    userId: string,
    token: string
  ) {
    return axios
      .get<Installment>("installment", {
        params: {
          programid: id,
          payment,
          promocode,
          method,
          id: userId,
          token,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.code === "401") {
          window.dispatchEvent(unauthorized);
        } else {
          window.dispatchEvent(event);
        }
        throw error;
      });
  }
}

export default new TariffMethods();
