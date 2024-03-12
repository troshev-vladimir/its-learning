export default function useLongPollingTool(
  callBack: (stopPulling: () => void, ...args: any) => Promise<any> | any,
  pending: number // кол-во миллисекунд между запросами
) {
  const isPulling = ref(false)
  let timer: any = false

  const setPulling = async () => {
    if (timer) clearInterval(timer)
    isPulling.value = true
    await callBack(stopPulling)
    if (!isPulling.value) return // останавливаем рекурсию, если пуллинг остановлен
    timer = setTimeout(setPulling, pending)
  }

  const stopPulling = () => {
    isPulling.value = false
    if (timer) clearInterval(timer)
    timer = false
  }

  const restartPulling = () => {
    stopPulling()
    isPulling.value = true
    setPulling()
  }

  onBeforeUnmount(() => {
    stopPulling()
  })

  return { setPulling, stopPulling, restartPulling, isPulling }
}
