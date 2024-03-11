import type { MaskaDetail } from 'maska'

export default function useMask(props: Record<string, any>) {
  const isMaskCompleted = ref(false)
  const unmaskedValue = ref('')

  const maskOptions = {
    onMaska: (detail: MaskaDetail) => {
      isMaskCompleted.value = detail.completed
      unmaskedValue.value = detail.unmasked
    },
    mask: props.mask,
    tokens: {
      A: { pattern: /[A-Z]/, multiple: true },
      a: { pattern: /[a-z]/, multiple: true },
      // p: { pattern: /[а-я]/, multiple: true },
      N: { pattern: /[0-9]/, multiple: true },
      // N: {
      //   pattern: /[A-Z]/,
      //   multiple: true,
      //   transform: (chr: string) => {
      //     return chr
      //   },
      // },
    },

    // postProcess: (value: string) => {
    //   console.log(value)

    //   return value
    // },
  }

  const onMaskahandler = (event: CustomEvent<MaskaDetail>) => {
    // console.log({
    //   masked: event.detail.masked,
    //   unmasked: event.detail.unmasked,
    //   completed: event.detail.completed,
    // })

    if (event.detail.completed) {
      console.log(event.detail.unmasked)
    }
  }

  return { maskOptions, onMaskahandler, isMaskCompleted, unmaskedValue }
}
