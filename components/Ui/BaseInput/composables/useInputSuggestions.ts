import type { WritableComputedRef } from 'vue'
import useSuggestionsLogic from '~/composables/useSuggestionsLogic'

export default function useInputSugestions(
  localValue: WritableComputedRef<string>,
  props: Record<string, any>,
  emit: Function
) {
  const baseInput = ref()
  const suggestionsElement = ref()
  const parentElement = computed(() => baseInput.value?.offsetParent)
  const { setSuggestionPosition: setSuggestionsPosition, setOnParentScroll } =
    useSuggestionsLogic(suggestionsElement, baseInput, parentElement)

  const isSuggestions = ref(false)
  const hideSuggestion = () => {
    isSuggestions.value = false
  }

  const selectSugestion = (suggestion: string) => {
    localValue.value = suggestion
    hideSuggestion()
  }

  const isSuggestionsVisible = computed(
    () =>
      isSuggestions.value && props.suggestions && props.suggestions.length > 0
  )

  onMounted(async () => {
    await nextTick()
    setOnParentScroll()
  })

  watch(
    () => isSuggestionsVisible.value,
    async (value) => {
      if (value) {
        await nextTick()
        setSuggestionsPosition()
      }
    }
  )

  return {
    isSuggestions,
    isSuggestionsVisible,
    selectSugestion,
    hideSuggestion,
    suggestionsElement,
    baseInput,
    parentElement,
  }
}
