import { useApolloClient, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { useAuthUser, useSearchResults } from '../../hooks/misc'
import { FIND_HASHTAGS_BY_SEARCH_QUERY } from '../../graphql/queries/post'
import { FindHashtagsBySearchQueryQueryType } from '../../graphql/types/queries/post'
import { FIND_FOLLOWED_USERS_POSTS } from '../../graphql/queries/post'
import { FindFollowedUsersPostsQueryType } from '../../graphql/types/queries/post'
import findFollowedUsersPostsMutations from '../../apollo/mutations/post/findFollowedUsersPosts'
import { FIND_POSTS_FOR_USER } from '../../graphql/queries/post'
import { FindPostsForUserQueryType } from '../../graphql/types/queries/post'
import findPostsForUserMutations from '../../apollo/mutations/post/findPostsForUser'
import { CREATE_POST } from '../../graphql/mutations/post'
import { CreatePostMutationType } from '../../graphql/types/mutations/post'
import { Hashtag } from '../../graphql/types/models'
import InstaCreatePostModal from '../../lib/src/components/CreatePostModal'


interface Props {
    open: boolean

    onCloseModal(): void
}

export default function CreatePostModal(props: Props) {

    const client = useApolloClient()

    const [authUser] = useAuthUser()

    const [onSearch, { searchResults, isSearching }] = useSearchResults<FindHashtagsBySearchQueryQueryType, Hashtag>(
        FIND_HASHTAGS_BY_SEARCH_QUERY,
        (queryData) => queryData.findHashtagsBySearchQuery,
    )

    const { enqueueSnackbar } = useSnackbar()

    const [createPost, { loading: isSharing }] = useMutation<CreatePostMutationType>(CREATE_POST)

    const handleSharePost = (files: File[], caption: string | null, location: string | null, hashtags: string[]) => {
        createPost({
            variables: {
                caption,
                location,
                photos: files,
                hashtags,
            },
            context: {
                hasUpload: true,
            },
        }).then(({ data }) => {
            if (data) {

                client.cache.updateQuery({
                    query: FIND_FOLLOWED_USERS_POSTS,
                }, (findFollowedUsersPosts: FindFollowedUsersPostsQueryType | null) => {
                    if (findFollowedUsersPosts) {
                        return findFollowedUsersPostsMutations.addPost({
                            queryData: findFollowedUsersPosts,
                            variables: {
                                post: {
                                    _id: data.createPost._id,
                                    post: data.createPost,
                                    liked: false,
                                    saved: false,
                                    commentsCount: 0,
                                    likesCount: 0,
                                    latestTwoLikeUsers: [],
                                    latestThreeFollowedLikeUsers: [],
                                },
                            },
                        }).queryResult
                    }
                })

                client.cache.updateQuery({
                    query: FIND_POSTS_FOR_USER,
                    variables: { userId: authUser._id },
                }, (findPostsForUser: FindPostsForUserQueryType | null) => {
                    if (findPostsForUser) {
                        return findPostsForUserMutations.addPost({
                            queryData: findPostsForUser,
                            variables: {
                                post: data.createPost,
                            },
                        }).queryResult
                    }
                })

                enqueueSnackbar('Post shared', { variant: 'success' })
                props.onCloseModal()
            } else {
                enqueueSnackbar('Post could not be shared', { variant: 'error' })
            }
        }).catch(() => {
            enqueueSnackbar('Post could not be shared', { variant: 'error' })
        })
    }

    return (
        <InstaCreatePostModal
            open={props.open}
            user={authUser}
            isSharing={isSharing}
            hashtags={searchResults}
            hashtagsLoading={isSearching}
            onFetchHashtags={onSearch}
            onSharePost={handleSharePost}
            onCloseModal={props.onCloseModal} />
    )
}