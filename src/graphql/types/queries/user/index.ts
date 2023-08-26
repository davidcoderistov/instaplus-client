import { User, UserDetails, FollowableUser } from '../../models'
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