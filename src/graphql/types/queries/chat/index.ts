import { ChatWithLatestMessage, Message } from '../../models'


export interface FindChatsForUserQueryType {
    findChatsForUser: {
        count: number
        data: ChatWithLatestMessage[]
    }
}

export interface FindMessagesByChatIdQueryType {
    findMessagesByChatId: {
        count: number
        data: Message[]
    }
}