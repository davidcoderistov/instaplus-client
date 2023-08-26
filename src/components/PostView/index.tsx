import { useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { usePostViewNavigation } from '../../hooks/misc'
import {
    useCommentLikes,
    useCommentReplies,
    useCommentsForPost,
    useFollowUser,
    useLikeComment,
    useLikePost,
    usePostComment,
    usePostLikes,
    useSavePost,
    useUnfollowUser,
    useUnlikeComment,
    useUnlikePost,
    useUnsavePost,
} from '../../hooks/graphql'
import { FIND_POST_DETAILS_BY_ID } from '../../graphql/queries/post'
import { FindPostDetailsByIdQueryType } from '../../graphql/types/queries/post'
import { FIND_POSTS_FOR_USER } from '../../graphql/queries/post'
import { FindPostsForUserQueryType } from '../../graphql/types/queries/post'
import Box from '@mui/material/Box'
import PostPreviewSlider from '../../lib/src/components/PostPreviewSlider'
import PostPreview from '../../lib/src/components/PostPreview'
import MediaGallery from '../../lib/src/components/MediaGallery'
import PostLikes from '../PostLikes'
import CommentLikes from '../CommentLikes'
import { Post } from '../../lib/src/types/Post'


export default function PostView() {

    const { postId } = useParams()

    const findPostDetailsById = useQuery<FindPostDetailsByIdQueryType>(FIND_POST_DETAILS_BY_ID, { variables: { postId } })

    const post: Post | null = useMemo(() => {
        if (!findPostDetailsById.loading && !findPostDetailsById.error && findPostDetailsById.data && findPostDetailsById.data.findPostDetailsById) {
            const post = findPostDetailsById.data.findPostDetailsById
            return {
                id: post._id,
                description: post.post.caption,
                location: post.post.location,
                photoUrls: post.post.photoUrls,
                creator: {
                    id: post.post.creator.user._id,
                    username: post.post.creator.user.username,
                    photoUrl: post.post.creator.user.photoUrl,
                    following: true,
                    followingLoading: false,
                },
                isLiked: post.liked,
                isSaved: post.saved,
                likesCount: post.likesCount,
                commentsCount: post.commentsCount,
                lastLikingUser: post.latestTwoLikeUsers.length > 0 ? {
                    id: post.latestTwoLikeUsers[0]._id,
                    username: post.latestTwoLikeUsers[0].username,
                } : null,
                lastLikingMutualFollowers: post.latestThreeFollowedLikeUsers.map(user => ({
                    id: user._id,
                    username: user._id,
                    photoUrl: user.photoUrl as string,
                })),
                createdAt: post.post.createdAt,
            }
        }
        return null
    }, [findPostDetailsById.loading, findPostDetailsById.error, findPostDetailsById.data])

    const {
        comments,
        commentsLoading,
        hasMoreComments,
        onFetchMoreComments,
    } = useCommentsForPost(postId as string)

    const followUser = useFollowUser()

    const unfollowUser = useUnfollowUser()

    const { viewPostLikesPostId, onViewPostLikes, onClosePostLikes } = usePostLikes()

    const likePost = useLikePost()

    const unlikePost = useUnlikePost()

    const savePost = useSavePost()

    const unsavePost = useUnsavePost()

    const { viewCommentLikesCommentId, onViewCommentLikes, onCloseCommentLikes } = useCommentLikes()

    const likeComment = useLikeComment()

    const unlikeComment = useUnlikeComment()

    const { onViewReplies, onHideReplies } = useCommentReplies(postId as string)

    const { isPostingComment, onReplyToComment, onPostComment } = usePostComment()

    const handleViewUser = useCallback(() => {
        // TODO: Implement method
    }, [])

    const findPostsForUser = useQuery<FindPostsForUserQueryType>(FIND_POSTS_FOR_USER, {
        variables: {
            userId: post?.creator.id,
            limit: 6,
        },
        skip: Boolean(!post),
    })

    const posts = useMemo(() => {
        if (!findPostsForUser.loading && !findPostsForUser.error && findPostsForUser.data) {
            return findPostsForUser.data.findPostsForUser.map(postForUser => ({
                id: postForUser._id,
                photoUrl: postForUser.photoUrls[0],
                multiple: postForUser.photoUrls.length > 1,
            }))
        }
        return []
    }, [findPostsForUser.loading, findPostsForUser.error, findPostsForUser.data])

    const navigate = usePostViewNavigation()

    const handleClickPost = (postId: string) => {
        navigate(postId)
    }

    return (
        <Box
            id='followedUsersPostsContainer'
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
                    paddingTop='4vh'
                    marginRight='auto'
                    marginTop='0'
                    paddingRight='20px'
                    paddingLeft='20px'
                    marginBottom='16px'
                    flexGrow='1'
                    marginLeft='auto'
                    maxWidth='1035px'
                    width='calc(100% - 40px)'
                    paddingBottom='0'
                    display='block'
                >
                    <Box
                        component='div'
                        maxWidth='815px'
                        marginRight='auto'
                        width='100%'
                        flexDirection='column'
                        marginTop='0'
                        marginBottom='0'
                        display='flex'
                        alignItems='center'
                        position='relative'
                        marginLeft='auto'
                    >
                        <Box
                            component='div'
                            border='1px solid #363636'
                            display='flex'
                            flexDirection='row'
                        >
                            <Box
                                component='div'
                                maxHeight='inherit'
                                maxWidth='inherit'
                                borderRadius='0'
                                justifyContent='center'
                                bgcolor='transparent'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='stretch'
                                flexDirection='row'
                                position='relative'
                                sx={{
                                    overflowY: 'visible',
                                    overflowX: 'visible',
                                }}
                            >
                                <PostPreviewSlider
                                    loading={findPostDetailsById.loading}
                                    photoUrls={post ? post.photoUrls : []}
                                    large
                                />
                                <PostPreview
                                    dense
                                    post={post}
                                    postLoading={findPostDetailsById.loading}
                                    comments={comments}
                                    commentsLoading={commentsLoading}
                                    hasMoreComments={hasMoreComments}
                                    isPostingComment={isPostingComment}
                                    onFollowUser={followUser}
                                    onUnfollowUser={unfollowUser}
                                    onLikePost={likePost}
                                    onUnlikePost={unlikePost}
                                    onSavePost={savePost}
                                    onRemovePost={unsavePost}
                                    onViewPostLikes={onViewPostLikes}
                                    onViewPost={console.log}
                                    onFetchMoreComments={onFetchMoreComments}
                                    onViewUser={handleViewUser}
                                    onViewCommentLikes={onViewCommentLikes}
                                    onReplyToComment={onReplyToComment}
                                    onLikeComment={likeComment}
                                    onUnlikeComment={unlikeComment}
                                    onViewReplies={onViewReplies}
                                    onHideReplies={onHideReplies}
                                    onPostComment={onPostComment} />
                            </Box>
                        </Box>
                    </Box>
                    {!findPostDetailsById.loading && post && !findPostsForUser.loading && posts.length > 0 && (
                        <>
                            <Box
                                component='div'
                                marginTop='38px'
                                borderRadius='0'
                                bgcolor='transparent'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='stretch'
                                justifyContent='flex-start'
                                position='relative'
                                borderBottom='1px solid #262626'
                                sx={{
                                    overflowY: 'visible',
                                    overflowX: 'visible',
                                }}
                            />
                            <Box
                                component='div'
                                border='0'
                                boxSizing='border-box'
                                display='block'
                                fontSize='100%'
                                margin='0'
                                paddingTop='38px'
                                position='relative'
                                sx={{ verticalAlign: 'baseline' }}
                            >
                                <Box
                                    component='div'
                                    border='0'
                                    bgcolor='transparent'
                                    marginBottom='20px'
                                    flexDirection='column'
                                    boxSizing='border-box'
                                    display='flex'
                                    justifyContent='flex-start'
                                    position='relative'
                                    alignItems='flex-start'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        display='block'
                                        color='#A8A8A8'
                                        fontWeight='600'
                                        fontSize='14px'
                                        lineHeight='18px'
                                        margin='-3px 0 -4px'
                                    >
                                        More posts from <Box
                                        component='span'
                                        color='#F5F5F5'
                                        sx={{ cursor: 'pointer' }}
                                    >{post.creator.username}</Box>
                                    </Box>
                                </Box>
                                <Box
                                    component='div'
                                >
                                    <MediaGallery items={posts} onClick={handleClickPost} />
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
                <PostLikes
                    postId={viewPostLikesPostId}
                    onCloseModal={onClosePostLikes} />
                <CommentLikes
                    commentId={viewCommentLikesCommentId}
                    onCloseModal={onCloseCommentLikes} />
            </Box>
        </Box>
    )
}