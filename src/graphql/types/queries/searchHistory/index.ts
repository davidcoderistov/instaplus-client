import { UserSearch } from '../../models'


export interface FindUserSearchesBySearchQueryQueryType {
    findUserSearchesBySearchQuery: UserSearch[]
}

export interface FindSearchHistoryQueryType {
    findSearchHistory: UserSearch[]
}