import { Program } from "@/types/program";
import { Card } from "../types";
import { Ref, computed } from "vue";
export default function useConstants() {
  const currentProgram = computed((): Card | null => {
    return null;
  });

  return {
    instalmentOptions,
    currentProgram,
  };
}

const instalmentOptions = [3, 6, 24];
