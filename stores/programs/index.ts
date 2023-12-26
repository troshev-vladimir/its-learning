import { type Program } from '~/api/program/types';
import { defineStore } from 'pinia'
import Programs from '~/api/program'

const useProgramsStore = defineStore('programs',() => {
  const programs = ref<Program[]>([])
  
  async function fetchPrograms () {
    try {
      const programsResp = await Programs.getAll('','79048628369', 'HOU6nPVBXp87rOQBHESr7gtCCugecQNH')
      programs.value = programsResp
      return programsResp
    } catch (error) {
      console.log(error);
      return []
    }
  }

  return {
    fetchPrograms,
    programs
  }

})

export default useProgramsStore