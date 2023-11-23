import axios from "axios";
import { useQuasar } from "quasar";

const q = useQuasar();
const username = "REST_API";
const password = "IPA_TSER";
const authorizationBasic = "0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6";
// const authorizationBasic = window.btoa(username + ":" + password);

const instance = axios.create({
  baseURL: "https://max43.ru:12233/ka_uprbase2/ru_RU/hs/education/v1",
  // process.env.NODE_ENV === "development"
  //   ? "https://max43.ru:12244/ka_uprbase2/ru_RU/hs/education/v1"
  //   : "https://max43.ru:12233/ka_uprbase2/ru_RU/hs/education/v1",

  timeout: 10000,
  // withCredentials: true,
  // auth: {
  //   username: "your-username",
  //   password: "your-password",
  // },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: "Basic " + btoa(`${username}:${password}`),
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      process.env.NODE_ENV === "development" &&
      process.env.FOR_PAGES !== "true"
    )
      return Promise.reject(error.response.data);

    if (error.response.status === 401) {
      window.dispatchEvent(
        new CustomEvent("unauthorized", {
          detail: { message: error.response.data.error.message },
        })
      );
    }
    return Promise.reject(error.response.data);
  }
);

export default instance;
