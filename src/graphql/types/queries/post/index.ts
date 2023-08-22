import { Hashtag, PostDetails, FollowableUser, Comment } from '../../models'
import { NextCursor } from '../../../../types'


export interface FindHashtagsBySearchQueryQueryType {
    findHashtagsBySearchQuery: Hashtag[]
}

export interface FindFollowedUsersPostsQueryType {
    findFollowedUsersPosts: {
        nextCursor: NextCursor | null
        data: PostDetails[]
    }
}

export interface FindUsersWhoLikedPostQueryType {
    findUsersWhoLikedPost: {
        nextCursor: NextCursor | null
        data: FollowableUser[]
    }
}

export interface FindCommentsForPost {
    findCommentsForPost: {
        data: Comment[]
        count: number
    }
}