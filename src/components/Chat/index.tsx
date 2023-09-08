import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthUser } from '../../hooks/misc'
import { useApolloClient, useQuery, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FIND_CHATS_FOR_USER, FIND_MESSAGES_BY_CHAT_ID } from '../../graphql/queries/chat'
import {
    CREATE_CHAT,
    ADD_CHAT_MEMBERS,
    DELETE_CHAT,
    LEAVE_CHAT,
    SEND_MESSAGE,
    REACT_TO_MESSAGE,
    MARK_MESSAGE_AS_READ,
} from '../../graphql/mutations/chat'
import { FindChatsForUserQueryType, FindMessagesByChatIdQueryType } from '../../graphql/types/queries/chat'
import { CreateChatMutationType, SendMessageMutationType } from '../../graphql/types/mutations/chat'
import { ChatWithLatestMessage } from '../../graphql/types/models'
import findChatsForUserMutations from '../../apollo/mutations/chat/findChatsForUser'
import findMessagesByChatIdMutations from '../../apollo/mutations/chat/findMessagesByChatId'
import { Message as IMessage, Reaction } from '../../graphql/types/models'
import Box from '@mui/material/Box'
import ChatMessageList, { ChatMessage } from '../../lib/src/components/ChatMessageList'
import InstaChat from '../../lib/src/components/Chat'
import ChatOverview from '../../lib/src/components/ChatOverview'
import ChatLoadingSkeleton from '../../lib/src/components/ChatLoadingSkeleton'
import ChatDetailsDrawer from '../../lib/src/components/ChatDetailsDrawer'
import CreateChatModal from '../CreateChatModal'
import AddChatMembersModal from '../AddChatMembersModal'
import ViewReactionsModal from '../../lib/src/components/ViewReactionsModal'
import ImagePreviewModal from '../../lib/src/components/ImagePreviewModal'
import { Message } from '../../lib/src/types/Message'
import _intersection from 'lodash/intersection'
import _differenceBy from 'lodash/differenceBy'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'


