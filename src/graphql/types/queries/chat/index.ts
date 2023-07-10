import { ChatWithLatestMessage } from '../../models'


export interface FindChatsForUserQueryType {
    findChatsForUser: {
        count: number
        data: ChatWithLatestMessage[]
    }
}