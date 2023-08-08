import Box from '@mui/material/Box'
import PostActionsLikeButton from '../PostActionsLikeButton'
import PostActionsCommentButton from '../PostActionsCommentButton'
import PostActionsSaveButton from '../PostActionsSaveButton'


interface Props {
    postId: string | number

    dense?: boolean

    isPostLiked: boolean

    onLikePost(postId: string | number): void

    onUnlikePost(postId: string | number): void

    isPostSaved: boolean

    onSavePost(postId: string | number): void

    onRemovePost(postId: string | number): void

    onCommentOnPost?(postId: string | number): void
}


export default function PostActions(props: Props) {

    const handleLikePost = () => {
        props.onLikePost(props.postId)
    }

    const handleUnlikePost = () => {
        props.onUnlikePost(props.postId)
    }

    const handleSavePost = () => {
        props.onSavePost(props.postId)
    }

    const handleRemovePost = () => {
        props.onRemovePost(props.postId)
    }

    const handleCommentOnPost = () => {
        if (props.onCommentOnPost) {
            props.onCommentOnPost(props.postId)
        }
    }

    return (
        <Box
            component='div'
            marginTop='4px'
            marginBottom='0'
            marginX='0'
            display='flex'
            flexDirection='row'
            overflow='visible'
            paddingBottom={props.dense ? '6px' : '8px'}
            paddingLeft={props.dense ? '0' : '16px'}
            paddingRight={props.dense ? '0' : '16px'}
            paddingTop={props.dense ? '0' : '6px'}
            sx={{
                ...!props.dense && {
                    order: '3',
                    borderTop: '1px solid #262626',
                },
            }}
        >
            <Box
                component='span'
                display='inline-block'
                marginLeft='-8px'
            >
                <PostActionsLikeButton
                    isPostLiked={props.isPostLiked}
                    onLikePost={handleLikePost}
                    onUnlikePost={handleUnlikePost} />
            </Box>
            <Box
                component='span'
                display='inline-block'
            >
                <PostActionsCommentButton onClick={handleCommentOnPost} />
            </Box>
            <Box
                component='span'
                display='inline-block'
                marginLeft='auto'
                marginRight='-10px'
                padding='0'
                sx={{ verticalAlign: 'baseline' }}
            >
                <PostActionsSaveButton
                    isPostSaved={props.isPostSaved}
                    onSavePost={handleSavePost}
                    onRemovePost={handleRemovePost} />
            </Box>
        </Box>
    )
}