import { ref } from "vue";
import { useQuasar } from "quasar";

export default function usePromocode() {
  const $q = useQuasar();
  const loadding = ref(false);
  const promocode = ref("");

  const proovePromocode = async () => {
    if (!promocode.value || promocode.value.length < 6) return;

    try {
      loadding.value = true;
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
