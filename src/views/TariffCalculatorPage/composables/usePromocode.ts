import { ref } from "vue";
import { useQuasar } from "quasar";
import usePrograms from "@/views/TariffCalculatorPage/composables/usePrograms";

export default function usePromocode() {
  const $q = useQuasar();
  const loadding = ref(false);
  const promocode = ref("");
  const { updatePrograms } = usePrograms(promocode);

  const proovePromocode = async () => {
    if (!promocode.value || promocode.value.length < 6) return;

    try {
      loadding.value = true;
      await updatePrograms();
    } catch (error) {
      console.log(error);
    } finally {
      $q.notify({
        color: "green",
        position: "top",
        message: "Промокод принят",
      });
      loadding.value = false;
    }
  };

  return {
    proovePromocode,
    loadding,
    promocode,
  };
}
