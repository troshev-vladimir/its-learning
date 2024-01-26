import type { MaskaDetail } from 'maska'

export default function useMask(emit: Function) {
  const maskOptions = {
    // onMaska: (detail: MaskaDetail) => console.log(detail),
    tokens: {
      A: { pattern: /[A-Z]/, multiple: true },
      a: { pattern: /[a-z]/, multiple: true },
      p: { pattern: /[а-яА-Я]/, multiple: true },
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

  const maskaValue = reactive<MaskaDetail>({
    masked: '',
    unmasked: '',
    completed: false,
  })

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

  return { maskOptions, onMaskahandler, maskaValue }
}
