<template>
  <section>
    <div class="q-mb-xl">
      <div class="row">
        <div
          v-for="card in prpgramsStore.programs"
          :key="card.id"
          class="col-12"
        >
          <ClientOnly>
            <ProgramCard :card="card" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useProgramsStore from '~/stores/configurator/programs'
import useUserStore from '~/stores/configurator/user'
const prpgramsStore = useProgramsStore()
const userStore = useUserStore()
const { userPromocode } = storeToRefs(userStore)

// const { data: programs, error } = await useAsyncData(`programs`, () => {
//   return prpgramsStore.fetchPrograms();
// });

const fetchPrograms = () => {
  prpgramsStore.fetchPrograms({
    promocode: userStore.userPromocode,
    id: userStore.userId,
    token: userStore.userToken,
  })
}

watch(userPromocode, () => {
  fetchPrograms()
})

onMounted(() => {
  fetchPrograms()
})
</script>

<style></style>
