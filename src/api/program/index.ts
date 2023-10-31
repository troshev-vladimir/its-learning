import axios from "../axios";
import { Program } from "@/types/program";
import programsMock from "./mock/programs";
const event = new Event("server-error");

interface getTariffsRequest {
  promocode: string;
}

class TariffMethods {
  getPrograms(
    promocode: string,
    id: string,
    token: string
  ): Promise<Program[]> {
    return axios
      .get<Program[]>("programms", {
        params: {
          promocode,
          id,
          token,
        } as getTariffsRequest,
      })
      .then((response) => {
        if (!response.data || !response.data.length) throw new Error();
        return response.data;
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") return programsMock;
        window.dispatchEvent(event);
        throw error;
      });
  }
}

export default new TariffMethods();
