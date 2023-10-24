import axios from "axios";

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

export default instance;
