import { ref } from "vue";

export default function usePromocode() {
  const isPromocodeLegal = ref(false);
  const loadding = ref(false);
  const promocode = ref("");

  const proovePromocode = () => {
    loadding.value = true;
    setTimeout(() => {
      isPromocodeLegal.value = true;
      loadding.value = false;
    }, 1000);
  };

  return {
    isPromocodeLegal,
    proovePromocode,
    loadding,
    promocode,
  };
}
