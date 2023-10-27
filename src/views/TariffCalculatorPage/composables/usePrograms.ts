import store from "@/store";
import { ref } from "vue";

export default function usePrograms() {
  const promocode = ref("");

  store.dispatch("tariff/fetchPrograms");

  return { promocode };
}
