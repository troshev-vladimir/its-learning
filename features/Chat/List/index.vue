<template>
  <div class="chat-list">
    <div class="chat-list__header">
      <p class="text-body1">ITS Education_Чаты</p>
      <UiBaseIcon
        @click="() => emit('clickClose')"
        font-size="24px"
        width="24px"
        hight="24px"
        radius="4px"
        icon="fa-solid fa-xmark"
        class="chat-list__close-icon"
      />
    </div>
    <ul class="chat-list__chats pretty-scroll">
      <li
        class="chat-list__item"
        :class="{
          unread: chat?.newMessagesCount && chat?.newMessagesCount > 0,
        }"
        v-for="(chat, index) in chats"
        :key="index"
        @click="() => emit('setChat', chat.id)"
      >
        <p v-if="chat?.title">
          {{ chat?.title }}
        </p>
        <p v-else-if="chat?.participants && chat?.participants?.length <= 2">
          {{
            chat?.participants
              .slice(0, 2)
              .map((el) => el.name)
              .join(' и ')
          }}
        </p>
        <p v-else-if="chat?.participants && chat?.participants?.length > 2">
          {{
            chat?.participants
              .slice(0, 2)
              .map((el) => el.name)
              .join(', ') + ' и другие'
          }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Chat } from '../types'

const emit = defineEmits(['clickClose', 'setChat'])
interface Props {
  chats: Chat[]
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.chat-list {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__close-icon {
    cursor: pointer;
    color: $gray-300;

    @media (hover: hover) {
      &:hover {
        color: $gray-400;
      }
    }

    &:active {
      color: $gray-600;
    }
  }

  &__chats {
    padding: 24px;
    height: 100%;
    border-radius: 8px;
    overflow: auto;
    max-height: 30vh;
    background: $white;
  }

  &__item {
    cursor: pointer;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background: $gray-100;
    }

    &.unread::after {
      content: '';
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 100px;
      background: $red-600;
    }
  }
}
</style>
