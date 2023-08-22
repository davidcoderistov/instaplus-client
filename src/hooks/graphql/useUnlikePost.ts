import { useMemo } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { useAuthUser } from '../misc'
import { FIND_USERS_WHO_LIKED_POST } from '../../graphql/queries/post'
import { FindUsersWhoLikedPostQueryType } from '../../graphql/types/queries/post'
import { UNLIKE_POST } from '../../graphql/mutations/post'
import findUsersWhoLikedPostMutations from '../../apollo/mutations/post/findUsersWhoLikedPost'
import { gql } from '@apollo/client'
import { PostDetails } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useUnlikePost() {

    const client = useApolloClient()

    const [authUser] = useAuthUser()

    const [unlikePost] = useMutation(UNLIKE_POST)

    const removeLikingUser = (postId: string) => {
        client.cache.updateQuery({
            query: FIND_USERS_WHO_LIKED_POST,
            variables: {
                postId,
            },
        }, (usersWhoLikedPost: FindUsersWhoLikedPostQueryType | null) => {
            if (usersWhoLikedPost) {
                return findUsersWhoLikedPostMutations.removeLikingUser({
                    queryData: usersWhoLikedPost,
                    variables: { userId: authUser._id },
                }).queryResult
            }
        })
    }

    const _unlikePost = useMemo(() => _debounce((postId: string) => {
        unlikePost({
            variables: {
                postId,
            },
        }).then(() => {
            removeLikingUser(postId)
        }).catch(() => {
        })
    }, 500, { trailing: true }), [])

    return (postId: string) => {
        client.cache.updateFragment({
            id: `PostDetails:${postId}`,
            fragment: gql`
                fragment UnlikePostDetails on PostDetails {
                    liked
                    likesCount
                    latestTwoLikeUsers {
                        _id
                        username
                    }
                }
            `,
        }, (postDetails: Pick<PostDetails, 'liked' | 'likesCount' | 'latestTwoLikeUsers'> | null) => {
            if (postDetails) {
                return {
                    ...postDetails,
                    liked: false,
                    likesCount: postDetails.likesCount - 1,
                    ...(postDetails.latestTwoLikeUsers.length > 1 && postDetails.latestTwoLikeUsers[0]._id === authUser._id) && {
                        latestTwoLikeUsers: postDetails.latestTwoLikeUsers.length > 1 ? [
                            postDetails.latestTwoLikeUsers[1],
                        ] : [],
                    },
                }
            }
        })
        removeLikingUser(postId)
        _unlikePost(postId)
    }
}