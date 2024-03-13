<template>
  <UiExpansionItem
    :model-value="isOpen"
    class="chat-base-item base-shadow"
    :class="[isOpen ? 'open' : '']"
  >
    <template #header>
      <div class="chat-base-item__header" @click="() => (isOpen = !isOpen)">
        <div class="header__left">
          <div class="header__notification-count text-body2">12</div>
          <p class="header__message-text text-body2" :class="{ open: isOpen }">
            Сообщения
          </p>
        </div>
        <div
          class="header__toggle-block header__message-text"
          :class="{ open: isOpen }"
        >
          <p class="text-body2 text-blue">
            {{ isOpen ? 'Свернуть' : 'Развернуть' }}
          </p>
          <UiBaseIcon
            font-size="16px"
            width="16px"
            hight="16px"
            radius="4px"
            icon="fa-solid fa-chevron-down"
            :class="['header__toggle-icon', isOpen ? 'rotate' : '']"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div class="chat-base-item__content">
        <slot></slot>
      </div>
    </template>
  </UiExpansionItem>
</template>

<script lang="ts" setup>
interface Props {
  background?: 'white' | 'gray'
}
const props = withDefaults(defineProps<Props>(), {
  background: 'white',
})
const isOpen = ref(false)
const mainBackground = computed(() =>
  props.background == 'white' || !isOpen.value ? 'white' : '#f2f2f2'
)
</script>

<style lang="scss" scoped>
.chat-base-item {
  transition: all 0.2s;
  border-radius: 16px;
  width: 60px;

  @include media($bp-xs) {
    width: 100%;
  }

  &.open {
    width: 100% !important;
  }

  &__header,
  .header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-radius: 16px 16px 0 0;
    background: v-bind(mainBackground);

    &__left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__message-text {
      display: none;
      @include media($bp-xs) {
        display: block;
      }
      &.open {
        display: block !important;
      }
    }

    &__notification-count {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1000px;
      background: $red-600;
      color: $white;
    }

    &__toggle-block {
      display: none;
      align-items: center;
      gap: 8px;
      color: $blue-600;

      @include media($bp-xs) {
        display: flex;
      }
      &.open {
        display: flex !important;
      }
    }

    &__toggle-icon {
      transition: all 0.2s;
      &.rotate {
        transform: rotate(180deg);
      }
    }
  }

  &__content,
  .content {
    padding: 24px;
    border-radius: 0 0 16px 16px;
    background: v-bind(mainBackground);
  }
}
</style>
