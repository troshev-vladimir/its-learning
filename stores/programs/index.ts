import { type Program } from '@/types/program';
import { defineStore } from 'pinia'
import getPrograms from '~/api/program'

const useProgramsStore = defineStore('programs', {
  state: () => {
    return {
      programs: [] as Program[]
    }
  },

  actions: {
    async fetchPrograms () {
      try {
        return await getPrograms
      } catch (error) {
        console.log(error);
      }
    }
  }

})

export default useProgramsStore
