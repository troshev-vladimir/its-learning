export default function useMultyBlock(v$: any, form: any) {
  const deleteOneOfBlock = (blockName: string, index: number) => {
    form[blockName].splice(index, 1)
    v$.value[blockName].$reset()
  }

  const getExpirienceForm = () => {
    return {
      startDate: '',
      endDate: '',
      tillNow: false,
      company: '',
      position: '',
      responsibilitys: '',
    }
  }

  const getEducationForm = () => {
    return {
      degree: [],
      releaseYear: '',
      instityte: '',
      faculty: '',
      specialisation: '',
    }
  }

  const addExpirienceBlock = async () => {
    const isFormCorrect = await v$.value.experience.$validate()
    if (!isFormCorrect) return
    form.experience.push(getExpirienceForm())
  }

  const addEducationBlock = async () => {
    const isFormCorrect = await v$.value.education.$validate()
    console.log(isFormCorrect)

    if (!isFormCorrect) return
    form.education.push(getEducationForm())
  }

  return {
    deleteOneOfBlock,
    getExpirienceForm,
    getEducationForm,
    addExpirienceBlock,
    addEducationBlock,
  }
}
