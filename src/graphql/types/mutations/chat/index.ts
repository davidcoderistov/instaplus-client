import { ChatWithLatestMessage, Message } from '../../models'


export interface CreateChatMutationType {
    createChat: ChatWithLatestMessage
}

export interface SendMessageMutationType {
    sendMessage: Message
}