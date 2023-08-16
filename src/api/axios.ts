import axios from "axios";

const instance = axios.create({
  baseURL: "http://max43.ru:8333/ka_uprbase/hs/education/v1/",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

export default instance;
