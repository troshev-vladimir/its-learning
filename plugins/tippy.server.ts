import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tippy', {
    getSSRProps(binding, vnode) {
      return {}
    },
  })
})
