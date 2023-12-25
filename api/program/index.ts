import axios from "../axios";
import { type AxiosResponse } from "axios";
import { type Program } from "@/types/program";
import programsMock from "./mock/programs";
const event = new Event("server-error");

interface getTariffsRequest {
  promocode: string;
  id: string;
  token: string;
}

class TariffMethods {
  getPrograms(
    promocode: string,
    id: string,
    token: string
  ): Promise<Program[]> | never {
    return axios
      .get<Program[]>("programms", {
        params: {
          promocode,
          id,
          token,
        } as getTariffsRequest,
      })
      .then((response: AxiosResponse<Program[]>) => {
        if (!response.data || !response.data.length) return [];
        return response.data;
      })
      .catch((error) => {
        console.log(error);

        if (process.env.NODE_ENV !== "production") {
          return programsMock;
        }
        window.dispatchEvent(event);
        throw error;
      });
  }
}

export default new TariffMethods();
