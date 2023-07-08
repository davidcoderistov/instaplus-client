import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import MediaItem from '../MediaItem'


interface MediaItem {
    id: string | number
    photoUrl: string | null
    multiple?: true
    video?: true
    reel?: true
    viewsCount?: number | string
    showComments?: true
    commentsCount?: number | string
}

interface Props {
    items: MediaItem[]

    onClick(id: string | number): void
}

export default function MediaGallery({ items, onClick }: Props) {

    const chunkedItems = useMemo(() => {
        const chunkedItems: MediaItem[][] = []
        for (let i = 0; i < items.length; i += 3) {
            chunkedItems.push(items.slice(i, i + 3))
        }
        return chunkedItems
    }, [items])

    return (
        <Box
            component='div'
            minHeight='0'
            minWidth='0'
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='stretch'
            alignContent='stretch'
            boxSizing='border-box'
            position='relative'
        >
            <Box
                component='div'
                display='block'
                flexGrow='1'
            >
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        display='flex'
                        flexDirection='column'
                        paddingBottom='0'
                        paddingTop='0'
                        position='relative'
                    >
                        {chunkedItems.map((itemsChunk, index) => (
                            <Box
                                key={index}
                                component='div'
                                display='flex'
                                flexDirection='row'
                                alignItems='stretch'
                                flexShrink='0'
                                boxSizing='border-box'
                                position='relative'
                                sx={{
                                    '&:last-child': { marginBottom: 0 },
                                    '@media (min-width: 736px)': { marginBottom: '4PX' },
                                }}
                            >
                                {[...Array(3).keys()].map(itemIndex => (
                                    <Box
                                        key={itemIndex < itemsChunk.length ? isNaN(itemsChunk[itemIndex].id) ? itemsChunk[itemIndex].id : itemsChunk[itemIndex].id * 100 : index * chunkedItems.length + itemIndex}
                                        component='div'
                                        flex='1 0 0%'
                                        display='block'
                                        position='relative'
                                        width='100%'
                                        sx={{
                                            '&:last-child': { marginRight: 0 },
                                            '@media (min-width: 736px)': { marginRight: '4px' },
                                        }}
                                    >
                                        {itemIndex < itemsChunk.length && (
                                            <MediaItem
                                                id={itemsChunk[itemIndex].id}
                                                photoUrl={itemsChunk[itemIndex].photoUrl}
                                                multiple={itemsChunk[itemIndex].multiple}
                                                video={itemsChunk[itemIndex].video}
                                                reel={itemsChunk[itemIndex].reel}
                                                viewsCount={itemsChunk[itemIndex].viewsCount}
                                                showComments={itemsChunk[itemIndex].showComments}
                                                commentsCount={itemsChunk[itemIndex].commentsCount}
                                                onClick={onClick}
                                            />
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}