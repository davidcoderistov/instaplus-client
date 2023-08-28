import Box from '@mui/material/Box'
import PostHeader from '../PostHeader'
import PostPreviewSlider from '../PostPreviewSlider'
import PostActions from '../PostActions'
import PostLikes from '../PostLikes'
import PostDescription from '../PostDescription'
import { Post } from '../../types/Post'
import { formatNumber } from '../../utils'


interface StaticProps {
    loading?: never
    post: Post

    onFollowUser(userId: string | number): void

    onUnfollowUser(userId: string | number): void

    onLikePost(postId: string | number): void

    onUnlikePost(postId: string | number): void

    onSavePost(postId: string | number): void

    onRemovePost(postId: string | number): void

    onCommentOnPost?(postId: string | number): void

    onViewPostLikes(postId: string | number): void

    onViewPost(postId: string | number): void

    onViewPostComments(postId: string | number): void

    onViewUser(userId: string | number): void

    onViewHashtag?(name: string): void
}

interface LoadingProps {
    loading: true
    post?: never

    onFollowUser?(): never

    onUnfollowUser?(): never

    onLikePost?(): never

    onUnlikePost?(): never

    onSavePost?(): never

    onRemovePost?(): never

    onCommentOnPost?(): never

    onViewPostLikes?(): never

    onViewPost?(): never

    onViewPostComments?(): never

    onViewUser?(): never

    onViewHashtag?(): never
}

type Props = StaticProps | LoadingProps

