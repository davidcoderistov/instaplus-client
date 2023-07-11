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

export interface Message {
    _id: string
    creator: User
    text: string | null
    photoUrl: string | null
    videoUrl: string | null
    createdAt: number
}

export interface Chat {
    _id: string
    creator: Pick<User, '_id' | 'username'>
    chatMembers: User[]
    selected: boolean
}

export interface ChatWithLatestMessage {
    chat: Chat
    message: Message
}