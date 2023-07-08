import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import FollowingButton from '../FollowingButton'
import Button from '../Button'
import { formatNumber } from '../../utils'


interface Props {
    loading?: boolean
    profile?: boolean
    user: {
        id: string | number
        firstName: string
        lastName: string
        username: string
        photoUrl?: string | null
        description: string | null
        following: boolean
        followingLoading: boolean
    }
    postsCount: number
    followersCount: number
    followingCount: number
    mutualFollowersCount: number
    mutualFollowersUsernames: string[]

    onFollowUser?(userId: string | number): void

    onUnfollowUser?(userId: string | number): void

    onMessageUser?(userId: string | number): void

    onEditUserProfile?(): void

    onViewFollowers(userId: string | number): void

    onViewFollowing(userId: string | number): void
}

export default function ProfileDescription(props: Props) {

    const handleFollowUser = () => {
        if (props.onFollowUser) {
            props.onFollowUser(props.user.id)
        }
    }

    const handleUnfollowUser = () => {
        if (props.onUnfollowUser) {
            props.onUnfollowUser(props.user.id)
        }
    }

    const handleMessageUser = () => {
        if (props.onMessageUser) {
            props.onMessageUser(props.user.id)
        }
    }

    const handleViewFollowers = () => {
        props.onViewFollowers(props.user.id)
    }

    const handleViewFollowing = () => {
        props.onViewFollowing(props.user.id)
    }

    return (
        <Box
            component='div'
            display='flex'
            alignItems='stretch'
            flexDirection='row'
            position='relative'
        >
            <Box
                component='div'
                justifyContent='center'
                flexDirection='column'
                display='flex'
                flexShrink='0'
                position='relative'
                marginRight='30px'
                flexGrow='0'
                flexBasis='290px'
            >
                <Box
                    component='div'
                    alignSelf='center'
                    display='block'
                    flex='none'
                    position='relative'
                >
                    <Box
                        component='div'
                        width='150px'
                        height='150px'
                        borderRadius='50%'
                        bgcolor={props.loading ? '#000000' : '#121212'}
                        boxSizing='border-box'
                        overflow='hidden'
                        position='relative'
                        display='block'
                    >
                        {props.loading ? (
                            <Skeleton
                                variant='circular'
                                width={150}
                                height={150}
                                sx={{ backgroundColor: '#202020' }} />
                        ) : props.user.photoUrl ? (
                            <img
                                alt={`${props.user.username} profile picture`}
                                style={{
                                    fontSize: '100%',
                                    width: '100%',
                                    height: '100%',
                                    verticalAlign: 'baseline',
                                    padding: '0',
                                    margin: '0',
                                    border: '0',
                                }}
                                src={props.user.photoUrl} />
                        ) : (
                            <Avatar sx={{ height: 150, width: 150 }} />
                        )}
                    </Box>
                </Box>
            </Box>
            <Box
                component='div'
                flexShrink='1'
                padding='0'
                fontSize='100%'
                minWidth='0'
                flexDirection='column'
                margin='0'
                border='0'
                boxSizing='border-box'
                display='flex'
                color='#F5F5F5'
                alignItems='stretch'
                position='relative'
                sx={{ verticalAlign: 'baseline' }}
            >
                <Box
                    component='div'
                    flexShrink='1'
                    minWidth='0'
                    display='flex'
                    alignItems='center'
                    flexDirection='row'
                    position='relative'
                >
                    <Box
                        component='span'
                        display='inline'
                        flexShrink='1'
                        padding='0'
                        bgcolor='transparent'
                        minWidth='0'
                        margin='0'
                        border='0'
                        boxSizing='border-box'
                        position='relative'
                        textAlign='inherit'
                        sx={{ touchAction: 'manipulation' }}
                    >
                        <Box
                            component='div'
                            lineHeight='25px'
                            fontWeight='400'
                            minWidth='0'
                            margin='0!important'
                            color='#F5F5F5'
                            overflow='hidden'
                            position='relative'
                            fontSize='20px'
                            display='block'
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
                                    width={420}
                                    height={20}
                                    sx={{
                                        backgroundColor: '#202020',
                                        borderRadius: '8px',
                                    }} />
                            ) : props.user.username}
                        </Box>
                    </Box>
                    {!props.loading && (
                        <Box
                            component='div'
                            borderRadius='0'
                            marginLeft='20px'
                            bgcolor='transparent'
                            boxSizing='border-box'
                            display='flex'
                            flexShrink='0'
                            alignItems='stretch'
                            flexDirection='row'
                            alignSelf='auto'
                            justifyContent='flex-start'
                            position='relative'
                            flexGrow='0'
                            sx={{
                                overflowY: 'visible',
                                overflowX: 'visible',
                            }}
                        >
                            {props.profile ? (
                                <>
                                    <Box component='div' marginLeft='8px' />
                                    <Button
                                        contained
                                        variant='secondary'
                                        text='Edit Profile'
                                        onClick={props.onEditUserProfile}
                                    />
                                </>
                            ) : (
                                <>
                                    <Box component='div' marginLeft='8px' />
                                    {props.user.following ? (
                                        <FollowingButton
                                            contained
                                            user={props.user}
                                            onUnfollowUser={handleUnfollowUser}
                                        />
                                    ) : (
                                        <Button
                                            variant='primary'
                                            text='Follow'
                                            contained
                                            loading={props.user.followingLoading}
                                            onClick={handleFollowUser}
                                        />
                                    )}
                                    <Box component='div' marginLeft='8px' />
                                    <Button
                                        contained
                                        variant='secondary'
                                        text='Message'
                                        onClick={handleMessageUser}
                                    />
                                </>
                            )}
                        </Box>
                    )}
                </Box>
                <Box
                    component='div'
                    marginBottom='20px'
                />
                <Box
                    component='div'
                    display='flex'
                    flexDirection='row'
                    marginBottom='20px'
                >
                    <Box
                        component='div'
                        fontSize='16px'
                        marginRight='40px'
                    >
                        {props.loading ? (
                            <Skeleton
                                variant='rounded'
                                width={90}
                                height={20}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '8px',
                                }} />
                        ) : (
                            <>
                                <Box
                                    component='span'
                                    color='#F5F5F5'
                                    fontWeight='600'
                                >
                                    {formatNumber(props.postsCount)}
                                </Box> posts
                            </>
                        )}
                    </Box>
                    <Box
                        component='div'
                        fontSize='16px'
                        marginRight='40px'
                    >
                        {props.loading ? (
                            <Skeleton
                                variant='rounded'
                                width={90}
                                height={20}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '8px',
                                }} />
                        ) : (
                            <Box
                                component='div'
                                sx={{ cursor: 'pointer' }}
                                onClick={handleViewFollowers}
                            >
                                <Box
                                    component='span'
                                    color='#F5F5F5'
                                    fontWeight='600'
                                >
                                    {formatNumber(props.followersCount)}
                                </Box> followers
                            </Box>
                        )}
                    </Box>
                    <Box
                        component='div'
                        fontSize='16px'
                        marginRight='40px'
                    >
                        {props.loading ? (
                            <Skeleton
                                variant='rounded'
                                width={90}
                                height={20}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '8px',
                                }} />
                        ) : (
                            <Box
                                component='div'
                                sx={{ cursor: 'pointer' }}
                                onClick={handleViewFollowing}
                            >
                                <Box
                                    component='span'
                                    color='#F5F5F5'
                                    fontWeight='600'
                                >
                                    {formatNumber(props.followingCount)}
                                </Box> following
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box
                    component='div'
                    alignItems='flex-start'
                    border='0'
                    boxSizing='border-box'
                    display='flex'
                    flexDirection='column'
                    flexShrink='0'
                    fontSize='100%'
                    margin='0'
                    padding='0'
                    position='relative'
                    sx={{ verticalAlign: 'baseline' }}
                >
                    <Box
                        component='div'
                        borderRadius='0'
                        bgcolor='transparent'
                        boxSizing='border-box'
                        display='flex'
                        flexShrink='0'
                        position='static'
                        alignItems='stretch'
                        flexDirection='row'
                        alignSelf='auto'
                        justifyContent='flex-start'
                        flexGrow='0'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                        }}
                    >
                        <Box
                            component='span'
                            lineHeight='18px'
                            fontSize='14px'
                            minWidth='0'
                            margin='0!important'
                            color='#F5F5F5'
                            fontWeight='600'
                            position='relative'
                            display='block'
                            maxWidth='100%'
                            sx={{
                                overflowY: 'visible',
                                overflowX: 'visible',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-line',
                                wordBreak: 'break-word',
                            }}
                        >
                            {props.loading ? (
                                <Skeleton
                                    variant='rounded'
                                    width={200}
                                    height={30}
                                    sx={{
                                        backgroundColor: '#202020',
                                        borderRadius: '8px',
                                    }} />
                            ) : (
                                <>
                                    {props.user.firstName} {props.user.lastName}
                                </>
                            )}
                        </Box>
                    </Box>
                    {!props.loading && props.user.description && (
                        <Box
                            component='div'
                            display='block'
                            color='#F5F5F5'
                            fontWeight='400'
                            margin='0'
                            fontSize='14px'
                            lineHeight='18px'
                            sx={{ whiteSpace: 'pre-wrap' }}
                        >
                            {props.user.description}
                        </Box>
                    )}
                    {!props.loading && props.mutualFollowersCount > 0 && !props.profile && (
                        <Box
                            component='span'
                            color='#F5F5F5'
                            fontWeight='500'
                            display='inline'
                            padding='0'
                            bgcolor='transparent'
                            margin='0'
                            border='0'
                            boxSizing='border-box'
                            textAlign='inherit'
                            sx={{
                                touchAction: 'manipulation',
                                cursor: 'pointer',
                            }}
                            onClick={handleViewFollowers}
                        >
                            <Box
                                component='span'
                                border='0'
                                display='block'
                                fontSize='100%'
                                marginTop='14px'
                                marginX='0'
                                marginBottom='0'
                                padding='0'
                                sx={{ verticalAlign: 'baseline' }}
                            >
                                <Box
                                    component='span'
                                    lineHeight='16px'
                                    fontWeight='500'
                                    minWidth='0'
                                    margin='0!important'
                                    color='#A8A8A8'
                                    position='relative'
                                    display='block'
                                    fontSize='12px'
                                    maxWidth='100%'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-line',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    Followed by {props.mutualFollowersUsernames.length > 0 && (
                                    <Box
                                        component='span'
                                        color='#F5F5F5'
                                        fontWeight='500'
                                    >
                                        {props.mutualFollowersUsernames[0]}
                                    </Box>
                                )}{props.mutualFollowersUsernames.length > 1 && (
                                    <>
                                        {props.mutualFollowersCount === 2 ? ' and ' : ', '} <Box
                                        component='span'
                                        color='#F5F5F5'
                                        fontWeight='500'
                                    >
                                        {props.mutualFollowersUsernames[1]}
                                    </Box>
                                    </>
                                )} {props.mutualFollowersCount > 2 && `+ ${props.mutualFollowersCount - 2} more`}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}