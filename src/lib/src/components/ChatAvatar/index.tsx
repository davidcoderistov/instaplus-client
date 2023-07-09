import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'


interface StaticProps {
    loading?: never
    photoUrls: (string | null)[]
    containerSize: number
    avatarSize: number
    dense?: boolean
}

interface LoadingProps {
    loading: true
    photoUrls?: never
    containerSize: number
    avatarSize?: never
    dense?: never
}

type Props = StaticProps | LoadingProps

export default function ChatAvatar(props: Props) {

    const containerSizePx = useMemo(() => `${props.containerSize}px`, [props.containerSize])
    const avatarSizePx = useMemo(() => `${props.avatarSize}px`, [props.avatarSize])
    const padding = useMemo(() => props.dense ? '1px' : '2px', [props.dense])

    return (
        <Box
            component='div'
            height={containerSizePx}
            width={containerSizePx}
            position='relative'
            display='block'
        >
            {props.loading ? (
                <Skeleton
                    variant='circular'
                    width={props.containerSize}
                    height={props.containerSize}
                    sx={{ backgroundColor: '#202020' }} />
            ) : (
                <>
                    <Box
                        component='span'
                        height={avatarSizePx}
                        width={avatarSizePx}
                        position='relative'
                        display='block'
                        sx={{
                            borderBottomLeftRadius: '50%',
                            borderTopRightRadius: '50%',
                            overflowX: 'hidden',
                            borderBottomRightRadius: '50%',
                            borderTopLeftRadius: '50%',
                            overflowY: 'hidden',
                        }}
                    >
                        {props.photoUrls.length > 0 ? props.photoUrls[0] ? (
                            <img alt='User avatar'
                                 style={{
                                     height: '100%',
                                     width: '100%',
                                     border: '0',
                                     overflowClipMargin: 'content-box',
                                     overflow: 'clip',
                                 }}
                                 height={`${props.avatarSize}`}
                                 src={props.photoUrls[0]}
                                 width={`${props.avatarSize}`} />
                        ) : (
                            <Avatar sx={{ height: props.avatarSize, width: props.avatarSize }} />
                        ) : null}
                    </Box>
                    {props.photoUrls.length > 1 && (
                        <Box
                            component='div'
                            bgcolor='#000000'
                            paddingRight={padding}
                            right='0'
                            paddingTop={padding}
                            paddingLeft={padding}
                            bottom='0'
                            paddingBottom={padding}
                            position='absolute'
                            display='block'
                            sx={{
                                borderBottomLeftRadius: '50%',
                                borderTopRightRadius: '50%',
                                borderBottomRightRadius: '50%',
                                borderTopLeftRadius: '50%',
                            }}
                        >
                            <Box
                                component='span'
                                height={avatarSizePx}
                                width={avatarSizePx}
                                position='relative'
                                display='block'

                                sx={{
                                    borderBottomLeftRadius: '50%',
                                    borderTopRightRadius: '50%',
                                    overflowX: 'hidden',
                                    borderBottomRightRadius: '50%',
                                    borderTopLeftRadius: '50%',
                                    overflowY: 'hidden',
                                }}
                            >
                                {props.photoUrls[1] ? (
                                    <img alt='User avatar'
                                         style={{
                                             height: '100%',
                                             width: '100%',
                                             border: '0',
                                             overflowClipMargin: 'content-box',
                                             overflow: 'clip',
                                         }}
                                         height={`${props.avatarSize}`}
                                         src={props.photoUrls[1]}
                                         width={`${props.avatarSize}`} />
                                ) : (
                                    <Avatar sx={{ height: props.avatarSize, width: props.avatarSize }} />
                                )}
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Box>
    )
}