import { useRef } from 'react'
import Box from '@mui/material/Box'
import PostPreviewSlider from '../PostPreviewSlider'
import CaptionInput from './CaptionInput'
import LocationInput from './LocationInput'
import Button from '../Button'
import UserAvatar from './UserAvatar'


interface IHashtag {
    _id: string | number
    name: string
    postIds: string[]
}

interface Props {
    photoUrls: string[]
    user: {
        username: string
        photoUrl: string | null
    }
    isSharing: boolean
    hashtags: IHashtag[]
    hashtagsLoading: boolean

    onFetchHashtags(searchQuery: string): void

    onSharePost(caption: string, location: string, hashtags: string[]): void
}

export default function CreatePost(props: Props) {

    const caption = useRef('')
    const location = useRef('')

    const handleChangeCaption = (value: string) => {
        caption.current = value
    }

    const handleChangeLocation = (value: string) => {
        location.current = value
    }

    const handleSharePost = () => {
        const r = /#[^\s#]+/g
        const hashtags = caption.current.match(r)
        props.onSharePost(caption.current, location.current, Array.isArray(hashtags) ? hashtags : [])
    }

    return (
        <Box
            component='div'
            width='843px'
            flexShrink='1'
            flexBasis='auto'
            display='flex'
            flexGrow='1'
        >
            <Box
                component='div'
                justifyContent='center'
                display='flex'
                height='100%'
                position='relative'
                alignItems='flex-start'
                width='503px'
            >
                <PostPreviewSlider
                    photoUrls={props.photoUrls}
                    loading={false}
                />
            </Box>
            <Box
                component='div'
                boxSizing='border-box'
                display='flex'
                position='relative'
                width='340px'
                borderLeft='1px solid #363636'
            >
                <Box
                    component='div'
                    borderRadius='0'
                    bgcolor='transparent'
                    minWidth='0'
                    flexDirection='column'
                    boxSizing='border-box'
                    display='flex'
                    minHeight='0'
                    alignItems='stretch'
                    alignSelf='auto'
                    justifyContent='flex-start'
                    position='relative'
                    flexGrow='1'
                    sx={{
                        overflowY: 'visible',
                        overflowX: 'visible',
                    }}
                >
                    <Box
                        component='div'
                        alignItems='stretch'
                        border='0'
                        boxSizing='border-box'
                        display='flex'
                        flexDirection='column'
                        fontSize='100%'
                        padding='0'
                        position='relative'
                        sx={{ verticalAlign: 'baseline' }}
                    >
                        <UserAvatar
                            username={props.user.username}
                            photoUrl={props.user.photoUrl} />
                        <CaptionInput
                            hashtags={props.hashtags}
                            hashtagsLoading={props.hashtagsLoading}
                            onFetchHashtags={props.onFetchHashtags}
                            onChangeValue={handleChangeCaption} />
                        <LocationInput onChangeLocation={handleChangeLocation} />
                        <Box
                            component='div'
                            borderRadius='0'
                            bgcolor='transparent'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            flexShrink='0'
                            alignItems='stretch'
                            alignSelf='auto'
                            justifyContent='flex-start'
                            position='relative'
                            flexGrow='0'
                            marginTop='25px'
                            paddingX='16px'
                            sx={{
                                overflowY: 'visible',
                                overflowX: 'visible',
                            }}
                        >
                            <Button
                                variant='primary'
                                text='Share'
                                contained
                                loading={props.isSharing}
                                onClick={handleSharePost}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}