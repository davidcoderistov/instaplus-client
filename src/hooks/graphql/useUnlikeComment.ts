import { useMemo } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { useAuthUser } from '../misc'
import { FIND_USERS_WHO_LIKED_COMMENT } from '../../graphql/queries/post'
import { FindUsersWhoLikedCommentQueryType } from '../../graphql/types/queries/post'
import { UNLIKE_COMMENT } from '../../graphql/mutations/post'
import findUsersWhoLikedCommentMutations from '../../apollo/mutations/post/findUsersWhoLikedComment'
import { gql } from '@apollo/client'
import { Comment } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useUnlikeComment() {

    const client = useApolloClient()

    const [authUser] = useAuthUser()

    const [unlikeComment] = useMutation(UNLIKE_COMMENT)

    const removeLikingUser = (commentId: string) => {
        client.cache.updateQuery({
            query: FIND_USERS_WHO_LIKED_COMMENT,
            variables: {
                commentId,
            },
        }, (usersWhoLikedComment: FindUsersWhoLikedCommentQueryType | null) => {
            if (usersWhoLikedComment) {
                return findUsersWhoLikedCommentMutations.removeLikingUser({
                    queryData: usersWhoLikedComment,
                    variables: { userId: authUser._id },
                }).queryResult
            }
        })
    }

    const _unlikeComment = useMemo(() => _debounce((commentId: string) => {
        unlikeComment({
            variables: {
                commentId,
            },
        }).then(() => {
            removeLikingUser(commentId)
        }).catch(() => {
        })
    }, 500, { trailing: true }), [])

    return (commentId: string) => {
        client.cache.updateFragment({
            id: `Comment:${commentId}`,
            fragment: gql`
                fragment UnlikeComment on Comment {
                    liked
                    likesCount
                }
            `,
        }, (comment: Pick<Comment, 'liked' | 'likesCount'> | null) => {
            if (comment) {
                return {
                    ...comment,
                    liked: false,
                    likesCount: comment.likesCount - 1,
                }
            }
        })
        removeLikingUser(commentId)
        _unlikeComment(commentId)
    }
}