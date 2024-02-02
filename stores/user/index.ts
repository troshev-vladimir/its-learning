const useUserStore = defineStore('userStore', {
  state: () => ({
    name: '',
  }),
  actions: {
    async fetch() {
      const user: User = await $fetch('https://api.nuxt.com/modules/pinia')
      this.name = user.name
    },
  },
})
export default useUserStore
