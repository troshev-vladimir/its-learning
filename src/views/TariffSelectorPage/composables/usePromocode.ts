import { ref } from "vue";
import promocodeApi from "@/api/promocode";
import { useQuasar } from "quasar";
import store from "@/store";
export default function usePromocode() {
  const $q = useQuasar();
  const isPromocodeLegal = ref(true);
  const loadding = ref(false);
  const promocode = ref("");

  const proovePromocode = async () => {
    if (!promocode.value || promocode.value.length < 6) return;
    loadding.value = true;

    try {
      if (!store.state.userPhone) return;
      const response = await promocodeApi.prmocodeAproove(
        promocode.value,
        store.state.userPhone
      );
      if (response) {
        isPromocodeLegal.value = true;
      } else {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Промокод не верный",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadding.value = false;
    }
  };

  return {
    isPromocodeLegal,
    proovePromocode,
    loadding,
    promocode,
  };
}
