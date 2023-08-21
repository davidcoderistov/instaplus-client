import { useMemo, useCallback } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useQuery } from '@apollo/client'
import { useFollowUser, useUnfollowUser } from '../../hooks/graphql'
import { FIND_USERS_WHO_LIKED_POST } from '../../graphql/queries/post'
import { FindUsersWhoLikedPostQueryType } from '../../graphql/types/queries/post'
import FollowableUsersModal from '../../lib/src/components/FollowableUsersModal'
import _differenceBy from 'lodash/differenceBy'


interface Props {
    postId: string | null

    onCloseModal(): void
}

export default function PostLikes(props: Props) {

    const [authUser] = useAuthUser()

    const findUsersWhoLikedPost = useQuery<FindUsersWhoLikedPostQueryType>(FIND_USERS_WHO_LIKED_POST, {
        variables: {
            cursor: null,
            limit: 10,
            postId: props.postId,
        },
        skip: Boolean(!props.postId),
    })

    const users = useMemo(() => {
        if (!findUsersWhoLikedPost.loading && !findUsersWhoLikedPost.error && findUsersWhoLikedPost.data) {
            return findUsersWhoLikedPost.data.findUsersWhoLikedPost.data.map(userWhoLikedPost => ({
                id: userWhoLikedPost.user._id,
                firstName: userWhoLikedPost.user.firstName,
                lastName: userWhoLikedPost.user.lastName,
                username: userWhoLikedPost.user.username,
                photoUrl: userWhoLikedPost.user.photoUrl,
                following: userWhoLikedPost.following,
                followingLoading: userWhoLikedPost.followingLoading,
            }))
        }
        return []
    }, [findUsersWhoLikedPost.loading, findUsersWhoLikedPost.error, findUsersWhoLikedPost.data])

    const hasMoreUsers = useMemo(() => {
        if (!findUsersWhoLikedPost.loading && !findUsersWhoLikedPost.error && findUsersWhoLikedPost.data) {
            return Boolean(findUsersWhoLikedPost.data.findUsersWhoLikedPost.nextCursor)
        }
        return false
    }, [findUsersWhoLikedPost.loading, findUsersWhoLikedPost.error, findUsersWhoLikedPost.data])

    const handleFetchMoreUsers = () => {
        if (findUsersWhoLikedPost.data && findUsersWhoLikedPost.data.findUsersWhoLikedPost.nextCursor) {
            findUsersWhoLikedPost.fetchMore({
                variables: {
                    cursor: {
                        _id: findUsersWhoLikedPost.data.findUsersWhoLikedPost.nextCursor._id,
                        createdAt: findUsersWhoLikedPost.data.findUsersWhoLikedPost.nextCursor.createdAt,
                    },
                },
                updateQuery(existing: FindUsersWhoLikedPostQueryType, { fetchMoreResult }: { fetchMoreResult: FindUsersWhoLikedPostQueryType }) {
                    return {
                        ...existing,
                        findUsersWhoLikedPost: {
                            ...fetchMoreResult.findUsersWhoLikedPost,
                            data: [
                                ...existing.findUsersWhoLikedPost.data,
                                ..._differenceBy(
                                    fetchMoreResult.findUsersWhoLikedPost.data,
                                    existing.findUsersWhoLikedPost.data,
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
            open={Boolean(props.postId)}
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