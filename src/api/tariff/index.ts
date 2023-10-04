import axios from "../axios";
import { Tariff, Installment } from "@/types/tariff";
const event = new Event("server-error");

class TariffMethods {
  getTariffs() {
    return axios
      .get<Tariff[]>("list")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
      });
  }

  getInstallment(id: string, payment: number) {
    return axios
      .get<Installment>("installment", { params: { id, payment } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.dispatchEvent(event);
      });
  }
}

export default new TariffMethods();
