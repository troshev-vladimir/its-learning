// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
    {
      path: '~/features',
      extensions: ['.vue'],
      pathPrefix: true,
      prefix: 'Feature',
    },
  ],
  imports: {
    dirs: ['features/**', 'components/**'],
  },

  quasar: {
    plugins: [
      'Notify',
    ],
    config: {
      notify: {  
        position: "top",
        timeout: 2500
      },
    },
    cssAddon: true, 
    extras: {
      font: 'roboto-font',
      fontIcons: ["fontawesome-v5"] 
    },
    sassVariables: './assets/styles/quasar.variables.scss'
  },

  css: [
    'quasar/css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
})
