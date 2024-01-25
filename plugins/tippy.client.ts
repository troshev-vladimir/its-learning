import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tippy', {
    mounted(el: any, build: any) {
      if (el && build.value) {
        tippy(el, {
          content: build.value,
          theme: 'custom',
        })
      }
    },

    getSSRProps(binding, vnode) {
      return {}
    },
  })
})
