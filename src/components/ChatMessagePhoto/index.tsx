import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { PlayArrow } from '@mui/icons-material'


interface LoadingProps {
    loading: true
    photoUrl?: never
    orientation?: never
    reply?: never
    isVideo?: never
    borderRadius?: never
    onClick?: never
}

interface StaticProps {
    loading?: never
    photoUrl: string
    orientation: 'portrait' | 'landscape'
    reply?: boolean
    isVideo?: boolean
    borderRadius?: {
        topLeft: string
        bottomLeft: string
        topRight: string
        bottomRight: string
    }

    onClick(): void
}

type Props = LoadingProps | StaticProps

export default function ChatMessagePhoto({
                                             photoUrl,
                                             orientation,
                                             reply,
                                             loading,
                                             isVideo,
                                             borderRadius,
                                             onClick,
                                         }: Props) {

    const maxWidth = reply ? 141 : 236
    const maxHeight = reply ? 204 : 225
    const paddingBottom = orientation === 'portrait' ? 150 : 66.6667
    const aspectRatio = orientation === 'portrait' ? 320 / 480 : 600 / 400
    const width = aspectRatio * maxHeight

    const borderBottomLeftRadius = reply || !borderRadius ? '18px' : borderRadius.bottomLeft
    const borderTopLeftRadius = reply || !borderRadius ? '18px' : borderRadius.topLeft
    const borderBottomRightRadius = reply || !borderRadius ? '18px' : borderRadius.bottomRight
    const borderTopRightRadius = reply || !borderRadius ? '18px' : borderRadius.topRight

    return (
        <Box
            component='div'
            zIndex='1'
            position='relative'
            maxWidth='100%'
            display='block'
        >
            <Box
                component='div'
                bgcolor='transparent'
                paddingTop='0'
                minWidth='0'
                flexBasis='auto'
                marginTop='0'
                marginBottom='0'
                boxSizing='border-box'
                display='flex'
                paddingRight='0'
                minHeight='0'
                flexShrink='0'
                alignItems='stretch'
                flexDirection='row'
                position='relative'
                marginLeft='0'
                zIndex='0'
                paddingBottom='0'
                textAlign='inherit'
                marginRight='0'
                sx={{
                    borderBottomLeftRadius: borderBottomLeftRadius,
                    borderTopLeftRadius: borderTopLeftRadius,
                    borderBottomRightRadius: borderBottomRightRadius,
                    borderTopRightRadius: borderTopRightRadius,
                    borderRightStyle: 'solid',
                    borderBottomColor: '#0000000d',
                    borderLeftWidth: '0',
                    paddingLeft: '0',
                    borderTopColor: '#0000000d',
                    touchAction: 'manipulation',
                    borderRightWidth: '0',
                    borderRightColor: '#0000000d',
                    borderTopWidth: '0',
                    userSelect: 'none',
                    overflowX: 'hidden',
                    borderLeftColor: '#0000000d',
                    borderLeftStyle: 'solid',
                    cursor: 'pointer',
                    outlineStyle: 'none',
                    borderBottomWidth: '0',
                    borderBottomStyle: 'solid',
                    borderTopStyle: 'solid',
                    overflowY: 'hidden',
                }}
                onClick={onClick}
            >
                <Box
                    component='div'
                    boxSizing='border-box'
                    position='relative'
                    zIndex='0'
                    display='block'
                >
                    <Box
                        component='div'
                        maxWidth='100%'
                        display='block'
                    >
                        <Box
                            component='div'
                            maxWidth={`${maxWidth}px`}
                            display='block'
                        >
                            <Box
                                component='div'
                                maxWidth='100%'
                                width={`${width}px`}
                                flexDirection='column'
                                marginTop='0'
                                marginBottom='0'
                                display='flex'
                                position='relative'
                                marginLeft='0'
                                marginRight='0'
                                sx={{
                                    borderBottomLeftRadius: '22px',
                                    borderTopLeftRadius: '22px',
                                    borderBottomRightRadius: '22px',
                                    borderTopRightRadius: '22px',
                                }}
                            >
                                <Box
                                    component='div'
                                    paddingBottom={`${paddingBottom}%`}
                                    height='auto'
                                    width='100%'
                                    position='relative'
                                    display='block'
                                >
                                    <Box
                                        component='div'
                                        width='100%'
                                        right='0'
                                        boxSizing='border-box'
                                        height='100%'
                                        bottom='0'
                                        left='0'
                                        top='0'
                                        position='absolute'
                                        display='block'
                                    >
                                        {loading ? (
                                            <Box
                                                component='div'
                                                display='flex'
                                                maxHeight={`${maxHeight}px`}
                                                maxWidth='100%'
                                                width='100%'
                                                height='100%'
                                                border='0'
                                                bgcolor='#202020'
                                                justifyContent='center'
                                                alignItems='center'
                                            >
                                                <CircularProgress sx={{ color: '#FFFFFF' }} size={30} />
                                            </Box>
                                        ) : (
                                            <img
                                                alt='Open photo'
                                                style={{
                                                    display: 'block',
                                                    maxHeight: `${maxHeight}px`,
                                                    maxWidth: '100%',
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 0,
                                                    overflowClipMargin: 'content-box',
                                                    overflow: 'clip',
                                                }}
                                                src={photoUrl}
                                            />
                                        )}
                                        {isVideo && (
                                            <Box
                                                component='div'
                                                position='absolute'
                                                top='calc(50% - 18.5px)'
                                                left='calc(50% - 22.9px)'
                                                color='red'
                                            >
                                                <PlayArrow sx={{ color: '#FFFFFF', fontSize: 50 }} />
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    component='div'
                    right='0'
                    bgcolor='#0000000d'
                    bottom='0'
                    left='0'
                    top='0'
                    position='absolute'
                    display='block'
                    sx={{
                        opacity: '0',
                        pointerEvents: 'none',
                        borderTopRightRadius: 'inherit',
                        borderTopLeftRadius: 'inherit',
                        borderBottomRightRadius: 'inherit',
                        borderBottomLeftRadius: 'inherit',
                    }}
                />
            </Box>
        </Box>
    )
}