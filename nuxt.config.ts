// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['nuxt-quasar-ui', '@pinia/nuxt'],

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
    {
      path: '~/widgets',
      extensions: ['.vue'],
      pathPrefix: true,
      prefix: 'Widget',
    },
  ],
  imports: {
    dirs: ['features/**', 'components/**', 'widgets/**'],
  },

  quasar: {
    plugins: ['Notify'],
    config: {
      notify: {
        position: 'top',
        timeout: 2500,
      },
    },
    cssAddon: true,
    extras: {
      font: 'roboto-font',
      fontIcons: ['fontawesome-v5'],
    },
    sassVariables: './assets/styles/quasar.variables.scss',
  },

  plugins: [
    '~/plugins/directives.ts',
    '~/plugins/font-awesome.ts',
    '~/plugins/vue-date-picker.client.ts',
  ],

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  css: ['quasar/css', '@fortawesome/fontawesome-svg-core/styles.css'],

  routeRules: {
    '/course/1/description': { prerender: true },
    // '/api/*': { cache: { maxAge: 60 * 60 } },
    // '/old-page': {
    //   redirect: { to: '/new-page', statusCode: 302 },
    // },
  },
  typescript: {
    typeCheck: true,
  },
})
