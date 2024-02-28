<template>
  <NuxtLayout>
    <div id="popups-container"></div>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <notifications position="top right" class="base-notification-wrapper">
      <template #body="props">
        <div class="base-notification base-shadow" :class="[props.item.type]">
          <p
            v-if="props.item.title"
            class="text-bold"
            :class="{
              'text-red-600': props.item.type === 'error',
              'text-yellow-400': props.item.type === 'warn',
            }"
          >
            {{ props.item.title }}
          </p>
          <p
            v-else-if="props.item.type === 'error'"
            class="text-bold text-red-600"
          >
            Ошибка
          </p>
          <p
            v-else-if="props.item.type === 'warn'"
            class="text-bold text-yellow"
          >
            Предупреждение
          </p>

          <div v-if="props.item.text" v-html="props.item.text" />

          <nuxt-link v-if="props.item.data.auth" to="/auth">
            <UiBaseButton size="small" type="boarded">
              Авторизоваться
            </UiBaseButton>
          </nuxt-link>
        </div>
      </template>
    </notifications>
  </ClientOnly>
</template>

<script lang="ts" setup>
import '~/assets/styles/main.scss'
import useConfiguratorUserStore from './stores/configurator/user'
import { notify } from '@kyvg/vue3-notification'
import axiosInstance from '~/api/axios'
import { checkTokenExpValid } from '~/utils/checkTokenExpValid'

const $q = useQuasar()
const router = useRouter()
const configuratorUserStore = useConfiguratorUserStore()

// --- Мутируем конфиг Axios что бы авторизация улетала во всех запросах. тут для того что бы на сервере тоже работало
const userSotre = useUserStore()
const { accessToken } = storeToRefs(userSotre)
axiosInstance.interceptors.request.use(
  async function (config) {
    const isTokenFresh = checkTokenExpValid(userSotre.accessToken)

    if (!isTokenFresh) {
      const { data } = await useFetch('/api/auth/refresh')
      accessToken.value = data.value as string
    }

    config.headers.Authorization = 'Bearer ' + userSotre.accessToken
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// -----------------------

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

onMounted(async () => {
  window.addEventListener('server-error', errorHandler)
  window.addEventListener('unauthorized', unauthorisedHandler)

  configuratorUserStore.userId = localStorage.getItem('userPhone') || ''
  configuratorUserStore.userToken = localStorage.getItem('userToken') || ''
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
    {
      children:
        process.env.NODE_ENV === 'production'
          ? `
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
      })()`
          : '',
    },
  ],
})
</script>

<style lang="scss">
.vue-notification-wrapper {
  overflow: visible !important;
}
.base-notification {
  margin-top: 8px;
  border-left: 3px solid $blue-600;
  background: $white;
  padding: 24px;
  overflow: visible;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  row-gap: 8px;

  &.warn {
    border-color: $yellow-400;
  }
  &.error {
    border-color: $red-600;
  }
}
</style>
~/utils/checkTokenExpValid
