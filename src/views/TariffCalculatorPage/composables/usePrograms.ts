import { Ref, computed } from "vue";
import { useStore } from "vuex";
import { Program } from "@/types/program";

export default function usePrograms(promocode: Ref) {
  const store = useStore();
  const programs = computed<Program[]>(() => store.state.programs.programs);

  store.dispatch("programs/fetchPrograms", promocode.value);

  return { programs };
}
