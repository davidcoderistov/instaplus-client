import { useMemo } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { UNSAVE_POST } from '../../graphql/mutations/post'
import { PostDetails } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useUnsavePost() {

    const client = useApolloClient()

    const [unsavePost] = useMutation(UNSAVE_POST)

    const _unsavePost = useMemo(() => _debounce((postId: string) => {
        unsavePost({
            variables: {
                postId,
            },
        }).then(() => {
            // TODO: Remove post from user favorites
        }).catch(() => {
        })
    }, 500, { trailing: true }), [])

    return (postId: string) => {
        client.cache.updateFragment({
            id: `PostDetails:${postId}`,
            fragment: gql`
                fragment UnsavePostDetails on PostDetails {
                    saved
                }
            `,
        }, (postDetails: Pick<PostDetails, 'saved'> | null) => {
            if (postDetails) {
                return {
                    ...postDetails,
                    saved: false,
                }
            }
        })
        _unsavePost(postId)
    }
}