import React, { useState, useMemo, useCallback, MutableRefObject } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import ChatMessagePhoto from '../ChatMessagePhoto'
import { Message } from '../../types/Message'


const Wrapper = (props: { type?: 'wrap' | 'contain', flexGrow: string }) => {

    return (
        <Box
            component='div'
            alignSelf='stretch'
            flexDirection='column'
            bgcolor='#000000'
            display='flex'
            alignItems='inherit'
            flexGrow={props.flexGrow}
            maxWidth='100%'
            justifyContent='flex-end'
        >
            {props.type === 'wrap' && (
                <Box
                    component='div'
                    flexBasis='0'
                    flexGrow='1'
                    display='block'
                />
            )}
            {props.type === 'contain' && (
                <Box
                    component='div'
                    flexShrink='1'
                    display='flex'
                    width='16px'
                    flexGrow='1'
                />
            )}
        </Box>
    )
}

interface Props {
    position: 'start' | 'between' | 'end' | 'solo'
    lhs: boolean
    message: Message
    onClickPhoto: (message: Message) => void | null
    emojiRef: MutableRefObject<Node | null>

    onReact(message: Message, lhs: boolean, event: React.MouseEvent): void

    onReply(message: Message): void
}

export default function ChatMessageBubble(props: Props) {

    const [hovered, setHovered] = useState(false)

    const lhs = useMemo(() => props.lhs, [props.lhs])
    const rhs = useMemo(() => !props.lhs, [props.lhs])

    const hasAvatar = useMemo(() =>
        props.lhs && (props.position === 'end' || props.position === 'solo'), [props.lhs, props.position])
    const hasReactions = useMemo(() =>
            props.message.reactions ?
                (props.message.reactions.items.length > 0 && props.message.reactions.count > 0) : false,
        [props.message.reactions])

    const borderBottomLeftRadius = rhs || props.position === 'end' || props.position === 'solo' ? '18px' : '4px'
    const borderTopLeftRadius = rhs || props.position === 'start' || props.position === 'solo' ? '18px' : '4px'
    const borderBottomRightRadius = lhs || props.position === 'end' || props.position === 'solo' ? '18px' : '4px'
    const borderTopRightRadius = lhs || props.position === 'start' || props.position === 'solo' ? '18px' : '4px'

    const handleClickPhoto = useCallback(() => {
        if (props.onClickPhoto) {
            props.onClickPhoto(props.message)
        }
    }, [props.message, props.onClickPhoto])

    const handleMouseEnter = useCallback(() => {
        setHovered(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
        setHovered(false)
    }, [])

    const handleClickReact = useCallback((event: React.MouseEvent) => {
        props.onReact(props.message, props.lhs, event)
    }, [props.onReact, props.message, props.lhs])

    const handleClickReply = useCallback(() => {
        props.onReply(props.message)
    }, [props.onReply, props.message])

    return (
        <Box
            component='div'
            display='block'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box
                component='div'
                display='flex'
            >
                {rhs && (
                    <Box
                        component='div'
                        alignSelf='stretch'
                        flexDirection='column'
                        bgcolor='#000000'
                        display='flex'
                        paddingRight='8px'
                        paddingLeft='14px'
                        alignItems='inherit'
                        flexGrow='0'
                        maxWidth='100%'
                        justifyContent='flex-end'
                    />
                )}
                {lhs && (
                    <Box
                        component='div'
                        alignSelf='stretch'
                        flexDirection='column'
                        bgcolor='#000000'
                        display='flex'
                        paddingRight='8px'
                        paddingLeft='14px'
                        alignItems='inherit'
                        flexGrow='0'
                        maxWidth='100%'
                        justifyContent='flex-end'
                    >
                        <Box
                            component='div'
                            bgcolor='transparent'
                            paddingLeft='0'
                            paddingTop='0'
                            minWidth='0'
                            flexBasis='auto'
                            marginTop='0'
                            marginBottom='0'
                            boxSizing='border-box'
                            paddingRight='0'
                            minHeight='0'
                            flexShrink='0'
                            display='inline-block'
                            alignItems='stretch'
                            flexDirection='row'
                            position='relative'
                            marginLeft='0'
                            zIndex='0'
                            paddingBottom='0'
                            textAlign='inherit'
                            marginRight='0'
                            sx={{
                                borderRightStyle: 'solid',
                                borderBottomColor: '#00000066',
                                borderLeftWidth: '0',
                                borderTopColor: '#00000066',
                                touchAction: 'manipulation',
                                borderRightWidth: '0',
                                borderRightColor: '#00000066',
                                borderTopWidth: '0',
                                userSelect: 'none',
                                borderTopRightRadius: 'inherit',
                                borderLeftColor: '#00000066',
                                borderLeftStyle: 'solid',
                                cursor: 'pointer',
                                outlineStyle: 'none',
                                borderBottomWidth: '0',
                                borderBottomStyle: 'solid',
                                borderTopLeftRadius: 'inherit',
                                borderBottomRightRadius: 'inherit',
                                borderBottomLeftRadius: 'inherit',
                                borderTopStyle: 'solid',
                            }}
                        >
                            {hasAvatar ? (
                                <Box
                                    component='div'
                                    alignItems='flex-end'
                                    width='28px'
                                    display='flex'
                                    height='28px'
                                >
                                    <Box
                                        component='span'
                                        flexBasis='inherit'
                                        maxHeight='inherit'
                                        justifyContent='inherit'
                                        flexGrow='inherit'
                                        minWidth='inherit'
                                        height='inherit'
                                        minHeight='inherit'
                                        width='inherit'
                                        maxWidth='inherit'
                                        display='inherit'
                                        alignSelf='inherit'
                                        alignItems='inherit'
                                        flexDirection='inherit'
                                        flexShrink='inherit'
                                    >
                                        {props.message.creator.photoUrl ? (
                                            <img style={{
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%',
                                                display: 'inline-block',
                                                border: '0',
                                                overflowClipMargin: 'content-box',
                                                overflow: 'clip',
                                            }}
                                                 src={props.message.creator.photoUrl}
                                                 alt={props.message.creator.username} />
                                        ) : (
                                            <Avatar sx={{ height: 28, width: 28 }} />
                                        )}
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    component='div'
                                    width='28px'
                                    display='block'
                                />
                            )}
                        </Box>
                        {hasReactions && (
                            <Box
                                component='div'
                                height='18px'
                                width='100%'
                                bgcolor='#000000'
                                display='block'
                            />
                        )}
                    </Box>
                )}
                <Box
                    component='div'
                    flexShrink='1'
                    minWidth='0'
                    display='flex'
                    flexGrow='1'
                    sx={{
                        ...rhs && { flexDirection: 'row-reverse' },
                    }}
                >
                    <Box
                        component='div'
                        alignSelf='stretch'
                        flexDirection='column'
                        display='flex'
                        maxWidth='calc(100% - 101px)'
                        alignItems='inherit'
                        justifyContent='flex-end'
                    >
                        <Box
                            component='div'
                            paddingLeft='0'
                            fontSize='100%'
                            paddingTop='0'
                            flexDirection='column'
                            marginTop='0'
                            borderLeft='0'
                            marginBottom='0'
                            boxSizing='border-box'
                            display='flex'
                            paddingRight='0'
                            flexShrink='0'
                            alignItems='stretch'
                            position='relative'
                            marginLeft='0'
                            borderRight='0'
                            paddingBottom='0'
                            marginRight='0'
                            borderBottom='0'
                            borderTop='0'
                            sx={{
                                touchAction: 'manipulation',
                                verticalAlign: 'baseline',
                            }}
                        >
                            <Box
                                component='div'
                                width='100%'
                                display='flex'
                            >
                                {rhs && (
                                    <Wrapper
                                        type='wrap'
                                        flexGrow='1' />
                                )}
                                <Box
                                    component='div'
                                    flexDirection='column'
                                    display='flex'
                                    position='relative'
                                    alignItems={lhs ? 'flex-start' : 'flex-end'}
                                    maxWidth='100%'
                                >
                                    {props.position !== 'start' && (
                                        <Box
                                            component='div'
                                            width='100%'
                                            bgcolor='#000000'
                                            height='2px'
                                            display='block'
                                        />
                                    )}
                                    {props.message.photoUrl && props.message.photoOrientation ? (
                                        <Box
                                            component='div'
                                            alignSelf='stretch'
                                            flexDirection='column'
                                            bgcolor='#000000'
                                            display='flex'
                                            alignItems='inherit'
                                            flexGrow='0'
                                            maxWidth='100%'
                                            justifyContent='flex-end'
                                        >
                                            <ChatMessagePhoto
                                                photoUrl={props.message.photoUrl}
                                                orientation={props.message.photoOrientation}
                                                isVideo={Boolean(props.message.videoUrl)}
                                                borderRadius={{
                                                    topLeft: borderTopLeftRadius,
                                                    bottomLeft: borderBottomLeftRadius,
                                                    topRight: borderTopRightRadius,
                                                    bottomRight: borderBottomRightRadius,
                                                }}
                                                onClick={handleClickPhoto}
                                            />
                                        </Box>
                                    ) : props.message.text ? (
                                        <Box
                                            component='div'
                                            width='100%'
                                            display='flex'
                                        >
                                            {rhs && (
                                                <Wrapper
                                                    type='wrap'
                                                    flexGrow='1' />
                                            )}
                                            <Box
                                                component='div'
                                                bgcolor={rhs ? '#3797F0' : '#262626'}
                                                padding='7px 12px'
                                                zIndex='1'
                                                maxWidth='564px'
                                                position='relative'
                                                color='#FFFFFF'
                                                display='block'
                                                sx={{
                                                    borderBottomRightRadius: borderBottomRightRadius,
                                                    overflowX: 'hidden',
                                                    borderBottomLeftRadius: borderBottomLeftRadius,
                                                    borderTopLeftRadius: borderTopLeftRadius,
                                                    overflowWrap: 'break-word',
                                                    borderTopRightRadius: borderTopRightRadius,
                                                    wordBreak: 'break-word',
                                                    overflowY: 'hidden',
                                                }}
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
                                                        fontSize='0.9375rem'
                                                        textAlign='left'
                                                        lineHeight='20px'
                                                        color={rhs ? '#FFFFFF' : '#F5F5F5'}
                                                        display='block'
                                                        sx={{
                                                            whiteSpace: 'pre-wrap',
                                                        }}
                                                    >
                                                        {props.message.text}
                                                    </Box>
                                                </Box>
                                            </Box>
                                            {lhs && (
                                                <Wrapper
                                                    type='wrap'
                                                    flexGrow='1' />
                                            )}
                                        </Box>
                                    ) : null}
                                </Box>
                                {lhs && (
                                    <Wrapper
                                        type='wrap'
                                        flexGrow='1' />
                                )}
                            </Box>
                            {hasReactions ? (
                                <Box
                                    component='div'
                                    alignSelf='stretch'
                                    flexDirection='column'
                                    bgcolor='#000000'
                                    display='flex'
                                    alignItems='inherit'
                                    flexGrow='0'
                                    maxWidth='100%'
                                    justifyContent='flex-end'
                                >
                                    <Box
                                        component='div'
                                        height='18px'
                                        width='100%'
                                        bgcolor='#000000'
                                        display='flex'
                                        textAlign={lhs ? 'left' : 'right'}
                                        zIndex='1'
                                        justifyContent={lhs ? 'flex-start' : 'flex-end'}
                                        position='relative'
                                    >
                                        <Box
                                            component='div'
                                            display='flex'
                                            sx={{
                                                transform: 'translateY(-6px)',
                                            }}
                                        >
                                            <Box
                                                component='div'
                                                paddingLeft='0'
                                                bgcolor='transparent'
                                                paddingTop='0'
                                                minWidth='0'
                                                flexBasis='auto'
                                                marginTop='0'
                                                marginBottom='0'
                                                boxSizing='border-box'
                                                paddingRight='0'
                                                display='inline-flex'
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
                                                    borderRightStyle: 'solid',
                                                    borderBottomColor: '#00000066',
                                                    borderLeftWidth: '0',
                                                    borderTopColor: '#00000066',
                                                    touchAction: 'manipulation',
                                                    borderRightWidth: '0',
                                                    borderRightColor: '#00000066',
                                                    borderTopWidth: '0',
                                                    userSelect: 'none',
                                                    borderTopRightRadius: 'inherit',
                                                    borderLeftColor: '#00000066',
                                                    borderLeftStyle: 'solid',
                                                    cursor: 'pointer',
                                                    outlineStyle: 'none',
                                                    borderBottomWidth: '0',
                                                    borderBottomStyle: 'solid',
                                                    borderTopLeftRadius: 'inherit',
                                                    borderBottomRightRadius: 'inherit',
                                                    borderBottomLeftRadius: 'inherit',
                                                    borderTopStyle: 'solid',
                                                }}
                                            >
                                                <Box
                                                    component='div'
                                                    border='2px solid #000000'
                                                    paddingRight='6px'
                                                    lineHeight='1'
                                                    justifyContent='center'
                                                    boxSizing='border-box'
                                                    display='flex'
                                                    alignItems='center'
                                                    flexDirection='row'
                                                    bgcolor='#262626'
                                                    height='22px'
                                                    paddingLeft='6px'
                                                    sx={{
                                                        borderBottomRightRadius: '11px',
                                                        borderBottomLeftRadius: '11px',
                                                        borderTopRightRadius: '11px',
                                                        boxShadow: 'none',
                                                        borderTopLeftRadius: '11px',
                                                    }}
                                                >
                                                    {props.message.reactions?.items.map((reaction, index) => (
                                                        <Box
                                                            key={index}
                                                            component='span'
                                                            justifyContent='center'
                                                            marginRight='2px'
                                                            display='flex'
                                                            alignItems='center'
                                                            width='14px'
                                                            textAlign='center'
                                                            height='14px'
                                                            fontSize='0.75rem'
                                                            marginLeft='2px'
                                                        >
                                                            <Box
                                                                component='span'
                                                                textAlign='center'
                                                                fontSize='0.75rem'
                                                            >
                                                                {reaction}
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                    {props.message.reactions?.count > 1 && (
                                                        <Box
                                                            component='div'
                                                            marginRight='2px'
                                                            color='#F5F5F5'
                                                            fontSize='0.875rem'
                                                            marginLeft='2px'
                                                            display='block'
                                                        >
                                                            {props.message.reactions?.count}
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                        {lhs && (
                                            <Box
                                                component='div'
                                                flexShrink='1'
                                                flexBasis='8px'
                                                flexGrow='0'
                                                display='block'
                                            />
                                        )}
                                    </Box>
                                </Box>
                            ) : (
                                <Wrapper flexGrow='0' />
                            )}
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        alignSelf='stretch'
                        flexDirection='column'
                        bgcolor='#000000'
                        display='flex'
                        alignItems='inherit'
                        flexGrow='0'
                        maxWidth='100%'
                        justifyContent='flex-end'
                    >
                        <Box
                            component='div'
                            justifyContent='center'
                            flexDirection='column'
                            display='flex'
                            flexShrink='0'
                            zIndex='10'
                            position='relative'
                            width='96px'
                            flexGrow='1'
                            sx={{
                                ...lhs && { paddingLeft: '5px' },
                                ...rhs && { paddingRight: '5px' },
                                ...hasReactions && { paddingBottom: '18px' },
                            }}
                        >
                            <Box
                                component='div'
                                display='flex'
                                alignItems='center'
                                flexDirection={lhs ? 'row' : 'row-reverse'}
                                width='96px'
                            >
                                {hovered && (
                                    <Box
                                        component='div'
                                        display='flex'
                                        alignItems='center'
                                        flexDirection={lhs ? 'row' : 'row-reverse'}
                                        width='96px'
                                    >
                                        <Box
                                            component='div'
                                        >
                                            <Box
                                                ref={props.emojiRef}
                                                component='div'
                                                paddingBottom='8px'
                                                paddingLeft='8px'
                                                justifyContent='center'
                                                bgcolor='transparent'
                                                marginTop='0'
                                                marginBottom='0'
                                                borderLeft='0'
                                                boxSizing='border-box'
                                                display='flex'
                                                alignItems='center'
                                                paddingTop='8px'
                                                paddingRight='8px'
                                                marginLeft='0'
                                                marginRight='0'
                                                sx={{
                                                    touchAction: 'manipulation',
                                                    cursor: 'pointer',
                                                    borderRightStyle: 'none',
                                                    borderBottomStyle: 'none',
                                                    borderTopStyle: 'none',
                                                    borderLeftStyle: 'none',
                                                    opacity: '0.568',
                                                    '&:hover': { opacity: 1 },
                                                }}
                                                onClick={handleClickReact}
                                            >
                                                <Box
                                                    display='flex'
                                                    justifyContent='center'
                                                    alignItems='center'
                                                    flexDirection='column'
                                                >
                                                    <svg
                                                        aria-label='Reaction'
                                                        style={{ display: 'block', position: 'relative' }}
                                                        color='rgb(245, 245, 245)'
                                                        fill='rgb(245, 245, 245)'
                                                        height='16'
                                                        role='img'
                                                        viewBox='0 0 24 24'
                                                        width='16'>
                                                        <title>Reaction</title>
                                                        <path
                                                            d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z' />
                                                    </svg>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            component='div'
                                        >
                                            <Box
                                                component='div'
                                                paddingBottom='8px'
                                                paddingLeft='8px'
                                                justifyContent='center'
                                                bgcolor='transparent'
                                                marginTop='0'
                                                marginBottom='0'
                                                borderLeft='0'
                                                boxSizing='border-box'
                                                display='flex'
                                                alignItems='center'
                                                paddingTop='8px'
                                                paddingRight='8px'
                                                marginLeft='0'
                                                marginRight='0'
                                                sx={{
                                                    touchAction: 'manipulation',
                                                    cursor: 'pointer',
                                                    borderRightStyle: 'none',
                                                    borderBottomStyle: 'none',
                                                    borderTopStyle: 'none',
                                                    borderLeftStyle: 'none',
                                                    opacity: '0.568',
                                                    '&:hover': { opacity: 1 },
                                                }}
                                                onClick={handleClickReply}
                                            >
                                                <Box
                                                    display='flex'
                                                    justifyContent='center'
                                                    alignItems='center'
                                                    flexDirection='column'
                                                >
                                                    <svg
                                                        aria-label='Reply'
                                                        style={{ display: 'block', position: 'relative' }}
                                                        color='rgb(245, 245, 245)'
                                                        fill='rgb(245, 245, 245)'
                                                        height='16'
                                                        role='img'
                                                        viewBox='0 0 24 24'
                                                        width='16'>
                                                        <title>Reply</title>
                                                        <path
                                                            d='M14 8.999H4.413l5.294-5.292a1 1 0 1 0-1.414-1.414l-7 6.998c-.014.014-.019.033-.032.048A.933.933 0 0 0 1 9.998V10c0 .027.013.05.015.076a.907.907 0 0 0 .282.634l6.996 6.998a1 1 0 0 0 1.414-1.414L4.415 11H14a7.008 7.008 0 0 1 7 7v3.006a1 1 0 0 0 2 0V18a9.01 9.01 0 0 0-9-9Z' />
                                                    </svg>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Wrapper
                        type='wrap'
                        flexGrow='1'
                    />
                </Box>
                <Wrapper
                    type='contain'
                    flexGrow='0'
                />
            </Box>
        </Box>
    )
}