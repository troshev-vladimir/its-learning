import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Program } from "@/types/program";

export default function usePrograms() {
  const store = useStore();
  const programs = computed<Program[]>(() => store.state.programs.programs);

  store.dispatch("programs/fetchPrograms");

  return { programs };
}
