import { Post, Comment } from '../../models'


export interface CreatePostMutationType {
    createPost: Post
}

export interface CreateCommentMutationType {
    createComment: Comment
}

export interface SavePostMutationType {
    savePost: Pick<Post, '_id' | 'photoUrls'>
}

export interface UnsavePostMutationType {
    unsavePost: Pick<Post, '_id'>
}