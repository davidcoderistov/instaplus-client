import { useMemo } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { removeSavedPost } from '../../apollo/mutations/post/findSavedPostsForUser'
import { UNSAVE_POST } from '../../graphql/mutations/post'
import { UnsavePostMutationType } from '../../graphql/types/mutations/post'
import { FIND_SAVED_POSTS_FOR_USER } from '../../graphql/queries/post'
import { FindSavedPostsForUserQueryType } from '../../graphql/types/queries/post'
import { PostDetails } from '../../graphql/types/models'
import _debounce from 'lodash/debounce'


export function useUnsavePost() {

    const client = useApolloClient()

    const [unsavePost] = useMutation<UnsavePostMutationType>(UNSAVE_POST)

    const _unsavePost = useMemo(() => _debounce((postId: string) => {
        unsavePost({
            variables: {
                postId,
            },
        }).then(({ data }) => {
            if (data) {
                client.cache.updateQuery({
                    query: FIND_SAVED_POSTS_FOR_USER,
                }, (findSavedPostsForUser: FindSavedPostsForUserQueryType | null) => {
                    if (findSavedPostsForUser) {
                        return removeSavedPost({
                            queryData: findSavedPostsForUser,
                            variables: { postId: data.unsavePost._id },
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