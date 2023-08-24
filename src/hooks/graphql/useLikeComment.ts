import { useMemo, useCallback } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { useAuthUser } from '../misc'
import { FIND_COMMENTS_FOR_POST } from '../../graphql/queries/post'
import { FindCommentsForPostQueryType } from '../../graphql/types/queries/post'
import findCommentsForPostMutations from '../../apollo/mutations/post/findCommentsForPost'
import { FIND_USERS_WHO_LIKED_COMMENT } from '../../graphql/queries/post'
import { FindUsersWhoLikedCommentQueryType } from '../../graphql/types/queries/post'
import findUsersWhoLikedCommentMutations from '../../apollo/mutations/post/findUsersWhoLikedComment'
import { LIKE_COMMENT } from '../../graphql/mutations/post'
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

    return useCallback((commentId: string, postId: string) => {
        client.cache.updateQuery({
            query: FIND_COMMENTS_FOR_POST,
            variables: {
                postId,
            },
        }, (commentsForPost: FindCommentsForPostQueryType | null) => {
            if (commentsForPost) {
                return findCommentsForPostMutations.updateComment({
                    queryData: commentsForPost,
                    variables: {
                        commentId,
                        updateCb(comment: Comment): Comment {
                            return {
                                ...comment,
                                liked: true,
                                likesCount: comment.likesCount + 1,
                            }
                        },
                    },
                }).queryResult
            }
        })
        addLikingUser(commentId)
        _likeComment(commentId)
    }, [])
}