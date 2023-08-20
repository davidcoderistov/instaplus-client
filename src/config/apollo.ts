import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
import { getStorageLoggedInUser } from '../localStorage'


const apiUri = 'http://localhost:8001/api'
const wsUrl = 'ws://localhost:8001/api'

const httpLink = createHttpLink({
    uri: apiUri,
    credentials: 'include',
})

const uploadLink = createUploadLink({
    uri: apiUri,
    headers: {
        'Apollo-Require-Preflight': 'true',
    },
}) as unknown as ApolloLink

const authLink = new ApolloLink((operation, forward) => {
    const user = getStorageLoggedInUser()

    operation.setContext({
        headers: {
            authorization: user?.accessToken ? `Bearer ${user.accessToken}` : '',
        },
    })

    return forward(operation)
})

const wsLink = new GraphQLWsLink(createClient({
    url: wsUrl,
    connectionParams: () => ({
        accessToken: getStorageLoggedInUser()?.accessToken,
    }),
}))

const splitLink = split(
    operation => operation.getContext().hasUpload,
    authLink.concat(uploadLink),
    split(
        ({ query }) => {
            const definition = getMainDefinition(query)
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            )
        },
        wsLink,
        authLink.concat(httpLink),
    ),
)

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                findChatsForUser: {
                    keyArgs: false,
                },
                findMessagesByChatId: {
                    keyArgs: ['chatId'],
                },
                findDailyNotifications: {
                    keyArgs: false,
                },
                findWeeklyNotifications: {
                    keyArgs: false,
                },
                findMonthlyNotifications: {
                    keyArgs: false,
                },
                findEarlierNotifications: {
                    keyArgs: false,
                },
                findSearchHistory: {
                    merge(_, incoming) {
                        return incoming
                    },
                },
                findFollowedUsersPosts: {
                    keyArgs: false,
                },
                findUsersWhoLikedPost: {
                    keyArgs: ['postId'],
                },
            },
        },
        Chat: {
            fields: {
                selected: {
                    read(selected = false) {
                        return selected
                    },
                },
                temporary: {
                    read(temporary = false) {
                        return temporary
                    },
                },
            },
        },
        NextCursor: {
            keyFields: false,
        },
        UserSearch: {
            keyFields: (userSearchStoreObject) => {
                const userSearch = userSearchStoreObject as unknown as {
                    __typename: string,
                    searchUser: { user: { __ref: string } } | null
                    hashtag: { __ref: string } | null
                }
                if (userSearch.searchUser) {
                    const parts = userSearch.searchUser.user.__ref.split(':')
                    if (parts.length > 1) {
                        return `${userSearch.__typename}:${parts[1]}`
                    }
                } else if (userSearch.hashtag) {
                    const parts = userSearch.hashtag.__ref.split(':')
                    if (parts.length > 1) {
                        return `${userSearch.__typename}:${parts[1]}`
                    }
                }
                return undefined
            },
        },
        FollowableUser: {
            keyFields: (followableUserStoreObject) => {
                const followableUser = followableUserStoreObject as unknown as {
                    __typename: string,
                    user: { __ref: string }
                }
                const parts = followableUser.user.__ref.split(':')
                if (parts.length > 1) {
                    return `${followableUser.__typename}:${parts[1]}`
                }
                return undefined
            },
            fields: {
                followingLoading: {
                    read(followingLoading = false) {
                        return followingLoading
                    },
                },
            },
        },
    },
})

const client = new ApolloClient({
    link: splitLink,
    cache,
})

export default client