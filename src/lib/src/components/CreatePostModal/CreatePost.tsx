import { useRef } from 'react'
import Box from '@mui/material/Box'
import PostPreviewSlider from '../PostPreviewSlider'
import CaptionInput from './CaptionInput'
import LocationInput from './LocationInput'
import Button from '../Button'
import UserAvatar from './UserAvatar'


interface Media {
    photoUrl: string | null
    videoUrl: string | null
}

interface Props {
    media: Media[]
    user: {
        username: string
        photoUrl?: string | null
    }
    isSharing: boolean

    onSharePost(caption: string, location: string): void
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
        props.onSharePost(caption.current, location.current)
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
                    media={props.media}
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
                        <CaptionInput onChangeValue={handleChangeCaption} />
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