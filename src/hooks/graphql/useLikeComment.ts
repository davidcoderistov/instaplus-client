import { useMemo } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { useAuthUser } from '../misc'
import { FIND_USERS_WHO_LIKED_COMMENT } from '../../graphql/queries/post'
import { FindUsersWhoLikedCommentQueryType } from '../../graphql/types/queries/post'
import { LIKE_COMMENT } from '../../graphql/mutations/post'
import findUsersWhoLikedCommentMutations from '../../apollo/mutations/post/findUsersWhoLikedComment'
import { gql } from '@apollo/client'
import { Comment } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useLikeComment() {

    const client = useApolloClient()

    const [authUser] = useAuthUser()

    const [likeComment] = useMutation(LIKE_COMMENT)

    const addLikingUser = (commentId: string) => {
        client.cache.updateQuery({
            query: FIND_USERS_WHO_LIKED_COMMENT,
            variables: {
                commentId,
            },
        }, (usersWhoLikedComment: FindUsersWhoLikedCommentQueryType | null) => {
            if (usersWhoLikedComment) {
                return findUsersWhoLikedCommentMutations.addLikingUser({
                    queryData: usersWhoLikedComment,
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

    const _likeComment = useMemo(() => _debounce((commentId: string) => {
        likeComment({
            variables: {
                commentId,
            },
        }).then(() => {
            addLikingUser(commentId)
        }).catch(() => {
        })
    }, 500, { trailing: true }), [])

    return (commentId: string) => {
        client.cache.updateFragment({
            id: `Comment:${commentId}`,
            fragment: gql`
                fragment LikeComment on Comment {
                    liked
                    likesCount
                }
            `,
        }, (comment: Pick<Comment, 'liked' | 'likesCount'> | null) => {
            if (comment) {
                return {
                    ...comment,
                    liked: true,
                    likesCount: comment.likesCount + 1,
                }
            }
        })
        addLikingUser(commentId)
        _likeComment(commentId)
    }
}