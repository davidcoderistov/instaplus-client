import { FindPostsForUserQueryType } from '../../../graphql/types/queries/post'
import { Post } from '../../../graphql/types/models'


interface AddPostOptions {
    queryData: FindPostsForUserQueryType
    variables: {
        post: Pick<Post, '_id' | 'photoUrls'>
    }
}

interface AddPostReturnValue {
    queryResult: FindPostsForUserQueryType
}

export function addPost(options: AddPostOptions): AddPostReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findPostsForUser: {
                ...options.queryData.findPostsForUser,
                data: [options.variables.post, ...options.queryData.findPostsForUser.data],
            },
        },
    }
}

const mutations = {
    addPost,
}

export default mutations