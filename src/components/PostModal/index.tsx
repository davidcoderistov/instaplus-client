import { useState, useEffect, useMemo } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { FIND_COMMENTS_FOR_POST } from '../../graphql/queries/post'
import { FindCommentsForPost } from '../../graphql/types/queries/post'
import { gql } from '@apollo/client'
import PostPreviewModal from '../../lib/src/components/PostPreviewModal'
import PostLikes from '../PostLikes'
import { PostDetails } from '../../graphql/types/models'
import { Post } from '../../lib/src/types/Post'
import { Comment } from '../../lib/src/types/Comment'


interface Props {
    postId: string

    onClose(): void
}

export default function PostModal(props: Props) {

    const client = useApolloClient()

    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        const postDetails: PostDetails | null = client.readFragment({
            id: `PostDetails:${props.postId}`,
            fragment: gql`
                fragment PostDetails on PostDetails {
                    _id
                    post {
                        _id
                        caption
                        location
                        photoUrls
                        creator {
                            user {
                                _id
                                firstName
                                lastName
                                username
                                photoUrl
                            }
                            following
                        }
                        createdAt
                    }
                    liked
                    saved
                    commentsCount
                    likesCount
                    latestTwoLikeUsers {
                        _id
                        username
                    }
                    latestThreeFollowedLikeUsers {
                        _id
                        photoUrl
                    }
                }
            `,
        })
        if (postDetails) {
            setPost({
                id: postDetails._id,
                description: postDetails.post.caption,
                location: postDetails.post.location,
                photoUrls: postDetails.post.photoUrls,
                creator: {
                    id: postDetails.post.creator.user._id,
                    username: postDetails.post.creator.user.username,
                    photoUrl: postDetails.post.creator.user.photoUrl,
                    following: postDetails.post.creator.following,
                    followingLoading: postDetails.post.creator.followingLoading,
                },
                isLiked: postDetails.liked,
                isSaved: postDetails.saved,
                likesCount: postDetails.likesCount,
                commentsCount: postDetails.commentsCount,
                lastLikingUser: postDetails.latestTwoLikeUsers.length > 0 ? {
                    id: postDetails.latestTwoLikeUsers[0]._id,
                    username: postDetails.latestTwoLikeUsers[0].username,
                } : null,
                lastLikingMutualFollowers: postDetails.latestThreeFollowedLikeUsers.map(user => ({
                    id: user._id,
                    username: user._id,
                    photoUrl: user.photoUrl as string,
                })),
                createdAt: postDetails.post.createdAt,
            })
        }
    }, [props.postId])

    const commentsForPost = useQuery<FindCommentsForPost>(FIND_COMMENTS_FOR_POST, {
        variables: {
            postId: props.postId,
            offset: 0,
            limit: 10,
        },
    })

    const comments: Comment[] = useMemo(() => {
        if (!commentsForPost.loading && !commentsForPost.error && commentsForPost.data) {
            return commentsForPost.data.findCommentsForPost.data.map(commentForPost => ({
                id: commentForPost._id,
                creator: {
                    id: commentForPost.creator._id,
                    username: commentForPost.creator.username,
                    photoUrl: commentForPost.creator.photoUrl,
                },
                body: commentForPost.text,
                isLiked: commentForPost.liked,
                likesCount: commentForPost.likesCount,
                repliesCount: commentForPost.repliesCount,
                replies: [],
                showReplies: commentForPost.showReplies,
                repliesLoading: commentForPost.repliesLoading,
                createdAt: commentForPost.createdAt,
            }))
        }
        return []
    }, [commentsForPost.loading, commentsForPost.error, commentsForPost.data])

    const hasMoreComments = useMemo(() => {
        if (!commentsForPost.loading && !commentsForPost.error && commentsForPost.data) {
            return commentsForPost.data.findCommentsForPost.data.length < commentsForPost.data.findCommentsForPost.count
        }
        return false
    }, [commentsForPost.loading, commentsForPost.error, commentsForPost.data])

    const [moreCommentsLoading, setMoreCommentsLoading] = useState(false)

    const handleFetchMoreComments = () => {
        if (commentsForPost.data) {
            setMoreCommentsLoading(true)
            commentsForPost.fetchMore({
                variables: {
                    offset: commentsForPost.data.findCommentsForPost.data.length,
                },
                updateQuery(existing: FindCommentsForPost, { fetchMoreResult }: { fetchMoreResult: FindCommentsForPost }) {
                    return {
                        ...existing,
                        findCommentsForPost: {
                            ...existing.findCommentsForPost,
                            data: [
                                ...existing.findCommentsForPost.data,
                                ...fetchMoreResult.findCommentsForPost.data,
                            ],
                        },
                    }
                },
            }).catch(console.log).finally(() => setMoreCommentsLoading(false))
        }
    }

    const [viewPostLikesPostId, setViewPostLikesPostId] = useState<string | null>(null)

    const handleViewPostLikes = (postId: string) => {
        setViewPostLikesPostId(postId)
    }

    const handleClosePostLikesModal = () => {
        setViewPostLikesPostId(null)
    }

    return (
        <>
            <PostPreviewModal
                open={true}
                onClose={props.onClose}
                post={post}
                postLoading={false}
                comments={comments}
                commentsLoading={commentsForPost.loading || moreCommentsLoading}
                hasMoreComments={hasMoreComments}
                viewingPostLikes={Boolean(viewPostLikesPostId)}
                viewingCommentLikes={false}
                isPostingComment={false}
                onFollowUser={console.log}
                onUnfollowUser={console.log}
                onLikePost={console.log}
                onUnlikePost={console.log}
                onSavePost={console.log}
                onRemovePost={console.log}
                onViewPostLikes={handleViewPostLikes}
                onViewPost={console.log}
                onFetchMoreComments={handleFetchMoreComments}
                onViewUser={console.log}
                onViewCommentLikes={console.log}
                onReplyToComment={console.log}
                onLikeComment={console.log}
                onUnlikeComment={console.log}
                onViewReplies={console.log}
                onHideReplies={console.log}
                onPostComment={console.log} />
            <PostLikes
                postId={viewPostLikesPostId}
                onCloseModal={handleClosePostLikesModal} />
        </>
    )
}