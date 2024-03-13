<template>
  <FeatureChatBaseItem :background="mainView == 'chat' ? 'white' : 'gray'">
    <template #default>
      <transition name="fade" mode="out-in" :duration="200">
        <FeatureChatList
          :chats="chatsPreview"
          v-if="mainView == 'list'"
          @click-close="onCloseChatList"
          @set-chat="setChat"
        />
        <FeatureChatConversation
          :chat="mainChat"
          @update:chat="setChatInfo"
          v-else-if="mainView == 'chat'"
          @click-ellipsis="() => (mainView = 'list')"
        />
      </transition>
    </template>
  </FeatureChatBaseItem>
</template>

<script lang="ts" setup>
import type { Chat } from '~/features/Chat/types'
const mainView = ref<'list' | 'chat'>('list')

const mainChatId = ref<string>()

const mainChat = computed(() =>
  chats.value.find((el) => el.id == mainChatId.value)
)

const setChatInfo = (chatValue: Chat) => {
  let chatIndex = chats.value.findIndex((el) => el.id == mainChatId.value)
  if (chatIndex > -1) chats.value[chatIndex] = chatValue
}

const chats = ref<Chat[]>([
  {
    id: '1',
    participants: [
      {
        id: 'user1',
        name: 'Matteo',
        imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4',
      },
      {
        id: 'user2',
        name: 'Support',
        imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4',
      },
      {
        id: 'user2',
        name: 'Support',
        imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4',
      },
    ],
    messageList: [
      {
        type: 'text',
        author: `me`,
        data: { text: `Say yes!`, meta: '12:43' },
        id: '1',
        isEdited: false,
      },
      {
        type: 'text',
        author: `user1`,
        data: { text: `No.` },
        id: '2',
        isEdited: false,
      },
    ],
    newMessagesCount: 0,
  },
  {
    id: '2',
    title: 'Наименование чата',
    participants: [
      {
        id: 'user3',
        name: 'Matteo',
        imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4',
      },
      {
        id: 'user4',
        name: 'Support',
        imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4',
      },
    ],
    messageList: [
      {
        type: 'text',
        author: `me`,
        data: { text: `Hi!`, meta: '12:43' },
        id: '1',
        isEdited: false,
      },
      {
        type: 'text',
        author: `user1`,
        data: { text: `Hi!` },
        id: '2',
        isEdited: false,
      },
    ],
    newMessagesCount: 0,
  },
])

const chatsPreview: Chat[] = [
  {
    id: '1',
    participants: [
      {
        id: 'user3',
        name: 'Matteo',
        imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4',
      },
      {
        id: 'user4',
        name: 'Support',
        imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4',
      },
      {
        id: 'user2',
        name: 'Support',
        imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4',
      },
    ],
  },
  {
    id: '2',
    title: 'Наименование чата',
  },
]

const setChat = (chatId: string) => {
  mainChatId.value = chatId
  mainView.value = 'chat'
}

const onCloseChatList = () => {
  if (!mainChat.value) {
    mainChatId.value = chats.value[0].id
  }

  mainView.value = 'chat'
}
</script>

<style lang="scss"></style>
