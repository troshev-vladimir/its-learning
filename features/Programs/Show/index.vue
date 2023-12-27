<template>
  <section>

    <div class="q-mb-xl">
      <div class="container">
        <div class="row">
          <div
            v-for="card in programs"
            :key="card.id"
            class="col-12"
          >
            <ProgramCard :card="card" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import b24LeadCreate from "~/utils/createLeadInB24";
  import useProgramsStore from "~/stores/programs";
  const prpgramsStore = useProgramsStore();

  const promocode = ref("");

  const { data: programs, error } = await useAsyncData(`programs`, () => {
    return prpgramsStore.fetchPrograms();
  });

  onMounted(() => {
    prpgramsStore.fetchPrograms();
  });
</script>

<style></style>
