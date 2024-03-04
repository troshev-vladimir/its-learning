export default function useSuggestionsLogic(
  suggestionsElement: Ref<HTMLElement>,
  mainElement: Ref<HTMLElement>,
  parent: Ref<HTMLElement> | ComputedRef<HTMLElement>
) {
  const setSuggestionPosition = () => {
    const suggestionsElementRect =
      suggestionsElement.value?.getBoundingClientRect()
    const mainElementRect = mainElement.value?.getBoundingClientRect()

    const suggestionsElementTopPosition =
      mainElementRect.top +
      mainElementRect.height +
      suggestionsElementRect.height

    if (suggestionsElementTopPosition < window.innerHeight) {
      suggestionsElement.value.style.top =
        mainElementRect.top + mainElementRect.height + 'px'
    } else {
      suggestionsElement.value.style.top =
        mainElementRect.top - suggestionsElementRect.height + 'px'
    }
    suggestionsElement.value.style.left = mainElementRect.left + 'px'
    suggestionsElement.value.style.width = mainElementRect.width + 'px'
    suggestionsElement.value.style.position = 'fixed'
  }

  const setOnParentScroll = () => {
    if (parent) parent.value?.addEventListener('scroll', setSuggestionPosition)
    window?.addEventListener('scroll', setSuggestionPosition)
  }

  const removeOnParentScroll = () => {
    if (parent)
      parent.value?.removeEventListener('scroll', setSuggestionPosition)
    window?.removeEventListener('scroll', setSuggestionPosition)
  }

  onBeforeUnmount(() => {
    removeOnParentScroll()
  })

  return { setSuggestionPosition, setOnParentScroll, removeOnParentScroll }
}
