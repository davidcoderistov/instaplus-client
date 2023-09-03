import { FindFollowedUsersPostsQueryType } from '../../../graphql/types/queries/post'
import { PostDetails } from '../../../graphql/types/models'


interface AddPostOptions {
    queryData: FindFollowedUsersPostsQueryType
    variables: {
        post: PostDetails
    }
}

interface AddPostReturnValue {
    queryResult: FindFollowedUsersPostsQueryType
}

export function addPost(options: AddPostOptions): AddPostReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findFollowedUsersPosts: {
                ...options.queryData.findFollowedUsersPosts,
                data: [options.variables.post, ...options.queryData.findFollowedUsersPosts.data],
            },
        },
    }
}

interface IncrementCommentsCountOptions {
    queryData: FindFollowedUsersPostsQueryType
    variables: {
        postId: string
    }
}

interface IncrementCommentsCountReturnValue {
    queryResult: FindFollowedUsersPostsQueryType
}

export function incrementCommentsCount(options: IncrementCommentsCountOptions): IncrementCommentsCountReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findFollowedUsersPosts: {
                ...options.queryData.findFollowedUsersPosts,
                data: options.queryData.findFollowedUsersPosts.data.map(post => {
                    if (post._id === options.variables.postId) {
                        return {
                            ...post,
                            commentsCount: post.commentsCount + 1,
                        }
                    }
                    return post
                }),
            },
        },
    }
}

const mutations = {
    addPost,
    incrementCommentsCount,
}

export default mutations