//max43.ru:8333/ka_uprbase/hs/education/v1/PromoGet?id={id}&promo={promo}
import axios from "../axios";
const event = new Event("server-error");
export interface candidateCreateResp {
  id: string;
  Name: string;
}

class PrmocodeMethods {
  prmocodeAproove(promocode: string, id: string) {
    return axios
      .get("promoget", {
        params: {
          promo: promocode,
          id,
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
