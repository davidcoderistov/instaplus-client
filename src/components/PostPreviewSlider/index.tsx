import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import ImagePreview from '../ImagePreview'
import PostSliderArrow from '../PostSliderArrow'


interface Photo {
    visible: boolean
    photoUrl: string
}

interface Props {
    photoUrls: string[]
    loading: boolean
    large?: boolean
    dense?: boolean
}

export default function PostPreviewSlider(props: Props) {

    const [photos, setPhotos] = useState<Photo[]>(props.photoUrls.map((photoUrl, index) => ({
        visible: index < 1,
        photoUrl,
    })))

    const handleSlideLeft = (index: number) => {
        setPhotos(photos => photos.map((photo, i) => ({
            ...photo,
            visible: i === index - 1,
        })))
    }

    const handleSlideRight = (index: number) => {
        setPhotos(photos => photos.map((photo, i) => ({
            ...photo,
            visible: i === index + 1,
        })))
    }

    const Slider = useMemo(() => {
        return photos.length > 1 ? (
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
                {photos.map((photo, index) => (
                    <Box
                        key={index}
                        marginRight='4px'
                        borderRadius='50%'
                        height='6px'
                        width='6px'
                        sx={{
                            background: '#FFFFFF',
                            opacity: photo.visible ? 1 : 0.4,
                        }}
                    />
                ))}
            </Box>
        ) : null
    }, [photos])

    return (
        <>
            {props.loading ? (
                <ImagePreview
                    visible
                    large={props.large}
                    dense={props.dense}
                    photoUrl={null} />
            ) : photos.map((photo, index, arr) => {

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

                return (
                    <ImagePreview
                        key={index}
                        visible={photo.visible}
                        large={props.large}
                        dense={props.dense}
                        photoUrl={photo.photoUrl}
                        leftSliderArrow={LeftSliderArrow}
                        rightSliderArrow={RightSliderArrow}
                        slider={Slider} />
                )
            })}
        </>
    )
}