import { ChatWithLatestMessage, Message } from '../../models'


export interface FindChatsForUserQueryType {
    findChatsForUser: {
        hasNext: boolean
        data: ChatWithLatestMessage[]
    }
}

export interface FindMessagesByChatIdQueryType {
    findMessagesByChatId: {
        hasNext: boolean
        data: Message[]
    }
}