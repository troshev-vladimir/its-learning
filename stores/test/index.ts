import { api } from '~/api/bootstrap'
import type { Answers, Test } from '~/api/test'
export const useTestStore = defineStore('testStore', () => {
  const test = ref<Test>()
  const isTestLoadding = ref(false)

  const fetchTest = async (id: string) => {
    if (isTestLoadding.value) return
    try {
      isTestLoadding.value = true
      const resp = await api.test.getTest(id)
      test.value = resp
    } finally {
      isTestLoadding.value = false
    }
  }

  const sendResults = async (answers: Answers) => {
    if (!test.value) return

    try {
      isTestLoadding.value = true
      const result = await api.test.saveAnswers(test.value?.id, answers)
      makeLongPullingToFetchCource(test)
      test.value.status = 'waiting'
    } finally {
      isTestLoadding.value = false
    }
  }

  return { fetchTest, test, isTestLoadding, sendResults }
})

function makeLongPullingToFetchCource(test: any) {
  setTimeout(() => {
    test.value!.status = 'result'
  }, 3000)
}
