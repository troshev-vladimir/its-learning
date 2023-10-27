import { computed, ref } from "vue";

export default function useTimer() {
  const timeToResend = 60 * 5;
  const currentTimeToResend = ref(0);
  let interval: any = null;

  const reduseTime = () => {
    if (!currentTimeToResend.value) return;
    currentTimeToResend.value -= 1;
  };

  const setTimer = () => {
    currentTimeToResend.value = timeToResend;
    if (interval) {
      window.clearInterval(interval);
    }
    interval = window.setInterval(() => {
      reduseTime();

      if (currentTimeToResend.value <= 0) {
        window.clearInterval(interval);
      }
    }, 1000);
  };

  const getTime = computed(() => {
    const minutes = Math.floor(currentTimeToResend.value / 60);
    const seconds = Math.ceil(currentTimeToResend.value % 60);

    return `${
      String(minutes).length < 2 ? "0" + String(minutes) : String(minutes)
    }: ${String(seconds).length < 2 ? "0" + String(seconds) : String(seconds)}`;
  });

  return {
    setTimer,
    getTime,
    currentTimeToResend,
  };
}
