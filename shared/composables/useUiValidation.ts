export default function (
  rules?: [(...args: any) => { status: string; message: string } | void],
  value?: Ref<any>
) {
  const status = ref()
  const message = ref()

  const validate = () => {
    status.value=null
    message.value=null
    if (rules && rules?.length > 0) {
      for (let index = 0; index < rules.length; index++) {
        try {
          rules[index](value?.value)
        } catch (error: any) {
          status.value = error.status
          message.value = error.message
          break
        }
      }
    }
  }

  return { validate, status, message }
}
