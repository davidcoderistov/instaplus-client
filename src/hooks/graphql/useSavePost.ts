import { useMemo } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { addSavedPost } from '../../apollo/mutations/post/findSavedPostsForUser'
import { SAVE_POST } from '../../graphql/mutations/post'
import { SavePostMutationType } from '../../graphql/types/mutations/post'
import { FIND_SAVED_POSTS_FOR_USER } from '../../graphql/queries/post'
import { FindSavedPostsForUserQueryType } from '../../graphql/types/queries/post'
import { PostDetails } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useSavePost() {

    const client = useApolloClient()

    const [savePost] = useMutation<SavePostMutationType>(SAVE_POST)

    const _savePost = useMemo(() => _debounce((postId: string) => {
        savePost({
            variables: {
                postId,
            },
        }).then(({ data }) => {
            if (data) {
                client.cache.updateQuery({
                    query: FIND_SAVED_POSTS_FOR_USER,
                }, (findSavedPostsForUser: FindSavedPostsForUserQueryType | null) => {
                    if (findSavedPostsForUser) {
                        return addSavedPost({
                            queryData: findSavedPostsForUser,
                            variables: { post: data.savePost },
                        }).queryResult
                    }
                })
            }
        }).catch(() => {
        })
    }, 500, { trailing: true }), [])

    return (postId: string) => {
        client.cache.updateFragment({
            id: `PostDetails:${postId}`,
            fragment: gql`
                fragment SavePostDetails on PostDetails {
                    saved
                }
            `,
        }, (postDetails: Pick<PostDetails, 'saved'> | null) => {
            if (postDetails) {
                return {
                    ...postDetails,
                    saved: true,
                }
            }
        })
        _savePost(postId)
    }
}