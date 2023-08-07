import { Hashtag, PostDetails } from '../../models'
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