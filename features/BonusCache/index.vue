<template>
  <div class="container q-mb-lg">
    <div class="q-mt-md flex">
      <h2 class="text-h2 q-mb-md">Потратить заработанное</h2>
      <div
        class="flex wrap items-center full-width q-mb-lg"
        style="gap: 16px"
      >
        <TimerComponent
          :expiration-date="userStore.userBonus?.finalsteptime"
          style="flex: 0 0 auto"
          class="shadow-2"
        />
        <p>
          Твой заработок хранится 24 часa.
          <br />Не упусти свой шанс.
        </p>
      </div>
      <div
        class="flex wrap items-start full-width q-mb-sm"
        style="gap: 16px"
      >
        <CashCounter
          class="shadow-2"
          :amount="userStore.userBonus?.sum || 0"
        />
        <q-chip
          v-if="userStore.userBonus?.promodiscount"
          outline
          color="green"
          text-color="white"
          icon="fas fa-chevron-down"
          class="q-mt-sm self-center"
        >Промокод принят</q-chip>
        <UiInput
          v-else
          label="Ввести промокод"
          color="primary"
          class="ui-input"
          no-error-icon
          outlined
        >
          <template #before>
            <q-icon
              name="fas fa-check"
              color="green-5"
            />
          </template>
        </UiInput>
      </div>
      <p class="text-body2 text-secondary">
        Подробней о правилах подсчёта бонусов читай
        <a
          class="text-accent"
          href="https://drive.google.com/file/d/1plR7AYYlzmD26AJ-P_nxkmjeiHzirqol/view?usp=share_link"
          target="_blank"
        >тут</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useUserStore from "~/stores/user";
  const userStore = useUserStore();

  const { data: user, error } = useAsyncData("user", async () => {
    return await userStore.getUserBonus();
  });

  onMounted(() => {
    userStore.getUserBonus(); // TODO: How to auth on server
  });
</script>

<style>
</style>
