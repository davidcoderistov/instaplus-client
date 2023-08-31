import React, { useMemo, useCallback } from 'react'
import { useAuthUser, useUserDetailsNavigation } from '../../hooks/misc'
import { useQuery } from '@apollo/client'
import { FIND_SUGGESTED_USERS } from '../../graphql/queries/user'
import { FindSuggestedUsersQueryType } from '../../graphql/types/queries/user'
import { useFollowUser, useUnfollowUser } from '../../hooks/graphql'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import SuggestedUserListItem from '../../lib/src/components/SuggestedUserListItem'
import DataFallback from '../DataFallback'
import _range from 'lodash/range'


export default function SuggestedUsers() {

    const [authUser] = useAuthUser()

    const mw640 = useMediaQuery('(min-width:640px)')

    const findSuggestedUsers = useQuery<FindSuggestedUsersQueryType>(FIND_SUGGESTED_USERS)

    const suggestedUsers = useMemo(() => {
        if (!findSuggestedUsers.loading && !findSuggestedUsers.error && findSuggestedUsers.data) {
            return findSuggestedUsers.data.findSuggestedUsers.map(user => ({
                id: user.followableUser.user._id,
                username: user.followableUser.user.username,
                firstName: user.followableUser.user.firstName,
                lastName: user.followableUser.user.lastName,
                photoUrl: user.followableUser.user.photoUrl,
                following: user.followableUser.following,
                followingLoading: user.followableUser.followingLoading,
                followedByUsernames: user.latestFollower ? [user.latestFollower.username] : [],
                followedByCount: user.followersCount,
            }))
        }
        return []
    }, [findSuggestedUsers.loading, findSuggestedUsers.error, findSuggestedUsers.data])

    const followUser = useFollowUser()

    const unfollowUser = useUnfollowUser()

    const handleFollowSuggestedUser = useCallback((userId: string | number) => {
        followUser(userId as string)
    }, [])

    const handleUnfollowSuggestedUser = useCallback((userId: string | number) => {
        unfollowUser(userId as string)
    }, [])

    const navigateToUserDetails = useUserDetailsNavigation()

    const handleClickSuggestedUser = useCallback((userId: string | number) => {
        navigateToUserDetails(userId)
    }, [])

    return (
        <Box
            component='div'
            minHeight='100vh'
            width='100%'
            display='flex'
            flexDirection='column'
            sx={{
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <Box
                component='div'
                bgcolor='#000000'
                display='flex'
                flexDirection='column'
                flexGrow='1'
            >
                <Box
                    component='div'
                    alignItems='stretch'
                    border='0'
                    boxSizing='border-box'
                    display='flex'
                    flexDirection='column'
                    flexGrow='1'
                    flexShrink='0'
                    fontSize='100%'
                    margin='0 auto'
                    maxWidth='600px'
                    padding='0'
                    position='relative'
                    width='100%'
                    sx={{
                        verticalAlign: 'baseline',
                        ...mw640 && {
                            paddingBottom: '60px',
                            paddingTop: '60px',
                        },
                    }}
                >
                    {!findSuggestedUsers.error && findSuggestedUsers.data && findSuggestedUsers.data.findSuggestedUsers.length > 0 && (
                        <Box
                            component='div'
                            marginTop='16px'
                            marginBottom='12px'
                            paddingRight='12px'
                            bgcolor='transparent'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            flexShrink='0'
                            paddingLeft='12px'
                            position='static'
                            alignSelf='auto'
                            justifyContent='flex-start'
                            alignItems='flex-start'
                            flexGrow='0'
                            sx={{
                                overflowY: 'visible',
                                borderRadius: '0',
                                overflowX: 'visible',
                            }}
                        >
                            <Box
                                component='span'
                                lineHeight='20px'
                                fontSize='16px'
                                minWidth='0'
                                color='#F5F5F5'
                                fontWeight='600'
                                position='relative'
                                display='block'
                                maxWidth='100%'
                                sx={{
                                    wordWrap: 'break-word',
                                    wordBreak: 'break-word',
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                Suggested
                            </Box>
                        </Box>
                    )}
                    <Box
                        component='div'
                        paddingBottom='8px'
                        bgcolor='transparent'
                        borderRadius='0'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        flexShrink='0'
                        paddingTop='8px'
                        position='static'
                        alignItems='stretch'
                        alignSelf='auto'
                        justifyContent='flex-start'
                        flexGrow='0'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                        }}
                    >
                        <Box
                            component='div'
                            height='auto'
                            overflow='hidden'
                        >
                            <Box
                                component='div'
                                position='relative'
                                display='flex'
                                flexDirection='column'
                                paddingY='0'
                            >
                                {findSuggestedUsers.loading ? (
                                    <Box
                                        component='div'
                                        display='block'
                                    >
                                        {_range(8).map(index => (
                                            <SuggestedUserListItem
                                                key={index}
                                                loading
                                            />
                                        ))}
                                    </Box>
                                ) : (!findSuggestedUsers.error && findSuggestedUsers.data && findSuggestedUsers.data.findSuggestedUsers.length > 0) ? (
                                    <Box
                                        component='div'
                                        display='block'
                                    >
                                        {suggestedUsers.map(user => (
                                            <SuggestedUserListItem
                                                key={user.id}
                                                authUserId={authUser._id}
                                                user={user}
                                                onFollowUser={handleFollowSuggestedUser}
                                                onUnfollowUser={handleUnfollowSuggestedUser}
                                                onClickUser={handleClickSuggestedUser}
                                            />
                                        ))}
                                    </Box>
                                ) : null}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {!(!findSuggestedUsers.error && findSuggestedUsers.data && findSuggestedUsers.data.findSuggestedUsers.length > 0) && (
                    <Box
                        component='div'
                        width='100%'
                        height='100%'
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        paddingBottom='60px'
                    >
                        <DataFallback
                            title='No suggested users yet'
                            subtitle={`When there are suggested users for you, you'll see them here.`} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}