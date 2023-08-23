import { Post, Comment } from '../../models'


export interface CreatePostMutationType {
    createPost: Post
}

export interface CreateCommentMutationType {
    createComment: Comment
}