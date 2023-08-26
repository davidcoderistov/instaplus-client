export interface User {
    _id: string
    firstName: string
    lastName: string
    username: string
    photoUrl: string | null
}

export interface FollowableUser {
    user: User
    following: boolean
    followingLoading: boolean
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
    previewPhotoUrl: string | null
    seenByUserIds: string[]
    videoUrl: string | null
    reactions: Reaction[] | null
    createdAt: number
}

export type ReplyMessage = Pick<BaseMessage, '_id' | 'creator' | 'text' | 'photoUrl' | 'photoOrientation' | 'videoUrl' | 'previewPhotoUrl'>

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
    message: Message | null
}

export interface Post {
    _id: string
    photoUrls: string[]
    caption: string | null
    location: string | null
    creator: FollowableUser
    createdAt: number
}

export interface PostDetails {
    _id: string
    post: Post
    liked: boolean
    saved: boolean
    commentsCount: number
    likesCount: number
    latestTwoLikeUsers: Pick<User, '_id' | 'username'>[]
    latestThreeFollowedLikeUsers: Pick<User, '_id' | 'photoUrl'>[]
}

export interface Notification {
    _id: string
    type: 'follow' | 'like' | 'comment'
    post: Pick<Post, '_id' | 'photoUrls'> | null
    latestUsers: Pick<User, '_id' | 'username' | 'photoUrl'>[]
    usersCount: number
    createdAt: number
}

export interface Hashtag {
    _id: string
    name: string
    postIds: string[]
}

export interface SearchUser {
    user: User
    latestFollower: Pick<User, '_id' | 'username'> | null
    followersCount: number
}

export interface UserSearch {
    searchUser: SearchUser | null
    hashtag: Hashtag | null
}

export interface Comment {
    _id: string
    text: string
    creator: Pick<User, '_id' | 'username' | 'photoUrl'>
    postId: string
    liked: boolean
    likesCount: number
    repliesCount: number
    replies: Comment[]
    showReplies: boolean
    repliesLoading: boolean
    createdAt: number
}

export interface UserDetails {
    followableUser: FollowableUser
    postsCount: number
    followingCount: number
    followersCount: number
    mutualFollowersCount: number
    latestTwoMutualFollowersUsernames: string[]
}