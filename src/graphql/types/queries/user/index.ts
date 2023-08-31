import { User, UserDetails, FollowableUser, SuggestedUser } from '../../models'
import { NextCursor } from '../../../../types'


export interface FindUsersBySearchQueryQueryType {
    findUsersBySearchQuery: User[]
}

export interface FindUserDetailsQueryType {
    findUserDetails: UserDetails
}

export interface FindFollowersForUserQueryType {
    findFollowersForUser: {
        data: FollowableUser[]
        nextCursor: NextCursor
    }
}

export interface FindFollowingForUserQueryType {
    findFollowingForUser: {
        data: FollowableUser[]
        nextCursor: NextCursor
    }
}

export interface FindSuggestedUsersQueryType {
    findSuggestedUsers: SuggestedUser[]
}