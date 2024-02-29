import { vMaska } from 'maska'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding, vnode) {
      document.body.addEventListener('click', (event) => {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value()
        }
      })
    },
    getSSRProps(binding, vnode) {
      return {}
    },
  })

  nuxtApp.vueApp.directive('maska', vMaska)

  return {
    provide: {
      sidebar: { isOpen: ref<boolean>(false) },
    },
  }
})
