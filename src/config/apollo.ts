import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
import { getStorageLoggedInUser } from '../localStorage'


const apiUri = 'http://localhost:8001/api'
const wsUrl = 'http://localhost:8001/api'

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
    },
})

const client = new ApolloClient({
    link: splitLink,
    cache,
})

export default client