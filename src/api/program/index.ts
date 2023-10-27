import axios from "../axios";
import { Program } from "@/types/program";
const event = new Event("server-error");

interface getTariffsRequest {
  promocode: string;
}

class TariffMethods {
  getPrograms(promocode: string): Promise<Program[]> {
    return axios
      .get<Program[]>("programs", {
        params: {
          promocode,
        } as getTariffsRequest,
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

export default new TariffMethods();
