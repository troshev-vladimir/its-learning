export interface Participant {
  id: string
  name: string
  imageUrl?: string
}

export interface ChatMessage {
  type: string
  author: string
  data: { text: string; meta?: any }
  id: string
  isEdited: boolean
}

export interface Chat {
  id: string
  title?: string
  participants?: Participant[]
  messageList?: ChatMessage[]
  newMessagesCount?: number
}