export default function PostCard(props: Props) {

    const handleViewPostCreator = () => {
        if (!props.loading) {
            props.onViewUser(props.post.creator.id)
        }
    }

    const handleViewPostComments = () => {
        if (!props.loading) {
            props.onViewPostComments(props.post.id)
        }
    }

    const handleClickHashtag = (name: string) => {
        if (!props.loading && props.onViewHashtag) {
            props.onViewHashtag(name)
        }
    }

    return (
        <Box
            component='div'
            maxHeight='inherit'
            padding='0'
            marginBottom='12px'
            paddingBottom='20px!important'
            borderRadius='0'
            borderBottom='1px solid #262626'
            width='470px'
            display='block'
        >
            <Box
                component='div'
                maxHeight='inherit'
                maxWidth='inherit'
                borderRadius='0'
                justifyContent='center'
                bgcolor='transparent'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                alignItems='stretch'
                position='relative'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <Box
                    component='div'
                    bgcolor='#000000'
                    borderRadius='8px'
                    display='block'
                >
                    {props.loading ? (
                        <PostHeader
                            dense
                            loading />
                    ) : (
                        <PostHeader
                            dense
                            user={props.post.creator}
                            post={props.post}
                            onFollowUser={props.onFollowUser}
                            onUnfollowUser={props.onUnfollowUser}
                            onGoToPost={props.onViewPost}
                            onViewProfile={props.onViewUser} />
                    )}
                </Box>
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='flex-start'
                    alignItems='center'
                    border='1px solid #1A1A1A'
                >
                    <PostPreviewSlider
                        dense
                        loading={Boolean(props.loading)}
                        photoUrls={!props.loading ? props.post.photoUrls : []}
                    />
                </Box>
                <Box
                    component='div'
                    borderRadius='0'
                    bgcolor='transparent'
                    flexDirection='column'
                    boxSizing='border-box'
                    display='flex'
                    flexShrink='0'
                    alignItems='stretch'
                    alignSelf='auto'
                    justifyContent='flex-start'
                    position='relative'
                    flexGrow='0'
                    sx={{
                        overflowY: 'visible',
                        overflowX: 'visible',
                    }}
                >
                    <Box
                        component='div'
                        display='flex'
                        flexDirection='column'
                        position='relative'
                        borderRadius='8px'
                        bgcolor='#000000'
                        sx={{ pointerEvents: 'auto' }}
                    >
                        <Box
                            component='div'
                            border='0'
                            padding='0'
                            boxSizing='border-box'
                            display='flex'
                            flexDirection='column'
                            minWidth='335px'
                            position='relative'
                            width='100%'
                        >
                            {!props.loading && (
                                <PostActions
                                    postId={props.post.id}
                                    dense
                                    isPostLiked={props.post.isLiked}
                                    onLikePost={props.onLikePost}
                                    onUnlikePost={props.onUnlikePost}
                                    isPostSaved={props.post.isSaved}
                                    onSavePost={props.onSavePost}
                                    onRemovePost={props.onRemovePost}
                                    onCommentOnPost={props.onCommentOnPost}
                                    onViewPost={props.onViewPost}
                                />
                            )}
                            {!props.loading && (
                                <PostLikes
                                    postId={props.post.id}
                                    dense
                                    likingUsers={props.post.lastLikingMutualFollowers}
                                    likingUser={props.post.lastLikingUser}
                                    likesCount={props.post.likesCount}
                                    onViewUser={props.onViewUser}
                                    onViewLikes={props.onViewPostLikes}
                                    onViewPost={props.onViewPost}
                                />
                            )}
                            {!props.loading && props.post.description && (
                                <Box
                                    component='div'
                                    borderRadius='0'
                                    bgcolor='transparent'
                                    flexDirection='column'
                                    boxSizing='border-box'
                                    display='flex'
                                    marginTop='8px'
                                    position='static'
                                    alignItems='stretch'
                                    justifyContent='flex-start'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        borderRadius='0'
                                        bgcolor='transparent'
                                        boxSizing='border-box'
                                        flexShrink='0'
                                        position='static'
                                        display='inline-block'
                                        alignSelf='auto'
                                        flexGrow='0'
                                        sx={{
                                            overflowY: 'visible',
                                            overflowX: 'visible',
                                        }}
                                    >
                                        <Box
                                            component='div'
                                            marginRight='4px'
                                            display='inline-block'
                                        >
                                            <Box
                                                component='div'
                                                display='inline'
                                            >
                                                <Box
                                                    component='div'
                                                    display='inline'
                                                >
                                                    <Box
                                                        component='span'
                                                        fontWeight='600'
                                                        display='inline'
                                                        color='#F5F5F5'
                                                        padding='0'
                                                        margin='0'
                                                        border='0'
                                                        bgcolor='transparent'
                                                        minWidth='0'
                                                        minHeight='0'
                                                        textAlign='center'
                                                        boxSizing='border-box'
                                                        position='relative'
                                                        fontSize='0.875rem'
                                                        lineHeight='18px'
                                                        sx={{
                                                            textOverflow: 'ellipsis',
                                                            touchAction: 'manipulation',
                                                            userSelect: 'none',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={handleViewPostCreator}
                                                    >
                                                        {props.post.creator.username}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            component='span'
                                            display='inline!important'
                                            margin='0!important'
                                            color='#F5F5F5'
                                            fontWeight='400'
                                            fontSize='14px'
                                            lineHeight='14px'
                                        >
                                            <PostDescription
                                                description={props.post.description}
                                                onClick={handleClickHashtag} />
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            {!props.loading && props.post.commentsCount > 0 && (
                                <Box
                                    component='div'
                                    borderRadius='0'
                                    bgcolor='transparent'
                                    flexDirection='column'
                                    boxSizing='border-box'
                                    display='flex'
                                    marginTop='8px'
                                    position='static'
                                    alignItems='stretch'
                                    justifyContent='flex-start'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        borderRadius='0'
                                        bgcolor='transparent'
                                        flexDirection='column'
                                        boxSizing='border-box'
                                        display='flex'
                                        flexShrink='0'
                                        position='static'
                                        alignSelf='auto'
                                        justifyContent='flex-start'
                                        marginBottom='8px'
                                        alignItems='flex-start'
                                        flexGrow='0'
                                        sx={{
                                            overflowY: 'visible',
                                            overflowX: 'visible',
                                        }}
                                    >
                                        <Box
                                            component='span'
                                            display='inline'
                                            padding='0'
                                            margin='0'
                                            border='0'
                                            bgcolor='transparent'
                                            boxSizing='border-box'
                                            textAlign='inherit'
                                            sx={{
                                                touchAction: 'manipulation',
                                                cursor: 'pointer',
                                            }}
                                            onClick={handleViewPostComments}
                                        >
                                            <Box
                                                component='span'
                                                lineHeight='18px'
                                                fontSize='14px'
                                                fontWeight='400'
                                                minWidth='0'
                                                margin='0!important'
                                                color='#A8A8A8'
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
                                                {props.post.commentsCount > 1 ? `View all ${formatNumber(props.post.commentsCount)} comments` : 'View 1 comment'}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}