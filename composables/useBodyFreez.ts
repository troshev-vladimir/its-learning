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

  const stop = watch(value, () => {
    if (value.value) {
      bodyFreez()
    } else {
      bodyFreezRemove()
    }
  })

  return { bodyFreez, bodyFreezRemove, stop }
}
