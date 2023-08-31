import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
    useAuthUser,
    usePostViewNavigation,
    useUserDetailsNavigation,
    useHashtagNavigation,
} from '../../hooks/misc'
import {
    useFollowUser,
    useUnfollowUser,
    useLikePost,
    useUnlikePost,
    useSavePost,
    useUnsavePost,
    usePostLikes,
} from '../../hooks/graphql'
import { FIND_FOLLOWED_USERS_POSTS } from '../../graphql/queries/post'
import { FindFollowedUsersPostsQueryType } from '../../graphql/types/queries/post'
import { Post } from '../../lib/src/types/Post'
import { FIND_SUGGESTED_USERS } from '../../graphql/queries/user'
import { FindSuggestedUsersQueryType } from '../../graphql/types/queries/user'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import PostCard from '../../lib/src/components/PostCard'
import TopFiveSuggestedUsers from '../../lib/src/components/TopFiveSuggestedUsers'
import PostLikes from '../PostLikes'
import PostModal from '../PostModal'
import AllCaughtUp from '../AllCaughtUp'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'
import _differenceBy from 'lodash/differenceBy'


export default function FollowedUsersPosts() {

    const [authUser] = useAuthUser()

    const followedUsersPosts = useQuery<FindFollowedUsersPostsQueryType>(FIND_FOLLOWED_USERS_POSTS, { variables: { limit: 4 } })

    const posts: Post[] = useMemo(() => {
        if (!followedUsersPosts.loading && !followedUsersPosts.error && followedUsersPosts.data) {
            return followedUsersPosts.data.findFollowedUsersPosts.data.map(followedUserPost => ({
                id: followedUserPost._id,
                description: followedUserPost.post.caption,
                location: followedUserPost.post.location,
                photoUrls: followedUserPost.post.photoUrls,
                creator: {
                    id: followedUserPost.post.creator.user._id,
                    username: followedUserPost.post.creator.user.username,
                    photoUrl: followedUserPost.post.creator.user.photoUrl,
                    following: true,
                    followingLoading: false,
                },
                isLiked: followedUserPost.liked,
                isSaved: followedUserPost.saved,
                likesCount: followedUserPost.likesCount,
                commentsCount: followedUserPost.commentsCount,
                lastLikingUser: followedUserPost.latestTwoLikeUsers.length > 0 ? {
                    id: followedUserPost.latestTwoLikeUsers[0]._id,
                    username: followedUserPost.latestTwoLikeUsers[0].username,
                } : null,
                lastLikingMutualFollowers: followedUserPost.latestThreeFollowedLikeUsers.map(user => ({
                    id: user._id,
                    username: user._id,
                    photoUrl: user.photoUrl as string,
                })),
                createdAt: followedUserPost.post.createdAt,
            }))
        }
        return []
    }, [followedUsersPosts.loading, followedUsersPosts.error, followedUsersPosts.data])

    const postsCount = useMemo(() => {
        if (!followedUsersPosts.loading && !followedUsersPosts.error && followedUsersPosts.data) {
            return followedUsersPosts.data.findFollowedUsersPosts.data.length
        }
        return 0
    }, [followedUsersPosts.loading, followedUsersPosts.error, followedUsersPosts.data])

    const hasMorePosts = useMemo(() => {
        if (!followedUsersPosts.loading && !followedUsersPosts.error && followedUsersPosts.data) {
            return Boolean(followedUsersPosts.data.findFollowedUsersPosts.nextCursor)
        }
        return false
    }, [followedUsersPosts.loading, followedUsersPosts.error, followedUsersPosts.data])

    const handleFetchMorePosts = () => {
        if (followedUsersPosts.data && followedUsersPosts.data.findFollowedUsersPosts.nextCursor) {
            followedUsersPosts.fetchMore({
                variables: {
                    cursor: {
                        _id: followedUsersPosts.data.findFollowedUsersPosts.nextCursor._id,
                        createdAt: followedUsersPosts.data.findFollowedUsersPosts.nextCursor.createdAt,
                    },
                },
                updateQuery(existing: FindFollowedUsersPostsQueryType, { fetchMoreResult }: { fetchMoreResult: FindFollowedUsersPostsQueryType }) {
                    return {
                        ...existing,
                        findFollowedUsersPosts: {
                            ...fetchMoreResult.findFollowedUsersPosts,
                            data: [
                                ...existing.findFollowedUsersPosts.data,
                                ..._differenceBy(
                                    fetchMoreResult.findFollowedUsersPosts.data,
                                    existing.findFollowedUsersPosts.data,
                                    '_id',
                                ),
                            ],
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const followUser = useFollowUser()

    const unfollowUser = useUnfollowUser()

    const { viewPostLikesPostId, onViewPostLikes, onClosePostLikes } = usePostLikes()

    const likePost = useLikePost()

    const unlikePost = useUnlikePost()

    const savePost = useSavePost()

    const unsavePost = useUnsavePost()

    const [viewPostId, setViewPostId] = useState<string | null>(null)

    const handleViewPost = (postId: string) => {
        setViewPostId(postId)
    }

    const handleClosePostModal = () => {
        setViewPostId(null)
    }

    const viewPost: Post | null = useMemo(() => {
        if (viewPostId) {
            return posts.find(post => post.id === viewPostId) ?? null
        }
        return null
    }, [viewPostId, posts])

    const navigateToPostView = usePostViewNavigation()

    const handlePostView = (postId: string | number) => {
        navigateToPostView(postId)
    }

    const navigateToUserDetails = useUserDetailsNavigation()

    const handleViewUser = (userId: string | number) => {
        navigateToUserDetails(userId)
    }

    const navigateToHashtag = useHashtagNavigation()

    const handleViewHashtag = (name: string) => {
        navigateToHashtag(name)
    }

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

    const handleFollowSuggestedUser = useCallback((userId: string | number) => {
        followUser(userId as string)
    }, [])

    const handleUnfollowSuggestedUser = useCallback((userId: string | number) => {
        unfollowUser(userId as string)
    }, [])

    const handleClickSuggestedUser = useCallback((userId: string | number) => {
        navigateToUserDetails(userId)
    }, [])

    const navigate = useNavigate()

    const handleClickSeeAllSuggestedUsers = () => {
        navigate('/explore/people')
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
                    justifyContent='center'
                    width='100%'
                    display='flex'
                    paddingTop='8px'
                    flexDirection='row'
                >
                    <Box
                        component='div'
                        maxWidth='630px'
                        width='100%'
                        display='block'
                    >
                        <Box
                            component='div'
                            marginTop='36px'
                        >
                            <Box
                                component='div'
                                overflow='visible'
                                borderRadius='0'
                                bgcolor='transparent'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='center'
                                position='static'
                                justifyContent='flex-start'
                            >
                                {followedUsersPosts.loading ? _range(2).map(index => (
                                    <PostCard
                                        key={index}
                                        loading />
                                )) : (
                                    <InfiniteScroll
                                        next={handleFetchMorePosts}
                                        style={{ overflow: 'hidden' }}
                                        hasMore={hasMorePosts}
                                        scrollableTarget='followedUsersPostsContainer'
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
                                        endMessage={<AllCaughtUp />}
                                        dataLength={postsCount}
                                        scrollThreshold='95%'
                                    >
                                        {posts.map(post => (
                                            <PostCard
                                                key={post.id}
                                                post={post}
                                                onFollowUser={followUser}
                                                onUnfollowUser={unfollowUser}
                                                onLikePost={likePost}
                                                onUnlikePost={unlikePost}
                                                onSavePost={savePost}
                                                onRemovePost={unsavePost}
                                                onCommentOnPost={handleViewPost}
                                                onViewPostLikes={onViewPostLikes}
                                                onViewPost={handlePostView}
                                                onViewPostComments={handleViewPost}
                                                onViewUser={handleViewUser}
                                                onViewHashtag={handleViewHashtag}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <TopFiveSuggestedUsers
                        authUser={authUser}
                        users={suggestedUsers}
                        isInitialLoading={findSuggestedUsers.loading}
                        onFollowUser={handleFollowSuggestedUser}
                        onUnfollowUser={handleUnfollowSuggestedUser}
                        onClickUser={handleClickSuggestedUser}
                        onSeeAll={handleClickSeeAllSuggestedUsers} />
                </Box>
            </Box>
            <PostLikes
                postId={viewPostLikesPostId}
                onCloseModal={onClosePostLikes} />
            {viewPostId && (
                <PostModal
                    postId={viewPostId}
                    post={viewPost}
                    onClose={handleClosePostModal} />
            )}
        </Box>
    )
}