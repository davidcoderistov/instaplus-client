import { useMemo } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { useAuthUser } from '../misc'
import { FIND_USERS_WHO_LIKED_POST } from '../../graphql/queries/post'
import { FindUsersWhoLikedPostQueryType } from '../../graphql/types/queries/post'
import { LIKE_POST } from '../../graphql/mutations/post'
import findUsersWhoLikedPostMutations from '../../apollo/mutations/post/findUsersWhoLikedPost'
import { gql } from '@apollo/client'
import { PostDetails } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useLikePost() {

    const client = useApolloClient()

    const [authUser] = useAuthUser()

    const [likePost] = useMutation(LIKE_POST)

    const addLikingUser = (postId: string) => {
        client.cache.updateQuery({
            query: FIND_USERS_WHO_LIKED_POST,
            variables: {
                postId,
            },
        }, (usersWhoLikedPost: FindUsersWhoLikedPostQueryType | null) => {
            if (usersWhoLikedPost) {
                return findUsersWhoLikedPostMutations.addLikingUser({
                    queryData: usersWhoLikedPost,
                    variables: {
                        followableUser: {
                            user: authUser,
                            following: false,
                            followingLoading: false,
                        },
                    },
                }).queryResult
            }
        })
    }

    const _likePost = useMemo(() => _debounce((postId: string) => {
        likePost({
            variables: {
                postId,
            },
        }).then(() => {
            addLikingUser(postId)
        }).catch(() => {
        })
    }, 500, { trailing: true }), [])

    return (postId: string) => {
        client.cache.updateFragment({
            id: `PostDetails:${postId}`,
            fragment: gql`
                fragment LikePostDetails on PostDetails {
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
                    liked: true,
                    likesCount: postDetails.likesCount + 1,
                    ...postDetails.likesCount < 1 && {
                        latestTwoLikeUsers: [{
                            _id: authUser._id,
                            username: authUser.username,
                        }],
                    },
                }
            }
        })
        addLikingUser(postId)
        _likePost(postId)
    }
}