<template>
  <div v-if="!isLoading" class="user-profile row q-col-gutter-lg items-center">
    <div class="offset-3 col-6 offset-sm-0 col-sm-4 col-md-2">
      <div class="user-photo">
        <img
          :src="user.photoUrl"
          :alt="user.name + ' ' + user.thirdname"
          width="100"
        />
      </div>
    </div>

    <div class="col-12 col-sm-8 col-md-7 q-gutter-sm">
      <div class="column items-center q-gutter-sm items-sm-start">
        <h2 class="text-h2">
          <span style="text-transform: capitalize">
            {{ user.name + ' ' + user.thirdname + ' ' + user.surname }}
          </span>
        </h2>
        <div class="d-flex justify-between justify-md-start">
          <p class="text-body2 q-mr-xl">Город: {{ user.city }}</p>
          <p class="text-body2">Возраст: {{ user.age }}</p>
        </div>
        <EditProfileButton />
      </div>
    </div>
    <div class="col-12 col-md-3 justify-center justify-md-end d-flex">
      <UiBaseAverageScore class="items-center items-md-end" />
    </div>
  </div>
  <WidgetUserProfileSkeleton v-else />
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import { abort } from '~/api/user'

const abortRequest = () => {
  abort()
}
import EditProfileButton from './EditProfileButton/index.vue'

const userStore = useUserStore()
const { user, isUserLoadding } = storeToRefs(userStore)

const isLoading = ref(false)
</script>

<style lang="scss" scoped>
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
