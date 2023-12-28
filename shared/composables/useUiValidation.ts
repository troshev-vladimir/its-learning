export default function (
  rules?: [(...args: any) => { status: string; message: string } | void],
  value?: Ref<any>
) {
  const validate = () => {
    if (rules && rules?.length > 0) {
      for (let index = 0; index < rules.length; index++) {
        rules[index](value?.value)
      }
    }
  }

  return { validate }
}
