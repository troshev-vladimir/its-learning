import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

interface TippyBindingData {
  value: {
    placement: 'top' | 'right' | 'left'
    content: string
  } | null
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tippy', {
    mounted(elem: any, build: TippyBindingData) {
      tippy(elem, {
        content: build.value?.content,
        placement: build.value?.placement || 'top',
        theme: 'custom',
        interactive: true,
      })
    },
    updated(elem, build: TippyBindingData) {
      if (elem._tippy && build.value === null) {
        elem._tippy.disable()
        return
      }
      if (elem._tippy && build.value !== null) {
        elem._tippy.enable()
      }
    },
    getSSRProps(binding, vnode) {
      return {}
    },
  })
})
