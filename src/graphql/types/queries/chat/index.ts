import { ChatWithLatestMessage, Message } from '../../models'
import { NextCursor } from '../../../../types'


export interface FindChatsForUserQueryType {
    findChatsForUser: {
        nextCursor: NextCursor | null
        data: ChatWithLatestMessage[]
    }
}

export interface FindMessagesByChatIdQueryType {
    findMessagesByChatId: {
        nextCursor: NextCursor | null
        data: Message[]
    }
}

export interface FindUnreadMessagesCountForUserQueryType {
    findUnreadMessagesCountForUser: {
        chatsIds: string[]
        count: number
    }
}