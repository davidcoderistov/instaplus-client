interface BaseMessage {
    id: string | number
    creator: {
        id: string | number
        username: string
        photoUrl?: string | null
    }
    text: string | null
    photoUrl: string | null
    photoOrientation: 'portrait' | 'landscape' | null
    videoUrl: string | null
    reactions: {
        items: string[]
        count: number
    } | null
    createdAt: number
}

export type ReplyMessage = Pick<BaseMessage, 'id' | 'creator' | 'text' | 'photoUrl' | 'photoOrientation' | 'videoUrl'>

export interface Message extends BaseMessage {
    reply: ReplyMessage | null
}

