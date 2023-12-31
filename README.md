### [ec2-16-171-240-55.eu-north-1.compute.amazonaws.com:3000](http://ec2-51-20-77-48.eu-north-1.compute.amazonaws.com:3000/)

[Instaplus Demo](https://github.com/davidcoderistov/instaplus-client/assets/85624034/d7e07724-21d3-461b-b3a5-e39580840a21)

<p align="center">
  <img alt="Tech Stack" src="https://skillicons.dev/icons?i=ts,react,css,materialui,graphql,apollo,docker,aws&perline=8" />
</p>

## Core Features

Instaplus Client offers a range of core features designed to provide a seamless and engaging user experience:

- **State Management with Apollo Client:** Efficiently manages application state using [Apollo Client](https://www.apollographql.com/docs/react/) to seamlessly handle data fetching, caching, and updates.

- **Component Library Integration:** Enhances UI development by integrating both [Material UI](https://mui.com/) and [Instaplus UI Toolkit](https://github.com/davidcoderistov/instaplus-ui-toolkit) components.

- **JWT Authentication:** Utilizes [access and refresh tokens](https://jwt.io/) for secure user authentication.

- **Recommendation Engine:** Suggests users and posts through a [collaborative filtering algorithm](https://en.wikipedia.org/wiki/Collaborative_filtering), enhancing content discovery.

- **Real-time Messaging:** Provides instant messaging capabilities using [GraphQL subscriptions](https://graphql.org/) for real-time updates and interactive communication.

- **Cloudinary Integration:** Leverages [Cloudinary](https://cloudinary.com/) cloud storage for media management and storage.
  
- **Docker Containerization:** Streamlines deployment and ensures consistent environments across various stages of development and production using [Docker](https://www.docker.com/).
  
- **AWS EC2 Deployment:** Hosted on [Amazon Web Services (AWS) Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/) instances for scalability and reliability.

## Apollo Client Configuration

The client is configured using multiple links to handle various aspects of communication:

- **HTTP Link:** Standard HTTP link for executing queries and mutations.

- **Auth Link:** Manages user authentication and sets authorization headers.

- **Upload Link:** Handles file uploads with preflight checks.

- **WebSocket Link:** Enables real-time messaging and subscriptions via WebSockets.

```javascript
const apiUri = process.env.REACT_APP_API_URL as string
const wsUrl = process.env.REACT_APP_WS_URL as string

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
```

## Contact

If you want to contact me you can reach me at [davidcoderistov@gmail.com](mailto:davidcoderistov@gmail.com).
