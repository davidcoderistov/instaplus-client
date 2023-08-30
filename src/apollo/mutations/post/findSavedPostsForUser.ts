import { FindSavedPostsForUserQueryType } from '../../../graphql/types/queries/post'
import { Post } from '../../../graphql/types/models'


interface AddSavedPostOptions {
    queryData: FindSavedPostsForUserQueryType
    variables: {
        post: Pick<Post, '_id' | 'photoUrls'>
    }
}

interface AddSavedPostReturnValue {
    queryResult: FindSavedPostsForUserQueryType
}

export function addSavedPost(options: AddSavedPostOptions): AddSavedPostReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findSavedPostsForUser: {
                ...options.queryData.findSavedPostsForUser,
                data: [options.variables.post, ...options.queryData.findSavedPostsForUser.data],
            },
        },
    }
}

const mutations = {
    addSavedPost,
}

export default mutations