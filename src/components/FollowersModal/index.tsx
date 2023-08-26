import { useMemo } from 'react'
import { useFollowUser, useUnfollowUser } from '../../hooks/graphql'
import { useAuthUser, useUserDetailsNavigation } from '../../hooks/misc'
import { useQuery } from '@apollo/client'
import { FIND_FOLLOWERS_FOR_USER } from '../../graphql/queries/user'
import { FindFollowersForUserQueryType } from '../../graphql/types/queries/user'
import FollowableUsersModal from '../../lib/src/components/FollowableUsersModal'
import _differenceBy from 'lodash/differenceBy'


interface Props {
    userId: string | null

    onCloseModal(): void
}

export default function FollowersModal(props: Props) {

    const [authUser] = useAuthUser()

    const findFollowersForUser = useQuery<FindFollowersForUserQueryType>(FIND_FOLLOWERS_FOR_USER, {
        variables: {
            userId: props.userId,
            limit: 10,
        },
        skip: Boolean(!props.userId),
    })

    const users = useMemo(() => {
        if (!findFollowersForUser.loading && !findFollowersForUser.error && findFollowersForUser.data) {
            return findFollowersForUser.data.findFollowersForUser.data.map(({ user, following, followingLoading }) => ({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                photoUrl: user.photoUrl,
                following,
                followingLoading,
            }))
        }
        return []
    }, [findFollowersForUser.loading, findFollowersForUser.error, findFollowersForUser.data])

    const hasMoreUsers = useMemo(() => {
        if (findFollowersForUser.loading) {
            return true
        } else if (!findFollowersForUser.error && findFollowersForUser.data) {
            return Boolean(findFollowersForUser.data.findFollowersForUser.nextCursor)
        } else {
            return false
        }
    }, [findFollowersForUser.loading, findFollowersForUser.error, findFollowersForUser.data])

    const handleFetchMoreUsers = () => {
        if (findFollowersForUser.data && findFollowersForUser.data.findFollowersForUser.nextCursor) {
            findFollowersForUser.fetchMore({
                variables: {
                    cursor: {
                        _id: findFollowersForUser.data.findFollowersForUser.nextCursor._id,
                        createdAt: findFollowersForUser.data.findFollowersForUser.nextCursor.createdAt,
                    },
                },
                updateQuery(existing: FindFollowersForUserQueryType, { fetchMoreResult }: { fetchMoreResult: FindFollowersForUserQueryType }) {
                    return {
                        ...existing,
                        findFollowersForUser: {
                            ...fetchMoreResult.findFollowersForUser,
                            data: [
                                ...existing.findFollowersForUser.data,
                                ..._differenceBy(
                                    fetchMoreResult.findFollowersForUser.data,
                                    existing.findFollowersForUser.data,
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

    const handleFollowUser = (userId: string | number) => {
        followUser(userId as string)
    }

    const unfollowUser = useUnfollowUser()

    const handleUnfollowUser = (userId: string | number) => {
        unfollowUser(userId as string)
    }

    const navigate = useUserDetailsNavigation()

    const handleClickUser = (userId: string | number) => {
        navigate(userId)
    }

    return (
        <FollowableUsersModal
            title='Followers'
            open={Boolean(props.userId)}
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