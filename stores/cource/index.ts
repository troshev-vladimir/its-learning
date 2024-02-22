import { api } from '~/api/bootstrap'
import type { CourceFull, CourcePreview } from '~/api/cource'
export const useCourceStore = defineStore('courceStore', () => {
  const cource = ref<CourceFull>()
  const courcePreview = ref<CourcePreview>()

  const hasChanges = ref(true)
  const isCourceLoadding = ref(false)

  const fetchCource = async () => {
    isCourceLoadding.value = true
    const resp = await api.cource.getCource('1')
    cource.value = resp
    hasChanges.value = false
    isCourceLoadding.value = false
  }

  const fetchCourcePreview = async () => {
    isCourceLoadding.value = true
    const resp = await api.cource.getCourcePreview('1')
    console.log(resp)

    courcePreview.value = resp
    hasChanges.value = false
    isCourceLoadding.value = false
  }

  function $reset() {
    cource.value = undefined
    hasChanges.value = true
  }

  return {
    cource,
    isCourceLoadding,
    courcePreview,
    fetchCourcePreview,
    hasChanges,
    fetchCource,
    $reset,
  }
})
