<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import '~/assets/styles/main.scss'
import useUserStore from './stores/user'

const $q = useQuasar()
const router = useRouter()
const userStore = useUserStore()

function errorHandler(e: any) {
  $q.notify({
    color: 'negative',
    position: 'top',
    message: e.detail?.message || 'Что то пошло не так',
  })
}

function unauthorisedHandler() {
  router.push({ name: 'auth' })
  localStorage.removeItem('userToken')
}
onMounted(() => {
  window.addEventListener('server-error', errorHandler)
  window.addEventListener('unauthorized', unauthorisedHandler)

  userStore.userId = localStorage.getItem('userPhone') || ''
  userStore.userToken = localStorage.getItem('userToken') || ''
})

onBeforeUnmount(() => {
  window.removeEventListener('server-error', errorHandler)
  window.removeEventListener('unauthorized', unauthorisedHandler)
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ITS Education` : 'ITS Education'
  },

  script: [
    { src: '/metrics/vk.js' },
    {
      children: `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      console.log('yandexyandex')

      ym(96214885, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
      });


      !(function () {
        var t = document.createElement('script')
        ;(t.type = 'text/javascript'),
          (t.async = !0),
          (t.src = 'https://vk.com/js/api/openapi.js?169'),
          (t.onload = function () {
            VK.Retargeting.Init('VK-RTRG-1844653-4Bofz'), VK.Retargeting.Hit()
          }),
          console.log('vk vkvkvk')
        document.head.appendChild(t)
      })()

      `,
    },
  ],
})
</script>
