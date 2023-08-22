import { useMemo } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { SAVE_POST } from '../../graphql/mutations/post'
import { PostDetails } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useSavePost() {

    const client = useApolloClient()

    const [savePost] = useMutation(SAVE_POST)

    const _savePost = useMemo(() => _debounce((postId: string) => {
        savePost({
            variables: {
                postId,
            },
        }).then(() => {
            // TODO: Add post to user favorites
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