export default function Chat() {

    const [authUser] = useAuthUser()

    const findChatsForUser = useQuery<FindChatsForUserQueryType>(FIND_CHATS_FOR_USER, {
        variables: {
            limit: 10,
        },
    })

    const chats: ChatMessage[] = useMemo(() => {
        if (!findChatsForUser.error && !findChatsForUser.loading && findChatsForUser.data) {
            return findChatsForUser.data.findChatsForUser.data
                .map((chatForUser) => {
                    const { chat } = chatForUser
                    const message = chatForUser.message as IMessage
                    return {
                        id: chat._id,
                        chatMembers: chat.chatMembers.map(chatMember => ({ ...chatMember, id: chatMember._id })),
                        text: message.text,
                        photoUrl: message.photoUrl,
                        videoUrl: message.videoUrl,
                        creatorId: message.creator._id,
                        creatorUsername: message.creator.username,
                        timestamp: message.createdAt,
                        seen: message.seenByUserIds.includes(authUser._id),
                        selected: chat.selected,
                        temporary: chat.temporary,
                    }
                })
        }
        return []
    }, [authUser, findChatsForUser.loading, findChatsForUser.error, findChatsForUser.data])

    const hasMoreChats: boolean = useMemo(() => {
        if (!findChatsForUser.error && !findChatsForUser.loading && findChatsForUser.data) {
            return !!findChatsForUser.data.findChatsForUser.nextCursor
        }
        return false
    }, [findChatsForUser.loading, findChatsForUser.error, findChatsForUser.data])

    const selectedChat: ChatMessage | null = useMemo(() => {
        return chats.find(chat => chat.selected) ?? null
    }, [chats])

    const onFetchMoreChats = () => {
        if (findChatsForUser.data && findChatsForUser.data.findChatsForUser.nextCursor) {
            findChatsForUser.fetchMore({
                variables: {
                    cursor: {
                        _id: findChatsForUser.data.findChatsForUser.nextCursor._id,
                        createdAt: findChatsForUser.data.findChatsForUser.nextCursor.createdAt,
                    },
                },
                updateQuery(existing: FindChatsForUserQueryType, { fetchMoreResult }: { fetchMoreResult: FindChatsForUserQueryType }) {
                    return {
                        ...existing,
                        findChatsForUser: {
                            ...fetchMoreResult.findChatsForUser,
                            data: [
                                ..._differenceBy(
                                    existing.findChatsForUser.data,
                                    fetchMoreResult.findChatsForUser.data,
                                    'chat._id',
                                ),
                                ...fetchMoreResult.findChatsForUser.data,
                            ],
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const findMessagesByChatId = useQuery<FindMessagesByChatIdQueryType>(FIND_MESSAGES_BY_CHAT_ID, {
        skip: !selectedChat,
        variables: {
            chatId: selectedChat?.id,
            limit: 15,
        },
    })

    const [messagesOffset, setMessagesOffset] = useState(15)

    const messages: Message[] = useMemo(() => {
        if (!findMessagesByChatId.loading && !findMessagesByChatId.error && findMessagesByChatId.data) {
            return findMessagesByChatId.data.findMessagesByChatId.data.slice(0, messagesOffset).map(message => ({
                id: message._id,
                creator: {
                    id: message.creator._id,
                    username: message.creator.username,
                    photoUrl: message.creator.photoUrl,
                },
                text: message.text,
                photoUrl: message.photoUrl,
                photoOrientation: message.photoOrientation,
                previewPhotoUrl: message.previewPhotoUrl,
                videoUrl: message.videoUrl,
                reactions: message.reactions,
                reply: message.reply ? ({
                    ...message.reply,
                    id: message.reply._id,
                    creator: {
                        ...message.reply.creator,
                        id: message.reply.creator._id,
                    },
                }) : null,
                createdAt: message.createdAt,
            }))
        }
        return []
    }, [findMessagesByChatId.loading, findMessagesByChatId.error, findMessagesByChatId.data, messagesOffset])


    const isMessagesCountSetRef = useRef(false)
    const [initialMessagesCount, setInitialMessagesCount] = useState(0)

    useEffect(() => {
        if (!findMessagesByChatId.loading && !findMessagesByChatId.error && findMessagesByChatId.data && selectedChat) {
            if (!isMessagesCountSetRef.current) {
                setInitialMessagesCount(findMessagesByChatId.data.findMessagesByChatId.data.length)
                isMessagesCountSetRef.current = true
            }
        }
    }, [findMessagesByChatId.loading, findMessagesByChatId.error, findMessagesByChatId.data, messagesOffset, selectedChat])

    const hasMoreMessages: boolean = useMemo(() => {
        if (messagesOffset < initialMessagesCount) {
            return true
        } else if (!findMessagesByChatId.loading && !findMessagesByChatId.error && findMessagesByChatId.data) {
            return !!findMessagesByChatId.data.findMessagesByChatId.nextCursor
        } else {
            return false
        }
    }, [findMessagesByChatId.loading, findMessagesByChatId.error, findMessagesByChatId.data, messagesOffset, initialMessagesCount])

    const onFetchMoreMessages = () => {
        if (findMessagesByChatId.data) {
            if (messagesOffset < findMessagesByChatId.data.findMessagesByChatId.data.length) {
                setMessagesOffset(messagesOffset => messagesOffset + 10)
            } else {
                if (findMessagesByChatId.data.findMessagesByChatId.nextCursor) {
                    const chat = selectedChat as ChatMessage
                    const chatId = chat.id
                    findMessagesByChatId.fetchMore({
                        variables: {
                            chatId,
                            cursor: {
                                _id: findMessagesByChatId.data.findMessagesByChatId.nextCursor._id,
                                createdAt: findMessagesByChatId.data.findMessagesByChatId.nextCursor.createdAt,
                            },
                            limit: 10,
                        },
                        updateQuery(existing: FindMessagesByChatIdQueryType, { fetchMoreResult }: { fetchMoreResult: FindMessagesByChatIdQueryType }) {
                            return {
                                ...existing,
                                findMessagesByChatId: {
                                    ...fetchMoreResult.findMessagesByChatId,
                                    data: [
                                        ..._differenceBy(
                                            existing.findMessagesByChatId.data,
                                            fetchMoreResult.findMessagesByChatId.data,
                                            '_id',
                                        ),
                                        ...fetchMoreResult.findMessagesByChatId.data,
                                    ],
                                },
                            }
                        },
                    }).then(() => setMessagesOffset(messagesOffset => messagesOffset + 10)).catch(console.log)
                }
            }
        }
    }

    const updateChatSelectedStatus = (chatId: string) => {
        findChatsForUser.updateQuery(findChatsForUser => {
            if (findChatsForUser.findChatsForUser.data) {
                const chatForUser = findChatsForUser.findChatsForUser.data.find(chatForUser => chatForUser.chat._id === chatId)
                if (chatForUser && chatForUser.message) {
                    if (!chatForUser.message.seenByUserIds.includes(authUser._id)) {
                        markMessageAsRead({
                            variables: {
                                messageId: chatForUser.message._id,
                            },
                        })
                    }
                }
            }
            return findChatsForUserMutations.updateSelectedStatus({
                queryData: findChatsForUser,
                variables: {
                    chatId,
                },
            }).queryResult
        })
    }

    const [markMessageAsRead] = useMutation(MARK_MESSAGE_AS_READ)

    const handleClickChat = useCallback((chatId: string) => {
        isMessagesCountSetRef.current = false
        setIsChatDetailsDrawerOpen(false)
        updateChatSelectedStatus(chatId)
        setMessagesOffset(15)
    }, [])

    const [isChatDetailsDrawerOpen, setIsChatDetailsDrawerOpen] = useState(false)

    const handleViewChatDetails = () => {
        setIsChatDetailsDrawerOpen(isChatDetailsDrawerOpen => !isChatDetailsDrawerOpen)
    }

    const { enqueueSnackbar } = useSnackbar()

    const client = useApolloClient()

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
                client.cache.evict({ fieldName: 'findMessagesByChatId', args: { chatId } })
                client.cache.gc()
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
                client.cache.evict({ fieldName: 'findMessagesByChatId', args: { chatId } })
                client.cache.gc()
                setIsChatDetailsDrawerOpen(false)
            })
            .catch(() => {
                enqueueSnackbar('You cannot leave this chat at this moment. Please try again later', { variant: 'error' })
            })
    }

    const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false)

    const openCreateChatModal = () => {
        setIsCreateChatModalOpen(true)
    }

    const closeCreateChatModal = () => {
        setIsCreateChatModalOpen(false)
    }

    const [createChat, { loading: isCreatingChat }] = useMutation<CreateChatMutationType>(CREATE_CHAT)

    const handleCreateChat = (userIds: (string | number)[]) => {
        let findChatForUser: ChatWithLatestMessage | undefined
        const allUserIds = [...userIds, authUser._id]
        if (allUserIds.length <= 2 && findChatsForUser.data) {
            findChatForUser = findChatsForUser.data.findChatsForUser.data.find(chatForUser => {
                return chatForUser.chat.chatMembers.length === allUserIds.length && _intersection(
                    chatForUser.chat.chatMembers.map(member => member._id),
                    allUserIds,
                ).length === allUserIds.length
            })
        }
        if (allUserIds.length <= 2 && findChatForUser) {
            const chatId = findChatForUser.chat._id
            updateChatSelectedStatus(chatId)
            closeCreateChatModal()
        } else {
            createChat({
                variables: {
                    chatMemberIds: allUserIds,
                },
            }).then(({ data }) => {
                const createChat = data?.createChat
                if (createChat) {
                    if (createChat.message) {
                        if (!createChat.message.seenByUserIds.includes(authUser._id)) {
                            markMessageAsRead({
                                variables: {
                                    messageId: createChat.message._id,
                                },
                            })
                        }
                    }
                    findChatsForUser.updateQuery(findChatsForUser => findChatsForUserMutations.addChat({
                        queryData: findChatsForUser,
                        variables: {
                            chat: {
                                chat: {
                                    ...createChat.chat,
                                    selected: true,
                                    temporary: !createChat.message,
                                },
                                message: {
                                    _id: createChat.message?._id || 'temporary-message-id',
                                    text: createChat.message?.text ?? null,
                                    photoUrl: createChat.message?.photoUrl ?? null,
                                    previewPhotoUrl: null,
                                    photoOrientation: null,
                                    seenByUserIds: [authUser._id],
                                    reactions: null,
                                    reply: null,
                                    videoUrl: createChat.message?.videoUrl ?? null,
                                    creator: createChat.message?.creator || authUser,
                                    createdAt: createChat.message?.createdAt || 1,
                                },
                            },
                        },
                    }).queryResult)
                } else {
                    enqueueSnackbar('Chat could not be created. Please try again later', { variant: 'error' })
                }
            }).catch(() => {
                enqueueSnackbar('Chat could not be created. Please try again later', { variant: 'error' })
            }).finally(() => {
                closeCreateChatModal()
            })
        }
    }

    const [addChatMembersModalOpen, setIsAddChatMembersModalOpen] = useState(false)

    const openAddChatMembersModal = () => {
        setIsAddChatMembersModalOpen(true)
    }

    const closeAddChatMembersModal = () => {
        setIsAddChatMembersModalOpen(false)
    }

    const [addChatMembers, { loading: isAddingChatMembers }] = useMutation<CreateChatMutationType>(ADD_CHAT_MEMBERS)

    const handleAddChatMembers = (chatMemberIds: (string | number)[]) => {
        const chatId = (selectedChat as ChatMessage).id
        addChatMembers({
            variables: {
                chatId,
                chatMemberIds,
            },
        }).catch(() => {
            enqueueSnackbar('These people could not be added to the chat. Please try again later', { variant: 'error' })
        }).finally(() => {
            closeAddChatMembersModal()
        })
    }

    const [sendMessageMutation] = useMutation<SendMessageMutationType>(SEND_MESSAGE)
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

    const sendTextMessage = (chatId: string, text: string, reply: IMessage['reply']) => {
        const _id = uuidv4()
        const message = {
            _id,
            creator: {
                _id: authUser._id,
                username: authUser.username,
                photoUrl: authUser.photoUrl,
            },
            text,
            photoUrl: null,
            previewPhotoUrl: null,
            photoOrientation: null,
            seenByUserIds: [authUser._id],
            videoUrl: null,
            reactions: null,
            reply,
            createdAt: moment().valueOf(),
        }
        findChatsForUser.updateQuery(findChatsForUser => findChatsForUserMutations.updateLatestMessage({
            queryData: findChatsForUser,
            variables: {
                chatId,
                message,
            },
        }).queryResult)
        findMessagesByChatId.updateQuery(findMessagesByChatId => findMessagesByChatIdMutations.addMessage({
            queryData: findMessagesByChatId,
            variables: {
                message,
            },
        }).queryResult)
        sendMessage({
            chatId,
            text,
            photo: null,
            replyId: reply ? reply._id : null,
        }, _id)
    }

    const sendPhotoMessage = (chatId: string, photo: File) => {
        sendMessage({
            chatId,
            text: null,
            photo,
            replyId: null,
        }, null)
    }

    const sendMessage = (args: { chatId: string, text?: string | null, photo?: File | null, replyId?: string | null }, updateMessageId: string | null) => {
        const hasPhoto = Boolean(args.photo)
        if (hasPhoto) {
            setIsUploadingPhoto(true)
        }
        sendMessageMutation({
            variables: {
                chatId: args.chatId,
                text: args.text,
                photo: args.photo,
                replyId: args.replyId,
            },
            ...hasPhoto && {
                context: {
                    hasUpload: true,
                },
            },
        }).then(({ data }) => {
            const message = data?.sendMessage
            if (message) {
                if (updateMessageId) {
                    findMessagesByChatId.updateQuery(findMessagesByChatId => findMessagesByChatIdMutations.updateMessage({
                        queryData: findMessagesByChatId,
                        variables: {
                            id: updateMessageId,
                            message,
                        },
                    }).queryResult)
                } else {
                    findMessagesByChatId.updateQuery(findMessagesByChatId => findMessagesByChatIdMutations.addMessage({
                        queryData: findMessagesByChatId,
                        variables: {
                            message,
                        },
                    }).queryResult)
                }
                if (hasPhoto) {
                    findChatsForUser.updateQuery(findChatsForUser => findChatsForUserMutations.updateLatestMessage({
                        queryData: findChatsForUser,
                        variables: {
                            chatId: args.chatId,
                            message,
                        },
                    }).queryResult)
                }
            } else {
                enqueueSnackbar('Message could not be sent. Please try again later', { variant: 'error' })
            }
        }).catch(() => {
            enqueueSnackbar('Message could not be sent. Please try again later', { variant: 'error' })
        }).finally(() => {
            if (hasPhoto) {
                setIsUploadingPhoto(false)
            }
        })
    }

    const handleSendMessage = useCallback((chatId: string, message: string, replyingMessage: Message | null) => {
        sendTextMessage(chatId, message, replyingMessage ? {
            ...replyingMessage,
            _id: replyingMessage.id as string,
            creator: {
                ...replyingMessage.creator,
                _id: replyingMessage.creator.id as string,
                photoUrl: replyingMessage.creator.photoUrl ?? null,
            },
        } : null)
    }, [])

    const handleSendLike = useCallback((chatId: string) => {
        sendTextMessage(chatId, '❤', null)
    }, [])

    const handleUploadFile = useCallback((chatId: string, file: File) => {
        sendPhotoMessage(chatId, file)
    }, [])

    const [viewReactions, setViewReactions] = useState<Reaction[] | null>(null)

    const handleViewReactions = useCallback((reactions: Reaction[]) => {
        setViewReactions(reactions)
    }, [])

    const handleCloseReactionsModal = () => {
        setViewReactions(null)
    }

    const [reactToMessage] = useMutation(REACT_TO_MESSAGE)

    const handleReactToMessage = useCallback((emoji: string, message: Message) => {
        findMessagesByChatId.updateQuery(findMessagesByChatId => findMessagesByChatIdMutations.reactToMessage({
            queryData: findMessagesByChatId,
            variables: {
                messageId: message.id as string,
                reaction: emoji,
                creator: authUser,
            },
        }).queryResult)
        reactToMessage({
            variables: {
                messageId: message.id,
                reaction: emoji,
            },
        })
    }, [])

    const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null)

    const handlePreviewPhoto = useCallback((photoUrl: string) => {
        setPreviewPhotoUrl(photoUrl)
    }, [])

    const handleCloseImagePreviewModal = () => {
        setPreviewPhotoUrl(null)
    }

    const { userId } = useParams()

    useEffect(() => {
        if (!findChatsForUser.loading && userId) {
            handleCreateChat([userId])
        }
    }, [findChatsForUser.loading, userId])

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
                                            onCreateNewChat={openCreateChatModal}
                                            onFetchMoreChatMessages={onFetchMoreChats}
                                            onClickChatMessage={handleClickChat}
                                        />
                                    )}
                                    {selectedChat ? (
                                        <InstaChat
                                            chatId={selectedChat.id}
                                            type={selectedChat.chatMembers.length > 2 ? 'group' : 'single'}
                                            authUserId={authUser._id}
                                            loading={findMessagesByChatId.loading}
                                            isViewingChatDetails={isChatDetailsDrawerOpen}
                                            isUploadingPhoto={isUploadingPhoto}
                                            creator={{
                                                id: selectedChat.creatorId,
                                                username: selectedChat.creatorUsername,
                                            }}
                                            chatMembers={selectedChat.chatMembers}
                                            messages={messages}
                                            hasMoreMessages={hasMoreMessages}
                                            onFetchMoreMessages={onFetchMoreMessages}
                                            onViewChatDetails={handleViewChatDetails}
                                            onViewUser={console.log}
                                            onClickPhoto={handlePreviewPhoto}
                                            onClickReplyPhoto={handlePreviewPhoto}
                                            onReact={handleReactToMessage}
                                            onViewReactions={handleViewReactions}
                                            onSendMessage={handleSendMessage}
                                            onSendLike={handleSendLike}
                                            onUploadFile={handleUploadFile} />
                                    ) : findChatsForUser.loading ? (
                                        <ChatLoadingSkeleton />
                                    ) : (
                                        <ChatOverview onSendMessage={openCreateChatModal} />
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
                    onAddPeople={openAddChatMembersModal} />
            )}
            {isCreateChatModalOpen && (
                <CreateChatModal
                    open={true}
                    isCreatingChat={isCreatingChat}
                    onCreateChat={handleCreateChat}
                    onCloseModal={closeCreateChatModal} />
            )}
            {selectedChat && addChatMembersModalOpen && (
                <AddChatMembersModal
                    open={true}
                    isAddingChatMembers={isAddingChatMembers}
                    excludeUserIds={selectedChat.chatMembers.map(member => member.id)}
                    onAddChatMembers={handleAddChatMembers}
                    onCloseModal={closeAddChatMembersModal} />
            )}
            {viewReactions && (
                <ViewReactionsModal
                    open={true}
                    reactions={viewReactions}
                    onCloseModal={handleCloseReactionsModal} />
            )}
            {previewPhotoUrl && (
                <ImagePreviewModal
                    open={true}
                    photoUrl={previewPhotoUrl}
                    onClose={handleCloseImagePreviewModal} />
            )}
        </>
    )
}