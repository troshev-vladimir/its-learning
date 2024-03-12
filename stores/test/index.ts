import { api } from '~/api/bootstrap'
import type { Answers, Test } from '~/api/test'
export const useTestStore = defineStore('testStore', () => {
  const test = ref<Test>()
  const isTestLoading = ref(false)

  const isTestAvailable = computed(
    () =>
      test.value?.status && ['clear', 'in_process'].includes(test.value?.status)
  )

  const fetchTest = async (id: string) => {
    if (isTestLoading.value) return
    try {
      isTestLoading.value = true
      const resp = await api.test.getTest(id)
      test.value = resp
    } finally {
      isTestLoading.value = false
    }
  }

  const sendResults = async (answers: Answers) => {
    if (!test.value) return

    try {
      isTestLoading.value = true
      const result = await api.test.saveAnswers(test.value?.id, answers)
      makeLongPullingToFetchCource(test)
      test.value.status = 'waiting'
    } finally {
      isTestLoading.value = false
    }
  }

  return { fetchTest, test, isTestLoading, sendResults, isTestAvailable }
})

function makeLongPullingToFetchCource(test: any) {
  setTimeout(() => {
    test.value!.status = 'result'
  }, 3000)
}
