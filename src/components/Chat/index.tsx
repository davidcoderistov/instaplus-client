import { useState, useCallback, useMemo } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useQuery, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FIND_CHATS_FOR_USER, FIND_MESSAGES_BY_CHAT_ID } from '../../graphql/queries/chat'
import { DELETE_CHAT, LEAVE_CHAT } from '../../graphql/mutations/chat'
import { FindChatsForUserQueryType, FindMessagesByChatIdQueryType } from '../../graphql/types/queries/chat'
import findChatsForUserMutations from '../../apollo/mutations/chat/findChatsForUser'
import Box from '@mui/material/Box'
import ChatMessageList, { ChatMessage } from '../../lib/src/components/ChatMessageList'
import InstaChat from '../../lib/src/components/Chat'
import ChatOverview from '../../lib/src/components/ChatOverview'
import ChatLoadingSkeleton from '../../lib/src/components/ChatLoadingSkeleton'
import ChatDetailsDrawer from '../../lib/src/components/ChatDetailsDrawer'
import { Message } from '../../lib/src/types/Message'


export default function Chat() {

    const [authUser] = useAuthUser()

    const findChatsForUser = useQuery<FindChatsForUserQueryType>(FIND_CHATS_FOR_USER, {
        variables: {
            offset: 0,
            limit: 10,
        },
    })

    const chats: ChatMessage[] = useMemo(() => {
        if (!findChatsForUser.error && !findChatsForUser.loading && findChatsForUser.data) {
            return findChatsForUser.data.findChatsForUser.data.map(({ chat, message }) => {
                return {
                    id: chat._id,
                    chatMembers: chat.chatMembers.map(chatMember => ({ ...chatMember, id: chatMember._id })),
                    text: message.text,
                    photoUrl: message.photoUrl,
                    videoUrl: message.videoUrl,
                    creatorId: message.creator._id,
                    creatorUsername: message.creator.username,
                    timestamp: message.createdAt,
                    seen: true,
                    selected: chat.selected,
                }
            })
        }
        return []
    }, [findChatsForUser.loading, findChatsForUser.error, findChatsForUser.data])

    const chatsCount: number = useMemo(() => {
        if (!findChatsForUser.error && !findChatsForUser.loading && findChatsForUser.data) {
            return findChatsForUser.data.findChatsForUser.count
        }
        return 0
    }, [findChatsForUser.loading, findChatsForUser.error, findChatsForUser.data])

    const hasMoreChats = useMemo(() => chats.length < chatsCount, [chats, chatsCount])

    const selectedChat: ChatMessage | null = useMemo(() => {
        return chats.find(chat => chat.selected) ?? null
    }, [chats])

    const findMessagesByChatId = useQuery<FindMessagesByChatIdQueryType>(FIND_MESSAGES_BY_CHAT_ID, {
        skip: !selectedChat,
        variables: {
            chatId: selectedChat?.id,
            offset: 0,
            limit: 10,
        },
    })

    const messages: Message[] = useMemo(() => {
        if (!findMessagesByChatId.loading && !findMessagesByChatId.error && findMessagesByChatId.data) {
            return findMessagesByChatId.data.findMessagesByChatId.data.map(message => ({
                id: message._id,
                creator: {
                    id: message.creator._id,
                    username: message.creator.username,
                    photoUrl: message.creator.photoUrl,
                },
                text: message.text,
                photoUrl: message.photoUrl,
                photoOrientation: 'portrait',
                videoUrl: message.videoUrl,
                reactions: null,
                reply: null,
                createdAt: message.createdAt,
            }))
        }
        return []
    }, [findMessagesByChatId.loading, findMessagesByChatId.error, findMessagesByChatId.data])

    const messagesCount: number = useMemo(() => {
        if (!findMessagesByChatId.loading && !findMessagesByChatId.error && findMessagesByChatId.data) {
            return findMessagesByChatId.data.findMessagesByChatId.count
        }
        return 0
    }, [findMessagesByChatId.loading, findMessagesByChatId.error, findMessagesByChatId.data])

    const hasMoreMessages = useMemo(() => messages.length < messagesCount, [messages, messagesCount])

    const handleClickChat = useCallback((chatId: string) => {
        setIsChatDetailsDrawerOpen(false)
        findChatsForUser.updateQuery(findChatsForUser => findChatsForUserMutations.updateSelectedStatus({
            queryData: findChatsForUser,
            variables: {
                chatId,
            },
        }).queryResult)
    }, [])

    const [isChatDetailsDrawerOpen, setIsChatDetailsDrawerOpen] = useState(false)

    const handleViewChatDetails = () => {
        setIsChatDetailsDrawerOpen(isChatDetailsDrawerOpen => !isChatDetailsDrawerOpen)
    }

    const { enqueueSnackbar } = useSnackbar()

    const [deleteChat, deleteChatData] = useMutation(DELETE_CHAT)

    const handleDeleteChat = (chatId: string) => {
        deleteChat({ variables: { chatId } })
            .then(() => {
                findChatsForUser.updateQuery(findChatsForUser => findChatsForUserMutations.deleteChat({
                    queryData: findChatsForUser,
                    variables: {
                        chatId,
                    },
                }).queryResult)
                setIsChatDetailsDrawerOpen(false)
            })
            .catch(() => {
                enqueueSnackbar('Chat could not be deleted. Please try again later', { variant: 'error' })
            })
    }

    const [leaveChat, leaveChatData] = useMutation(LEAVE_CHAT)

    const handleLeaveChat = (chatId: string) => {
        leaveChat({ variables: { chatId } })
            .then(() => {
                findChatsForUser.updateQuery(findChatsForUser => findChatsForUserMutations.deleteChat({
                    queryData: findChatsForUser,
                    variables: {
                        chatId,
                    },
                }).queryResult)
                setIsChatDetailsDrawerOpen(false)
            })
            .catch(() => {
                enqueueSnackbar('You cannot leave this chat at this moment. Please try again later', { variant: 'error' })
            })
    }

    return (
        <>
            <Box
                component='div'
                display='block'
                width='100%'
                sx={{
                    overflowX: 'hidden',
                }}
            >
                <Box
                    component='section'
                    width='100%'
                    flexDirection='column'
                    display='flex'
                    height='100%'
                    sx={{
                        overflowX: 'hidden',
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
                            bgcolor='#121212'
                            maxHeight='100%'
                            height='100%'
                            display='block'
                        >
                            <Box
                                component='div'
                                height='100vh'
                                width='100%'
                                bgcolor='transparent'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='stretch'
                                justifyContent='flex-start'
                                position='relative'
                                border='0'
                                sx={{
                                    overflowX: 'visible',
                                    overflowY: 'visible',
                                }}
                            >
                                <Box
                                    component='div'
                                    flexWrap='nowrap'
                                    boxSizing='border-box'
                                    display='flex'
                                    height='100%'
                                    flexShrink='0'
                                    minHeight='inherit'
                                    alignItems='stretch'
                                    flexDirection='row'
                                    justifyContent='flex-start'
                                    position='relative'
                                    zIndex='0'
                                    flexGrow='1'
                                >
                                    {findChatsForUser.loading ? (
                                        <ChatMessageList loading />
                                    ) : (
                                        <ChatMessageList
                                            authUserId={authUser._id}
                                            chatName={authUser.username}
                                            chatMessages={chats}
                                            hasMoreChatMessages={hasMoreChats}
                                            onCreateNewChat={console.log}
                                            onFetchMoreChatMessages={console.log}
                                            onClickChatMessage={handleClickChat}
                                        />
                                    )}
                                    {selectedChat ? (
                                        <InstaChat
                                            type={selectedChat.chatMembers.length > 2 ? 'group' : 'single'}
                                            authUserId={authUser._id}
                                            loading={findMessagesByChatId.loading}
                                            isViewingChatDetails={isChatDetailsDrawerOpen}
                                            creator={{
                                                id: selectedChat.creatorId,
                                                username: selectedChat.creatorUsername,
                                            }}
                                            chatMembers={selectedChat.chatMembers}
                                            messages={messages}
                                            messagesCount={messagesCount}
                                            hasMoreMessages={hasMoreMessages}
                                            onFetchMoreMessages={console.log}
                                            onClickChatMembers={console.log}
                                            onClickChatDetails={handleViewChatDetails}
                                            onViewChatDescription={console.log}
                                            onClickPhoto={console.log}
                                            onClickReplyPhoto={console.log}
                                            onReact={console.log}
                                            onSendMessage={console.log}
                                            onSendLike={console.log}
                                            onUploadFile={console.log} />
                                    ) : findChatsForUser.loading ? (
                                        <ChatLoadingSkeleton />
                                    ) : (
                                        <ChatOverview onSendMessage={console.log} />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {selectedChat && isChatDetailsDrawerOpen && (
                <ChatDetailsDrawer
                    open={true}
                    chatId={selectedChat.id}
                    creatorId={selectedChat.creatorId}
                    chatMembers={selectedChat.chatMembers}
                    onClickUser={console.log}
                    onDeleteChat={handleDeleteChat}
                    isDeletingChat={deleteChatData.loading}
                    onLeaveChat={handleLeaveChat}
                    isLeavingChat={leaveChatData.loading}
                    onAddPeople={console.log} />
            )}
        </>
    )
}