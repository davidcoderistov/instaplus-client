import { Hashtag, PostDetails, FollowableUser } from '../../models'
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