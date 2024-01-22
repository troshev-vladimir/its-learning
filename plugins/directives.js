export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding, vnode) {
      document.body.addEventListener('click', (event) => {
        if (!(el == event.target || el.contains(event.target))) {
          // console.log(vnode)
          // console.log(binding)
          binding.value()
        }
      })
    },
    getSSRProps(binding, vnode) {
      return {}
    },
  })
})
