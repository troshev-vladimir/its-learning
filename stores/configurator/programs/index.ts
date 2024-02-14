import { type Program } from '~/api/program/types'
import { defineStore } from 'pinia'
import Programs from '~/api/program'
import type { getProgramsRequest } from '~/api/program/types'

const useProgramsStore = defineStore('programs', () => {
  const programs = ref<Program[]>([])

  async function fetchPrograms(params: getProgramsRequest) {
    try {
      const programsResp = await Programs.getAll(params)
      programs.value = programsResp
      return programsResp
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return {
    fetchPrograms,
    programs,
  }
})

export default useProgramsStore
