import { useMemo, useCallback } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useQuery } from '@apollo/client'
import { useFollowUser, useUnfollowUser } from '../../hooks/graphql'
import { FIND_USERS_WHO_LIKED_COMMENT } from '../../graphql/queries/post'
import { FindUsersWhoLikedCommentQueryType } from '../../graphql/types/queries/post'
import FollowableUsersModal from '../../lib/src/components/FollowableUsersModal'
import _differenceBy from 'lodash/differenceBy'


interface Props {
    commentId: string | null

    onCloseModal(): void
}

export default function CommentLikes(props: Props) {

    const [authUser] = useAuthUser()

    const findUsersWhoLikedComment = useQuery<FindUsersWhoLikedCommentQueryType>(FIND_USERS_WHO_LIKED_COMMENT, {
        variables: {
            cursor: null,
            limit: 10,
            commentId: props.commentId,
        },
        skip: Boolean(!props.commentId),
    })

    const users = useMemo(() => {
        if (!findUsersWhoLikedComment.loading && !findUsersWhoLikedComment.error && findUsersWhoLikedComment.data) {
            return findUsersWhoLikedComment.data.findUsersWhoLikedComment.data.map(userWhoLikedComment => ({
                id: userWhoLikedComment.user._id,
                firstName: userWhoLikedComment.user.firstName,
                lastName: userWhoLikedComment.user.lastName,
                username: userWhoLikedComment.user.username,
                photoUrl: userWhoLikedComment.user.photoUrl,
                following: userWhoLikedComment.following,
                followingLoading: userWhoLikedComment.followingLoading,
            }))
        }
        return []
    }, [findUsersWhoLikedComment.loading, findUsersWhoLikedComment.error, findUsersWhoLikedComment.data])

    const hasMoreUsers = useMemo(() => {
        if (findUsersWhoLikedComment.loading) {
            return true
        } else if (!findUsersWhoLikedComment.error && findUsersWhoLikedComment.data) {
            return Boolean(findUsersWhoLikedComment.data.findUsersWhoLikedComment.nextCursor)
        } else {
            return false
        }
    }, [findUsersWhoLikedComment.loading, findUsersWhoLikedComment.error, findUsersWhoLikedComment.data])

    const handleFetchMoreUsers = () => {
        if (findUsersWhoLikedComment.data && findUsersWhoLikedComment.data.findUsersWhoLikedComment.nextCursor) {
            findUsersWhoLikedComment.fetchMore({
                variables: {
                    cursor: {
                        _id: findUsersWhoLikedComment.data.findUsersWhoLikedComment.nextCursor._id,
                        createdAt: findUsersWhoLikedComment.data.findUsersWhoLikedComment.nextCursor.createdAt,
                    },
                },
                updateQuery(existing: FindUsersWhoLikedCommentQueryType, { fetchMoreResult }: { fetchMoreResult: FindUsersWhoLikedCommentQueryType }) {
                    return {
                        ...existing,
                        findUsersWhoLikedComment: {
                            ...fetchMoreResult.findUsersWhoLikedComment,
                            data: [
                                ...existing.findUsersWhoLikedComment.data,
                                ..._differenceBy(
                                    fetchMoreResult.findUsersWhoLikedComment.data,
                                    existing.findUsersWhoLikedComment.data,
                                    'user._id',
                                ),
                            ],
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const followUser = useFollowUser()

    const handleFollowUser = useCallback((userId: string | number) => {
        followUser(userId as string)
    }, [])

    const unfollowUser = useUnfollowUser()

    const handleUnfollowUser = useCallback((userId: string | number) => {
        unfollowUser(userId as string)
    }, [])

    const handleClickUser = useCallback((userId: string | number) => {
        // TODO: Implement method
    }, [])

    return (
        <FollowableUsersModal
            title='Likes'
            open={Boolean(props.commentId)}
            onCloseModal={props.onCloseModal}
            authUserId={authUser._id}
            users={users}
            hasMoreUsers={hasMoreUsers}
            onFetchMoreUsers={handleFetchMoreUsers}
            onFollowUser={handleFollowUser}
            onUnfollowUser={handleUnfollowUser}
            onClickUser={handleClickUser} />
    )
}