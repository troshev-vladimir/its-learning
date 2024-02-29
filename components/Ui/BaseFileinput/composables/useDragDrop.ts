import { ref } from 'vue'
export default function useDragDrop() {
  const isDraging = ref(false)

  const dragFileInput = () => {
    isDraging.value = true
  }

  const dragEndFileInput = () => {
    isDraging.value = false
  }

  return {
    isDraging,
    dragFileInput,
    dragEndFileInput,
  }
}
