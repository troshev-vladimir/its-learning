import { computed, ref, defineEmits, watch } from "vue";

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

  watch(pin, (value) => {
    if (value.length === 6) {
      emit("completed");
      setTimeout(() => {
        // @ts-ignore
        inputs.value[currentInput.value].blur();
      });
    }
  });

  const nextInput = (value: number) => {
    if (!value) {
      onClear();
      return;
    }
    if (currentInput.value === 5) {
      return;
    }
    currentInput.value += 1;

    setTimeout(() => {
      // @ts-ignore
      inputs.value[currentInput.value].focus();
    });
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
    clear();
  };

  const clear = () => {
    userPin.value = [];
    // @ts-ignore
    setTimeout(function () {
      // @ts-ignore
      inputs.value[0].focus();
    });
    currentInput.value = 0;
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
    clear,
  };
}
