import { User } from './User'


interface PostCreator extends Pick<User, 'id' | 'username' | 'photoUrl'> {
    following: boolean
    followingLoading: boolean
}

export interface Post {
    id: string | number
    description: string | null
    location: string | null
    photoUrls: string[]
    creator: PostCreator
    isLiked: boolean
    isSaved: boolean
    lastLikingMutualFollowers: (Pick<User, 'id' | 'username'> & { photoUrl: string })[] | null
    lastLikingUser: {
        id: string | number
        username: string
    } | null
    commentsCount: number
    likesCount: number
    createdAt: number
}