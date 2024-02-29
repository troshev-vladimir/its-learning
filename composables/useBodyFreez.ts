export default function useBodyFreez(value: Ref<boolean>) {
  const bodyFreez = () => {
    document.body.style.top = `-${window.scrollY}px`
    document.body.classList.add('freez')
  }

  const bodyFreezRemove = () => {
    const scrollY = document.body.style.top
    document.body.classList.remove('freez')
    document.body.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }

  const stopWatch = ref()

  const startBodyFreez = () => {
    stopBodyFreez()
    const stop = watch(
      value,
      () => {
        if (value.value === true) {
          bodyFreez()
        } else {
          bodyFreezRemove()
        }
      },
      { immediate: true }
    )
    stopWatch.value = stop
  }

  const stopBodyFreez = () => {
    if (stopWatch.value) {
      stopWatch.value()
    }
    bodyFreezRemove()
  }

  onMounted(() => {
    startBodyFreez()
  })

  onBeforeRouteLeave(() => {
    bodyFreezRemove()
  })

  return {
    bodyFreez,
    bodyFreezRemove,
    startBodyFreez,
    stopBodyFreez,
  }
}
