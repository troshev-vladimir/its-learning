import axios from "../axios";
const event = new Event("server-error");

class PrmocodeMethods {
  prmocodeAproove(promocode: string) {
    return axios
      .get("tildapromo", {
        params: {
          promo: promocode,
        },
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

export default new PrmocodeMethods();
