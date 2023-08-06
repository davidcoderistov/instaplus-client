import { useMutation } from '@apollo/client'
import { useAuthUser, useSearchResults } from '../../hooks/misc'
import { FIND_HASHTAGS_BY_SEARCH_QUERY } from '../../graphql/queries/post'
import { FindHashtagsBySearchQueryQueryType } from '../../graphql/types/queries/post'
import { CREATE_POST } from '../../graphql/mutations/post'
import { CreatePostMutationType } from '../../graphql/types/mutations/post'
import { Hashtag } from '../../graphql/types/models'
import InstaCreatePostModal from '../../lib/src/components/CreatePostModal'


interface Props {
    open: boolean

    onCloseModal(): void
}

export default function CreatePostModal(props: Props) {

    const [authUser] = useAuthUser()

    const [onSearch, { searchResults, isSearching }] = useSearchResults<FindHashtagsBySearchQueryQueryType, Hashtag>(
        FIND_HASHTAGS_BY_SEARCH_QUERY,
        (queryData) => queryData.findHashtagsBySearchQuery,
    )

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