import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import SuggestedUserListItem from '../SuggestedUserListItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@mui/material/CircularProgress'


interface User {
    id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl: string
    following: boolean
    followingLoading: boolean
    followedByUsernames: string[]
    followedByCount: number
}

interface Props {
    authUserId: string | number
    users: User[]
    isInitialLoading: boolean
    hasMoreUsers: boolean
    onFetchMoreUsers: () => void
    onFollowUser: (id: string | number) => void
    onUnfollowUser: (id: string | number) => void
    onClickUser: (id: string | number) => void
}

export default function SuggestedUserList(props: Props) {

    const mw640 = useMediaQuery('(min-width:640px)')

    const isInitialLoad = useRef(true)

    useEffect(() => {
        if (isInitialLoad.current && props.users.length > 0 && props.hasMoreUsers && !props.isInitialLoading) {
            props.onFetchMoreUsers()
        }
        if (isInitialLoad.current) {
            isInitialLoad.current = false
        }
    }, [props.isInitialLoading, props.users, props.hasMoreUsers, props.onFetchMoreUsers, isInitialLoad])

    return (
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
                        {props.isInitialLoading ? (
                            <Box
                                component='div'
                                display='block'
                            >
                                {[...Array(8).keys()].map(index => (
                                    <SuggestedUserListItem
                                        key={index}
                                        loading
                                    />
                                ))}
                            </Box>
                        ) : (
                            <InfiniteScroll
                                next={props.onFetchMoreUsers}
                                hasMore={props.hasMoreUsers}
                                loader={
                                    <Box
                                        component='div'
                                        display='flex'
                                        flexDirection='row'
                                        justifyContent='center'
                                        alignItems='flex-start'
                                        paddingTop='10px'
                                        height='50px'
                                    >
                                        <CircularProgress
                                            size={30}
                                            thickness={5}
                                            sx={{
                                                color: 'grey',
                                                mt: 1,
                                            }} />
                                    </Box>
                                }
                                dataLength={props.users.length}
                                scrollThreshold='95%'
                            >
                                <Box
                                    component='div'
                                    display='block'
                                >
                                    {props.users.map(user => (
                                        <SuggestedUserListItem
                                            key={user.id}
                                            authUserId={props.authUserId}
                                            user={user}
                                            onFollowUser={props.onFollowUser}
                                            onUnfollowUser={props.onUnfollowUser}
                                            onClickUser={props.onClickUser}
                                        />
                                    ))}
                                </Box>
                            </InfiniteScroll>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}