import { useState, useMemo, useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { ArrowBack, Close } from '@mui/icons-material'
import UploadMedia from './UploadMedia'
import CreatePost from './CreatePost'
import DiscardChangesModal from '../DiscardChangesModal'


interface IHashtag {
    _id: string | number
    name: string
    postsCount: number
}

interface Props {
    open: boolean
    user: {
        username: string
        photoUrl: string | null
    }
    isSharing: boolean
    hashtags: IHashtag[]
    hashtagsLoading: boolean

    onFetchHashtags(searchQuery: string): void

    onSharePost(files: File[], caption: string | null, location: string | null, hashtags: string[]): void

    onCloseModal(): void
}

export default function CreatePostModal(props: Props) {

    const isGoingBack = useRef(false)

    const [isUploadingMedia, setIsUploadingMedia] = useState(true)

    const handleGoBack = () => {
        openDiscardChangesModal()
        isGoingBack.current = true
    }

    const [files, setFiles] = useState<File[]>([])

    const handleUploadFiles = (files: File[]) => {
        setIsUploadingMedia(false)
        setFiles(files)
    }

    const photoUrls: string[] = useMemo(() => files.map(URL.createObjectURL), [files])

    const handleSharePost = (caption: string | null, location: string | null, hashtags: string[]) => {
        props.onSharePost(files, caption, location, hashtags)
        photoUrls.forEach(URL.revokeObjectURL)
    }

    const handleCloseModal = () => {
        if (isUploadingMedia) {
            props.onCloseModal()
        } else {
            openDiscardChangesModal()
        }
    }

    const [isDiscardChangesModalOpen, setIsDiscardChangesModalOpen] = useState(false)

    const openDiscardChangesModal = () => {
        setIsDiscardChangesModalOpen(true)
    }

    const closeDiscardChangesModal = () => {
        setIsDiscardChangesModalOpen(false)
    }

    const handleDiscardChanges = () => {
        if (isGoingBack.current) {
            isGoingBack.current = false
            setIsUploadingMedia(true)
        } else {
            props.onCloseModal()
        }
        closeDiscardChangesModal()
    }

    const handleCloseDiscardChangesModal = () => {
        isGoingBack.current = false
        closeDiscardChangesModal()
    }

    return (
        <Dialog
            open={props.open}
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#262626',
                    borderRadius: '12px',
                    maxWidth: isUploadingMedia ? '503px' : '843px',
                    height: '545px',
                },
            }}
            onClose={handleCloseModal}
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                borderBottom='1px solid #363636'
            >
                {isUploadingMedia ? (
                    <Box component='div' />
                ) : (
                    <IconButton onClick={handleGoBack}>
                        <ArrowBack sx={{ color: '#FFFFFF' }} />
                    </IconButton>
                )}
                <Typography
                    color='#FFFFFF'
                    position='absolute'
                    left='50%'
                    sx={{
                        transform: 'translateX(-50%)',
                    }}
                >
                    Create new post
                </Typography>
                <IconButton
                    aria-label='close'
                    onClick={handleCloseModal}
                >
                    <Close sx={{ color: '#FFFFFF' }} />
                </IconButton>
            </Box>
            {isUploadingMedia ? (
                <UploadMedia
                    onUploadFiles={handleUploadFiles}
                />
            ) : (
                <CreatePost
                    photoUrls={photoUrls}
                    user={props.user}
                    isSharing={props.isSharing}
                    hashtags={props.hashtags}
                    hashtagsLoading={props.hashtagsLoading}
                    onFetchHashtags={props.onFetchHashtags}
                    onSharePost={handleSharePost} />
            )}
            <DiscardChangesModal
                open={isDiscardChangesModalOpen}
                onDiscardChanges={handleDiscardChanges}
                onCloseModal={handleCloseDiscardChangesModal}
            />
        </Dialog>
    )
}