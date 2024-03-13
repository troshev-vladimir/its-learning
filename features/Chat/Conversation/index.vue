<template>
  <div class="chat-conversation" v-if="chat">
    <div class="chat-conversation__header">
      <div
        class="header__tab"
        :class="{
          'new-messages': chat?.newMessagesCount && chat?.newMessagesCount > 0,
        }"
        v-if="chat?.title"
      >
        {{ chat?.title }}
      </div>
      <div
        class="header__tab"
        :class="{
          'new-messages': chat?.newMessagesCount && chat?.newMessagesCount > 0,
        }"
        v-else-if="chat?.participants && chat?.participants.length <= 2"
      >
        {{
          chat?.participants
            .slice(0, 2)
            .map((el) => el.name)
            .join(' и ')
        }}
      </div>
      <div
        class="header__tab"
        :class="{
          'new-messages': chat?.newMessagesCount && chat?.newMessagesCount > 0,
        }"
        v-else-if="chat?.participants && chat?.participants.length > 2"
      >
        {{
          chat?.participants
            .slice(0, 2)
            .map((el) => el.name)
            .join(', ') + ' и другие'
        }}
      </div>
      <UiBaseIcon
        class="chat-conversation__close-icon"
        icon="fa-solid fa-ellipsis"
        @click="() => emit('clickEllipsis')"
      />
    </div>
    <beautiful-chat
      :participants="chat.participants"
      :title-image-url="chatOptions.titleImageUrl"
      :on-message-was-sent="onMessageWasSent"
      :message-list="chat.messageList"
      :new-messages-count="chat.newMessagesCount"
      :is-open="chatOptions.isChatOpen"
      :close="closeChat"
      :open="openChat"
      :show-emoji="false"
      :show-file="true"
      :show-edition="true"
      :show-deletion="false"
      :deletion-confirmation="true"
      :show-launcher="false"
      :show-close-button="false"
      :colors="chatOptions.colors"
      :always-scroll-to-bottom="chatOptions.alwaysScrollToBottom"
      :disable-user-list-toggle="false"
      :message-styling="chatOptions.messageStyling"
      @on-type="handleOnType"
      @edit="editMessage"
      class="chat-conversation__chat"
    >
      <template #header> <div></div></template>
    </beautiful-chat>
    <!-- :show-typing-indicator="chatOptions?.showTypingIndicator" -->
  </div>
</template>

<script lang="ts" setup>
import type { Chat } from '../types'

interface Props {
  chat?: Chat
}

const emit = defineEmits(['clickEllipsis', 'update:chat'])
const props = defineProps<Props>()
const chatOptions = ref({
  titleImageUrl: null,
  messageList: [
    {
      type: 'text',
      author: `me`,
      data: { text: `Say yes!`, meta: '12:43' },
      id: 1,
      isEdited: false,
    },
    {
      type: 'text',
      author: `user1`,
      data: { text: `No.` },
      id: 2,
      isEdited: false,
    },
  ],
  newMessagesCount: 0,
  isChatOpen: true,
  colors: {
    header: {
      bg: '#f2f2f2',
      text: '#171717',
    },
    launcher: {
      bg: '#4e8cff',
    },
    messageList: {
      bg: '#f2f2f2',
    },
    sentMessage: {
      bg: '#5ca2e9',
      text: '#ffffff',
    },
    receivedMessage: {
      bg: '#ffffff',
      text: '#222222',
    },
    userInput: {
      bg: '#f4f7f9',
      text: '#565867',
    },
  },
  alwaysScrollToBottom: false,
  messageStyling: true,
})
const sendMessage = (text: any) => {
  if (text.length > 0) {
    onMessageWasSent({
      author: 'support',
      type: 'text',
      data: { text },
    })
  }
}
const onMessageWasSent = (message: any) => {
  if (props.chat?.messageList) {
    let chat = { ...props.chat }
    chat.messageList = [...props.chat?.messageList, message]
    emit('update:chat', chat)
    return
  }
  emit('update:chat', [message])
}
const openChat = () => {
  chatOptions.value.isChatOpen = true
  chatOptions.value.newMessagesCount = 0
}
const closeChat = () => {
  chatOptions.value.isChatOpen = false
}
const handleScrollToTop = () => {}
const handleOnType = () => {
  console.log('Emit typing event')
}
const editMessage = (message: any) => {
  const m = chatOptions.value.messageList.find((m) => m.id === message.id)
  if (!m) return
  m.isEdited = true
  m.data.text = message.data.text
}
</script>

<style lang="scss">
.chat-conversation {
  &__close-icon {
    cursor: pointer;
    color: $gray-900;

    @media (hover: hover) {
      &:hover {
        color: $gray-600;
      }
    }

    &:active {
      color: $gray-800;
    }
  }

  &__header,
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__tab {
      display: flex;
      gap: 8px;
      align-items: center;
      width: fit-content;
      padding: 8px 16px;
      border-radius: 8px 8px 0 0;
      background: $gray-100;

      &.new-messages::after {
        content: '';
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 100px;
        background: $red;
      }
    }
  }

  &__chat {
    .sc-chat-window {
      position: relative !important;
      bottom: 0 !important;
      right: 0 !important;
      box-shadow: none !important;
      width: 100%;

      * {
        font-family: 'Gogh' !important;
      }
    }

    .sc-header {
      display: none;
    }

    .sc-message {
      width: 100%;
      padding: 10px;
    }
  }
}
</style>
