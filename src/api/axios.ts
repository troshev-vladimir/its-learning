import axios from "axios";
import { useQuasar } from "quasar";

const q = useQuasar();
const username = "";
const password = "";
const authorizationBasic = "0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6";
// const authorizationBasic = window.btoa(username + ":" + password);

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://max43.ru:12244/ka_uprbase2/ru_RU/hs/education/v1"
      : "https://max43.ru:12233/ka_uprbase2/ru_RU/hs/education/v1",

  timeout: 10000,
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

axios.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      window.dispatchEvent(
        new CustomEvent("unauthorized", {
          detail: { message: response.data.error.message },
        })
      );
    }
    return response;
  },
  function (error) {
    console.log(error, "error");
    return Promise.reject(error.response.data);
  }
);

export default instance;
