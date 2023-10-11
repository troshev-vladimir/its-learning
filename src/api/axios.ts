import axios from "axios";

// const username = "Администратор";
const username =
  "%D0%90%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%BE%D1%80";
const password = "asd";
const authorizationBasic = window.btoa(username + ":" + password);

const instance = axios.create({
  baseURL: "https://max43.ru:8333/ka_uprbase2/ru_RU/hs/education/v1/",

  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Basic " + authorizationBasic,
  },
});

export default instance;
