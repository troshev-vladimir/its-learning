import { computed, ref, defineEmits } from "vue";

export default function usePincode(emit: any) {
  const inputs = ref([]);
  const currentInput = ref(0);
  const userPin = ref([]);
  const pin = computed(() => {
    return userPin.value.reduce((acc, cur) => {
      if (!cur) return acc;
      return acc + cur;
    }, "");
  });

  const nextInput = (value: number) => {
    if (!value) {
      onClear();
      return;
    }
    if (currentInput.value === 5) {
      // emit("completed");
      return;
    }
    currentInput.value += 1;
    // @ts-ignore
    inputs.value[currentInput.value].focus();
  };

  const onFocus = () => {
    userPin.value = [];
    setTimeout(function () {
      // @ts-ignore
      inputs.value[0].focus();
    });
  };

  const onClear = () => {
    if (currentInput.value === 0) return;
    userPin.value = [];
    // @ts-ignore
    inputs.value[0].focus();
    currentInput.value -= 1;
    // @ts-ignore
    inputs.value[currentInput.value].focus();
  };

  return {
    onClear,
    onFocus,
    nextInput,
    // onInput,
    pin,
    userPin,
    currentInput,
    inputs,
  };
}
