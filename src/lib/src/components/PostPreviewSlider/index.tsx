import { useState, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import ImagePreview from '../ImagePreview'
import VideoPreviewPlayer from '../VideoPreviewPlayer'
import PostSliderArrow from '../PostSliderArrow'


interface Photo {
    id: number
    visible: boolean
    isVideo: false
    photoUrl: string
}

interface Video {
    id: number
    visible: boolean
    isVideo: true
    photoUrl: string
    videoUrl: string
    isPlaying: boolean
    isMuted: boolean
}

type Media = Photo | Video

interface MediaProp {
    photoUrl: string
    videoUrl: string | null
}

interface Props {
    media: MediaProp[]
    loading: boolean
    large?: boolean
    dense?: boolean
}

export default function PostPreviewSlider(props: Props) {

    const [media, setMedia] = useState<Media[]>([])

    useEffect(() => {
        setMedia(props.media.map((media, index) => {
            const isVideo = Boolean(media.videoUrl)
            return {
                id: index,
                visible: index < 1,
                isVideo,
                photoUrl: media.photoUrl,
                ...isVideo && {
                    videoUrl: media.videoUrl,
                    isPlaying: index < 1,
                    isMuted: index > 0,
                },
            }
        }))
    }, [props.media])

    const handlePlayVideo = (index: number) => {
        if (index < media.length) {
            setMedia(media => media.map(media => {
                if (media.id === index) {
                    if (media.isVideo) {
                        return {
                            ...media,
                            isPlaying: !media.isPlaying,
                        }
                    }
                }
                return media
            }))
        }
    }

    const handleMuteVideo = (index: number) => {
        if (index < media.length) {
            setMedia(media => media.map(media => {
                if (media.id === index) {
                    if (media.isVideo) {
                        return {
                            ...media,
                            isMuted: !media.isMuted,
                        }
                    }
                }
                return media
            }))
        }
    }

    const handleSlideLeft = (index: number) => {
        setMedia(media => media.map(media => ({
            ...media,
            visible: media.id === index - 1,
            ...media.isVideo && { isPlaying: false },
        })))
    }

    const handleSlideRight = (index: number) => {
        setMedia(media => media.map(media => ({
            ...media,
            visible: media.id === index + 1,
            ...media.isVideo && { isPlaying: false },
        })))
    }

    const Slider = useMemo(() => {
        return media.length > 1 ? (
            <Box
                component='div'
                alignItems='center'
                bottom='15px'
                justifyContent='center'
                left='6px'
                right='6px'
                position='absolute'
                flexDirection='row'
                display='flex'
                sx={{
                    pointerEvents: 'none',
                }}
            >
                {media.map(media => (
                    <Box
                        key={media.id}
                        marginRight='4px'
                        borderRadius='50%'
                        height='6px'
                        width='6px'
                        sx={{
                            background: '#FFFFFF',
                            opacity: media.visible ? 1 : 0.4,
                        }}
                    />
                ))}
            </Box>
        ) : null
    }, [media])

    return (
        <>
            {props.loading ? (
                <ImagePreview
                    visible
                    large={props.large}
                    dense={props.dense}
                    photoUrl={null} />
            ) : media.map((media, index, arr) => {

                const LeftSliderArrow = index > 0 && arr.length > 1 ? (
                    <PostSliderArrow
                        left
                        onClick={() => handleSlideLeft(index)}
                    />
                ) : null

                const RightSliderArrow = index < arr.length - 1 && arr.length > 1 ? (
                    <PostSliderArrow
                        right
                        onClick={() => handleSlideRight(index)}
                    />
                ) : null

                return media.isVideo ? (
                    <VideoPreviewPlayer
                        key={index}
                        visible={media.visible}
                        large={props.large}
                        dense={props.dense}
                        videoUrl={media.videoUrl}
                        isPlaying={media.isPlaying}
                        isMuted={media.isMuted}
                        leftSliderArrow={LeftSliderArrow}
                        rightSliderArrow={RightSliderArrow}
                        slider={Slider}
                        onPlay={() => handlePlayVideo(index)}
                        onMute={() => handleMuteVideo(index)} />
                ) : (
                    <ImagePreview
                        key={index}
                        visible={media.visible}
                        large={props.large}
                        dense={props.dense}
                        photoUrl={media.photoUrl}
                        leftSliderArrow={LeftSliderArrow}
                        rightSliderArrow={RightSliderArrow}
                        slider={Slider} />
                )
            })}
        </>
    )
}