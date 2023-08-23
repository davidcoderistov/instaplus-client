import { User } from './User'


export interface Comment {
    id: string | number
    creator: Pick<User, 'id' | 'username' | 'photoUrl'>
    body: string
    postId: string | number
    isLiked: boolean
    likesCount: number
    repliesCount: number
    replies: Comment[]
    showReplies: boolean
    repliesLoading: boolean
    createdAt: number
}