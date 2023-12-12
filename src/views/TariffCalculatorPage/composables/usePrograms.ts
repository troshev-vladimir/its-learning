import { Ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Program } from "@/types/program";

export default function usePrograms(promocode: Ref) {
  const store = useStore();
  const programs = computed<Program[]>(() => store.state.programs.programs);

  const updatePrograms = () => {
    store.dispatch("programs/fetchPrograms", promocode.value);
  };

  onMounted(() => {
    store.dispatch("programs/fetchPrograms", promocode.value);
  });

  return { programs, updatePrograms };
}
