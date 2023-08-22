import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { useLikePost, useUnlikePost, useSavePost, useUnsavePost } from '../../hooks/graphql'
import { FIND_COMMENTS_FOR_POST } from '../../graphql/queries/post'
import { FindCommentsForPost } from '../../graphql/types/queries/post'
import PostPreviewModal from '../../lib/src/components/PostPreviewModal'
import PostLikes from '../PostLikes'
import { Post } from '../../lib/src/types/Post'
import { Comment } from '../../lib/src/types/Comment'


interface Props {
    postId: string
    post?: Post | null

    onClose(): void
}

export default function PostModal(props: Props) {

    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        if (props.post) {
            setPost(props.post)
        }
    }, [props.post])

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

    const likePost = useLikePost()

    const handleLikePost = (postId: string | number) => {
        likePost(postId as string)
    }

    const unlikePost = useUnlikePost()

    const handleUnlikePost = (postId: string | number) => {
        unlikePost(postId as string)
    }

    const savePost = useSavePost()

    const handleSavePost = (postId: string | number) => {
        savePost(postId as string)
    }

    const unsavePost = useUnsavePost()

    const handleUnsavePost = (postId: string | number) => {
        unsavePost(postId as string)
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
                onLikePost={handleLikePost}
                onUnlikePost={handleUnlikePost}
                onSavePost={handleSavePost}
                onRemovePost={handleUnsavePost}
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