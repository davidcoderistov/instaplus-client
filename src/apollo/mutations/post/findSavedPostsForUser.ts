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

interface RemoveSavedPostOptions {
    queryData: FindSavedPostsForUserQueryType
    variables: {
        postId: string
    }
}

interface RemoveSavedPostReturnValue {
    queryResult: FindSavedPostsForUserQueryType
}

export function removeSavedPost(options: RemoveSavedPostOptions): RemoveSavedPostReturnValue {

    const data = Array.from(options.queryData.findSavedPostsForUser.data)
    const findPostIndex = data.findIndex(post => post._id === options.variables.postId)

    if (findPostIndex >= 0) {
        data.splice(findPostIndex, 1)
    }

    return {
        queryResult: {
            ...options.queryData,
            findSavedPostsForUser: {
                ...options.queryData.findSavedPostsForUser,
                data,
            },
        },
    }
}

const mutations = {
    addSavedPost,
    removeSavedPost,
}

export default mutations