import { computed, ref } from "vue";

export default function usePincode() {
  const inputs = ref([]);
  const currentInput = ref(0);
  const userPin = ref([]);

  const pin = computed(() => {
    return userPin.value.reduce((acc, cur) => {
      if (!cur) return acc;
      return acc + cur;
    }, "");
  });

  const onInput = (value) => {
    if (value.split("").length > 1) {
      const val = value.split("").pop();
      value = "";
      value = val;
      console.log(val);
      userPin.value[currentInput.value] = "";
      userPin.value[currentInput.value] = val;
    }
  };

  const nextInput = (value) => {
    if (!value) {
      onClear();
      return;
    }
    if (currentInput.value === 3) return;
    currentInput.value += 1;
    inputs.value[currentInput.value].focus();
  };

  const onFocus = () => {
    userPin.value = [];
    inputs.value[0].focus();
  };

  const onClear = () => {
    if (currentInput.value === 0) return;
    userPin.value = [];
    inputs.value[0].focus();
    currentInput.value -= 1;
    inputs.value[currentInput.value].focus();
  };

  return {
    onClear,
    onFocus,
    nextInput,
    onInput,
    pin,
    userPin,
    currentInput,
    inputs,
  };
}
