import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_COMMENTS_FOR_POST } from '../../graphql/queries/post'
import { FindCommentsForPostQueryType } from '../../graphql/types/queries/post'
import { Comment } from '../../graphql/types/models'
import { Comment as IComment } from '../../lib/src/types/Comment'


const transformComment = (comment: Comment): IComment => {
    return {
        id: comment._id,
        creator: {
            id: comment.creator._id,
            username: comment.creator.username,
            photoUrl: comment.creator.photoUrl,
        },
        body: comment.text,
        postId: comment.postId,
        isLiked: comment.liked,
        likesCount: comment.likesCount,
        repliesCount: comment.repliesCount,
        replies: comment.replies.map(transformComment),
        showReplies: comment.showReplies,
        repliesLoading: comment.repliesLoading,
        createdAt: comment.createdAt,
    }
}

export function useCommentsForPost(postId: string) {

    const commentsForPost = useQuery<FindCommentsForPostQueryType>(FIND_COMMENTS_FOR_POST, {
        variables: {
            postId,
            offset: 0,
            limit: 10,
        },
    })

    const comments: IComment[] = useMemo(() => {
        if (!commentsForPost.loading && !commentsForPost.error && commentsForPost.data) {
            return commentsForPost.data.findCommentsForPost.data.map(transformComment)
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

    const onFetchMoreComments = () => {
        if (commentsForPost.data) {
            setMoreCommentsLoading(true)
            commentsForPost.fetchMore({
                variables: {
                    offset: commentsForPost.data.findCommentsForPost.data.length,
                },
                updateQuery(existing: FindCommentsForPostQueryType, { fetchMoreResult }: { fetchMoreResult: FindCommentsForPostQueryType }) {
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

    return {
        comments,
        commentsLoading: commentsForPost.loading || moreCommentsLoading,
        hasMoreComments,
        onFetchMoreComments,
    }
}