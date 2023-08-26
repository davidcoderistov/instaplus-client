import { User, UserDetails } from '../../models'


export interface FindUsersBySearchQueryQueryType {
    findUsersBySearchQuery: User[]
}

export interface FindUserDetailsQueryType {
    findUserDetails: UserDetails
}