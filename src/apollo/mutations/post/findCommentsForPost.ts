import { FindCommentsForPostQueryType } from '../../../graphql/types/queries/post'
import { Comment } from '../../../graphql/types/models'


const updateOne = (comments: Comment[], commentId: string, updateCb: (comment: Comment) => Comment): Comment[] => {
    return comments.map(comment => {
        if (comment._id === commentId) {
            return updateCb(comment)
        }
        if (comment.replies.length > 0) {
            return {
                ...comment,
                replies: updateOne(comment.replies, commentId, updateCb),
            }
        }
        return comment
    })
}

interface UpdateCommentOptions {
    queryData: FindCommentsForPostQueryType
    variables: {
        commentId: string
        updateCb(comment: Comment): Comment
    }
}

interface UpdateCommentReturnValue {
    queryResult: FindCommentsForPostQueryType
}

export function updateComment({
                                  queryData,
                                  variables: { commentId, updateCb },
                              }: UpdateCommentOptions): UpdateCommentReturnValue {
    return {
        queryResult: {
            findCommentsForPost: {
                ...queryData.findCommentsForPost,
                data: updateOne(
                    queryData.findCommentsForPost.data,
                    commentId,
                    updateCb,
                ),
            },
        },
    }
}

const mutations = {
    updateComment,
}

export default mutations