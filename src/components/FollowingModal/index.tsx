import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFollowUser, useUnfollowUser } from '../../hooks/graphql'
import { useAuthUser } from '../../hooks/misc'
import { useQuery } from '@apollo/client'
import { FIND_FOLLOWING_FOR_USER } from '../../graphql/queries/user'
import { FindFollowingForUserQueryType } from '../../graphql/types/queries/user'
import FollowableUsersModal from '../../lib/src/components/FollowableUsersModal'
import _differenceBy from 'lodash/differenceBy'


interface Props {
    userId: string | null

    onCloseModal(): void
}

export default function FollowingModal(props: Props) {

    const [authUser] = useAuthUser()

    const findFollowingForUser = useQuery<FindFollowingForUserQueryType>(FIND_FOLLOWING_FOR_USER, {
        variables: {
            userId: props.userId,
            limit: 10,
        },
        skip: Boolean(!props.userId),
    })

    const users = useMemo(() => {
        if (!findFollowingForUser.loading && !findFollowingForUser.error && findFollowingForUser.data) {
            return findFollowingForUser.data.findFollowingForUser.data.map(({ user, following, followingLoading }) => ({
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
    }, [findFollowingForUser.loading, findFollowingForUser.error, findFollowingForUser.data])

    const hasMoreUsers = useMemo(() => {
        if (findFollowingForUser.loading) {
            return true
        } else if (!findFollowingForUser.error && findFollowingForUser.data) {
            return Boolean(findFollowingForUser.data.findFollowingForUser.nextCursor)
        } else {
            return false
        }
    }, [findFollowingForUser.loading, findFollowingForUser.error, findFollowingForUser.data])

    const handleFetchMoreUsers = () => {
        if (findFollowingForUser.data && findFollowingForUser.data.findFollowingForUser.nextCursor) {
            findFollowingForUser.fetchMore({
                variables: {
                    cursor: {
                        _id: findFollowingForUser.data.findFollowingForUser.nextCursor._id,
                        createdAt: findFollowingForUser.data.findFollowingForUser.nextCursor.createdAt,
                    },
                },
                updateQuery(existing: FindFollowingForUserQueryType, { fetchMoreResult }: { fetchMoreResult: FindFollowingForUserQueryType }) {
                    return {
                        ...existing,
                        findFollowingForUser: {
                            ...fetchMoreResult.findFollowingForUser,
                            data: [
                                ...existing.findFollowingForUser.data,
                                ..._differenceBy(
                                    fetchMoreResult.findFollowingForUser.data,
                                    existing.findFollowingForUser.data,
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

    const navigate = useNavigate()

    const handleClickUser = (userId: string | number) => {
        navigate(`/user/${userId}`)
    }

    return (
        <FollowableUsersModal
            title='Following'
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