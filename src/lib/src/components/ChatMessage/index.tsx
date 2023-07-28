import React, { useMemo, useCallback, forwardRef, MutableRefObject } from 'react'
import Box from '@mui/material/Box'
import ChatMessageTitle from '../ChatMessageTitle'
import ChatMessageReply from '../ChatMessageReply'
import ChatMessageBubble from '../ChatMessageBubble'
import { Message, Reaction } from '../../types/Message'


interface Props {
    type: 'single' | 'group'
    position: 'start' | 'between' | 'end' | 'solo'
    emojiRef: MutableRefObject<Node | null>
    lhs: boolean
    authUserId: string | number
    message: Message
    onClickPhoto: (photoUrl: string) => void | null
    onClickReplyPhoto: (photoUrl: string) => void | null

    onReact(message: Message, lhs: boolean, event: React.MouseEvent): void

    onReply(message: Message): void

    onViewReactions(reactions: Reaction[]): void
}

const ForwardedChatMessageBubble = forwardRef<any, any>((props, ref) => (
    <ChatMessageBubble {...props} emojiRef={ref} />
))

const ChatMessage = React.memo((props: Props) => {

    const showMessageTitle = useMemo(() =>
            !((props.lhs && props.type === 'group' && (props.position === 'start' || props.position === 'solo')) || props.message.reply),
        [props.lhs, props.type, props.position, props.message.reply])

    const handleClickReplyPhoto = useCallback(() => {
        if (props.onClickReplyPhoto && props.message.reply) {
            props.onClickReplyPhoto(props.message.reply.previewPhotoUrl as string)
        }
    }, [props.onClickReplyPhoto, props.message.reply])

    return (
        <Box
            component='div'
            position='relative'
            display='block'
        >
            <Box
                component='div'
                display='block'
            >
                <Box
                    component='div'
                    flexDirection='column'
                    display='flex'
                    position='relative'
                >
                    {(props.position === 'start' || props.position === 'solo' || Boolean(props.message.reply)) && (
                        <Box
                            component='div'
                            height='10px'
                            width='100%'
                            bgcolor='#000000'
                            display='block'
                        />
                    )}
                    <ChatMessageTitle
                        type={props.type}
                        empty={showMessageTitle}
                        lhs={props.lhs}
                        rhs={!props.lhs}
                        authUserId={props.authUserId}
                        creator={props.message.creator}
                        replyCreator={props.message.reply?.creator}
                        reply={!!props.message.reply}
                    />
                    {props.message.reply && (
                        <>
                            {props.message.reply.text ? (
                                <ChatMessageReply
                                    lhs={props.lhs}
                                    rhs={!props.lhs}
                                    message={props.message.reply.text} />
                            ) : props.message.reply.photoUrl && props.message.reply.photoOrientation ? (
                                <ChatMessageReply
                                    lhs={props.lhs}
                                    rhs={!props.lhs}
                                    photoUrl={props.message.reply.photoUrl}
                                    orientation={props.message.reply.photoOrientation}
                                    isVideo={Boolean(props.message.reply.videoUrl)}
                                    onClick={handleClickReplyPhoto}
                                />
                            ) : null}
                        </>
                    )}
                    <ForwardedChatMessageBubble
                        ref={props.emojiRef}
                        position={props.position}
                        lhs={props.lhs}
                        message={props.message}
                        onClickPhoto={props.onClickPhoto}
                        onReact={props.onReact}
                        onReply={props.onReply}
                        onViewReactions={props.onViewReactions}
                    />
                    {(props.position === 'end' || props.position === 'solo') && (
                        <Box
                            component='div'
                            height='7px'
                            width='100%'
                            bgcolor='#000000'
                            display='block'
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
})

export default ChatMessage