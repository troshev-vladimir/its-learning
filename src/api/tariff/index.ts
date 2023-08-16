import axios from "../axios";
import { Tariff, Installment } from "@/types/tariff";

class TariffMethods {
  getTariffs() {
    return axios
      .get<Tariff[]>("list")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getInstallment(id: string, payment: number) {
    return axios
      .get<Installment>("installment", { params: { id, payment } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new TariffMethods();
