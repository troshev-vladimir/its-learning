<template>
  <div class="cabinet-page">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <FeatureEventCard />
      </div>
      <div class="col-12 col-md-4">
        <FeatureEventCard />
      </div>
    </div>
    <div>
      <div class="row q-col-gutter-lg items-center">
        <div class="offset-3 col-6 offset-sm-0 col-sm-4 col-md-2">
          <div class="user-photo">
            <img
              src="https://mindfulness.demo.zigzagpress.com/wp-content/uploads/sites/20/2010/08/team_02.jpg"
              alt="user"
              width="100"
            />
          </div>
        </div>

        <div class="col-12 col-sm-8 col-md-7 q-gutter-sm">
          <div class="column items-center q-gutter-sm items-sm-start">
            <p class="text-h2">Виктор Андреевич Балкин</p>
            <div class="d-flex justify-between justify-md-start">
              <p class="text-body2 q-mr-xl">Город: Киров</p>
              <p class="text-body2">Возраст: 29 лет</p>
            </div>
            <UiBaseButton
              type="boarded"
              size="small"
              @click="userProfileEdit = true"
            >
              Редактировать
            </UiBaseButton>
          </div>
        </div>
        <div class="col-12 col-md-3 justify-center justify-md-end d-flex">
          <UiBaseAverageScore class="items-center items-md-end" />
        </div>
      </div>
    </div>
    <FeatureTargetTrainingCard @start-test="() => (testPopup = true)" />
    <FeatureCourseCard />
    <FeatureCompanyPaymentCard />
  </div>
  <UiBasePopup v-model="userProfileEdit">
    <template #default="{ closeModal }">
      <FeatureUserProfile
        @submit="closeModal"
        class="base-block"
      ></FeatureUserProfile>
    </template>
  </UiBasePopup>

  <UiBasePopup v-model="testPopup" class="target-training-test">
    <template #default="{ closeModal }">
      <FeatureTest class="base-block" @submit="closeModal" />
    </template>
  </UiBasePopup>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'cabinet',
})

const route = useRoute()
route.meta.pageTitle = 'Личный кабинет'

useSeoMeta({
  title: 'Личный кабинет',
})

const userProfileEdit = ref(false)
let testPopup = ref(false)
</script>
<style lang="scss" scoped>
.cabinet-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.user-photo {
  padding-bottom: 100%;
  background: $gray-300;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
