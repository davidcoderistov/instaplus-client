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

const mutations = {
    addPost,
}

export default mutations