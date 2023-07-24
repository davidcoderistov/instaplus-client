export interface User {
    _id: string
    firstName: string
    lastName: string
    username: string
    photoUrl: string | null
}

export interface AuthUser {
    user: User
    accessToken: string
}

export interface Reaction {
    _id: string
    reaction: string
    creator: User
}

interface BaseMessage {
    _id: string
    creator: {
        _id: string
        username: string
        photoUrl: string | null
    }
    text: string | null
    photoUrl: string | null
    photoOrientation: 'portrait' | 'landscape' | null
    videoUrl: string | null
    reactions: Reaction[] | null
    createdAt: number
}

export type ReplyMessage = Pick<BaseMessage, '_id' | 'creator' | 'text' | 'photoUrl' | 'photoOrientation' | 'videoUrl'>

export interface Message extends BaseMessage {
    reply: ReplyMessage | null
}

export interface Chat {
    _id: string
    creator: Pick<User, '_id' | 'username'>
    chatMembers: User[]
    selected: boolean
    temporary: boolean
}

export interface ChatWithLatestMessage {
    chat: Chat
    message: BaseMessage | null
}