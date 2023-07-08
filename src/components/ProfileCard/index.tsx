import { useCallback } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import MediaGallery from '../MediaGallery'
import Button from '../Button'
import Skeleton from '@mui/material/Skeleton'
import Stats from './Stats'
import FollowingButton from '../FollowingButton'


interface StaticProps {
    loading?: never
    user: {
        id: string | number
        username: string
        firstName: string
        lastName: string
        photoUrl?: string | null
        following: boolean
        followingLoading: boolean
    }
    postsCount: number
    followersCount: number
    followingCount: number
    posts: {
        id: string | number
        photoUrl: string
    }[]

    onClickUser(id: string | number): void

    onMessageUser(id: string | number): void

    onFollowUser(id: string | number): void

    onUnfollowUser(id: string | number): void

    onClickPost(id: string | number): void
}

interface LoadingProps {
    loading: true
    user?: never
    postsCount?: never
    followersCount?: never
    followingCount?: never
    posts?: never

    onClickUser?: never

    onMessageUser?: never

    onFollowUser?: never

    onUnfollowUser?: never

    onClickPost?: never
}

type Props = StaticProps | LoadingProps

export default function ProfileCard(props: Props) {

    const handleClickUser = useCallback(() => {
        if (!props.loading) {
            props.onClickUser(props.user.id)
        }
    }, [props.loading, props.onClickUser])

    const handleFollowUser = useCallback(() => {
        if (!props.loading) {
            props.onFollowUser(props.user.id)
        }
    }, [props.loading, props.onFollowUser])

    const handleMessageUser = useCallback(() => {
        if (!props.loading) {
            props.onMessageUser(props.user.id)
        }
    }, [props.loading, props.onMessageUser])

    return (
        <Box
            component='div'
            paddingTop='16px'
            display='grid'
            alignItems='center'
            width='366px'
            paddingBottom='16px'
            gridTemplateRows='64px 40px min-content'
            sx={{
                gridRowGap: '16px',
            }}
        >
            <Box
                component='div'
                display='grid'
                alignItems='center'
                gridTemplateColumns='64px 1fr'
                paddingX='16px'
                sx={{
                    gridColumnGap: '8px',
                }}
            >
                <Box
                    component='div'
                >
                    <Box
                        component='div'
                        sx={{ cursor: props.loading ? 'default' : 'pointer' }}
                        onClick={handleClickUser}
                    >
                        <Box
                            component='div'
                            width='56px'
                            height='56px'
                            borderRadius='50%'
                            boxSizing='border-box'
                            overflow='hidden'
                            position='relative'
                            display='block'
                            bgcolor={props.loading ? 'transparent' : '#121212'}
                        >
                            {props.loading ? (
                                <Skeleton
                                    variant='circular'
                                    width={56}
                                    height={56}
                                    sx={{ backgroundColor: '#202020' }} />
                            ) : props.user.photoUrl ? (
                                <img
                                    alt='Picture'
                                    style={{
                                        objectFit: 'cover',
                                        left: '0',
                                        width: '100%',
                                        userSelect: 'none',
                                        height: '100%',
                                        top: '0',
                                        position: 'absolute',
                                        border: '0',
                                        overflowClipMargin: 'content-box',
                                        overflow: 'clip',
                                    }}
                                    src={props.user.photoUrl}
                                />
                            ) : (
                                <Avatar sx={{ height: 56, width: 56 }} />
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box
                    component='div'
                >
                    <Box
                        component='div'
                    >
                        <Box
                            component='div'
                            height='18px'
                            display='flex'
                            alignItems='center'
                        >
                            <Box
                                component='div'
                                display='inline'
                                padding='0'
                                margin='0'
                                border='0'
                                bgcolor='transparent'
                                boxSizing='border-box'
                                textAlign='inherit'
                                sx={{
                                    cursor: props.loading ? 'default' : 'pointer',
                                    touchAction: 'manipulation',
                                    outline: 'none',
                                }}
                                onClick={handleClickUser}
                            >
                                <Box
                                    component='span'
                                    lineHeight='20px'
                                    display='inline'
                                    fontSize='16px'
                                    minWidth='0'
                                    margin='0'
                                    color='#F5F5F5'
                                    fontWeight='700'
                                    maxWidth='100%'
                                    sx={{
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-line',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {props.loading ? (
                                        <Skeleton
                                            variant='rounded'
                                            width={240}
                                            height={17}
                                            sx={{
                                                backgroundColor: '#202020',
                                                borderRadius: '8px',
                                            }} />
                                    ) : props.user.username}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            component='div'
                            height='18px'
                            width='262px'
                            marginTop='4px'
                        >
                            <Box
                                component='span'
                                lineHeight='18px'
                                display='inline'
                                fontSize='14px'
                                minWidth='0'
                                margin='0'
                                color='#A8A8A8'
                                fontWeight='400'
                                maxWidth='100%'
                                sx={{
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {props.loading ? (
                                    <Skeleton
                                        variant='rounded'
                                        width={180}
                                        height={16}
                                        sx={{
                                            backgroundColor: '#202020',
                                            borderRadius: '8px',
                                        }} />
                                ) : `${props.user.firstName} ${props.user.lastName}`}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                component='div'
            >
                <Box
                    component='div'
                    display='grid'
                    gridTemplateColumns='1fr 1fr 1fr'
                    alignItems='center'
                    sx={{
                        gridColumnGap: '3px',
                    }}
                >
                    <Stats
                        loading={props.loading}
                        title='posts'
                        count={props.postsCount}
                    />
                    <Stats
                        loading={props.loading}
                        title='followers'
                        count={props.followersCount}
                    />
                    <Stats
                        loading={props.loading}
                        title='following'
                        count={props.followingCount}
                    />
                </Box>
            </Box>
            <Box
                component='div'
            >
                {props.loading || props.posts.length > 0 ? (
                    <MediaGallery
                        items={props.loading ? [...Array(3).keys()].map(index => ({
                            id: index,
                            photoUrl: null,
                        })) : props.posts}
                        onClick={props.onClickPost}
                    />
                ) : (
                    <Box
                        component='div'
                        display='grid'
                        textAlign='center'
                        paddingLeft='16px'
                        paddingRight='16px'
                        paddingBottom='16px'
                        paddingTop='4px'
                        justifyItems='center'
                        borderTop='1px solid #262626'
                        borderBottom='1px solid #262626'
                        sx={{ gridRowGap: '8px' }}
                    >
                        <Box
                            component='div'
                            width='48px'
                            height='48px'
                        >
                            <Box component='div' paddingLeft='8px' paddingTop='12px'>
                                <svg
                                    aria-label='Socialley'
                                    style={{ display: 'block', position: 'relative' }}
                                    height='64'
                                    color='rgb(245,245,245)'
                                    fill='rgb(245,245,245)'
                                    role='img'
                                    viewBox='0 0 48 48'
                                    width='64'
                                >
                                    <title>Socialley</title>
                                    <path
                                        d='M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z' />
                                </svg>
                            </Box>
                        </Box>
                        <Box
                            component='span'
                            lineHeight='18px'
                            fontSize='14px'
                            display='inline'
                            minWidth='0'
                            margin='0!important'
                            color='#F5F5F5'
                            fontWeight='700'
                            maxWidth='100%'
                            sx={{
                                whiteSpace: 'pre-line',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                            }}
                        >
                            No posts yet
                        </Box>
                        <Box
                            component='span'
                            lineHeight='18px'
                            fontSize='14px'
                            display='inline'
                            minWidth='0'
                            margin='0!important'
                            color='#A8A8A8'
                            fontWeight='400'
                            maxWidth='100%'
                            sx={{
                                whiteSpace: 'pre-line',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                            }}
                        >
                            When {props.user?.username} shares photos and reels, you'll see them here.
                        </Box>
                    </Box>
                )}
            </Box>
            <Box
                component='div'
            >
                <Box
                    component='div'
                    display='block'
                    paddingX='16px'
                >
                    <Box
                        component='div'
                        display='flex'
                    >
                        <Box
                            component='div'
                            maxWidth='200px'
                            flexGrow='1'
                            marginRight='4px'
                        >
                            {props.loading ? (
                                <Skeleton
                                    variant='rounded'
                                    height={34}
                                    sx={{
                                        backgroundColor: '#202020',
                                        borderRadius: '8px',
                                    }} />
                            ) : (
                                <Button
                                    variant='primary'
                                    text='Message'
                                    contained
                                    fullWidth
                                    startIcon={
                                        <svg
                                            aria-label=''
                                            style={{ display: 'block', position: 'relative' }}
                                            color='rgb(255, 255, 255)'
                                            fill='rgb(255, 255, 255)'
                                            height='18'
                                            role='img'
                                            viewBox='0 0 24 24'
                                            width='18'
                                        >
                                            <title>Message</title>
                                            <path
                                                d='M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeMiterlimit='10'
                                                strokeWidth='1.739' />
                                            <path
                                                d='M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z'
                                                fillRule='evenodd' />
                                        </svg>
                                    }
                                    onClick={handleMessageUser}
                                />
                            )}
                        </Box>
                        <Box
                            component='div'
                            maxWidth='200px'
                            flexGrow='1'
                            marginLeft='4px'
                        >
                            {props.loading ? (
                                <Skeleton
                                    variant='rounded'
                                    height={34}
                                    sx={{
                                        backgroundColor: '#202020',
                                        borderRadius: '8px',
                                    }} />
                            ) : props.user.following ? (
                                <FollowingButton
                                    contained
                                    fullWidth
                                    minWidth={113}
                                    user={props.user}
                                    onUnfollowUser={props.onUnfollowUser}
                                />
                            ) : (
                                <Button
                                    variant='primary'
                                    text='Follow'
                                    contained
                                    fullWidth
                                    minWidth={113}
                                    loading={props.user.followingLoading}
                                    onClick={handleFollowUser}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}