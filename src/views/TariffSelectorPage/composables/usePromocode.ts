import { ref } from "vue";
import promocodeApi from "@/api/promocode";
import { useQuasar } from "quasar";

export default function usePromocode() {
  const $q = useQuasar();
  const isPromocodeLegal = ref(false);
  const loadding = ref(false);
  const promocode = ref("");

  const proovePromocode = async () => {
    if (!promocode.value || promocode.value.length < 6) return;

    loadding.value = true;

    try {
      const response = await promocodeApi.prmocodeAproove(promocode.value);

      if (response) {
        isPromocodeLegal.value = true;
        $q.notify({
          color: "green",
          position: "top",
          message: "Промокод принят",
        });
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
