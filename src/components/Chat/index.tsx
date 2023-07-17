import { useState, useCallback, useMemo } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useQuery, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FIND_CHATS_FOR_USER, FIND_MESSAGES_BY_CHAT_ID } from '../../graphql/queries/chat'
import { CREATE_CHAT, ADD_CHAT_MEMBERS, DELETE_CHAT, LEAVE_CHAT } from '../../graphql/mutations/chat'
import { FindChatsForUserQueryType, FindMessagesByChatIdQueryType } from '../../graphql/types/queries/chat'
import { CreateChatMutationType } from '../../graphql/types/mutations/chat'
import { ChatWithLatestMessage } from '../../graphql/types/models'
import findChatsForUserMutations from '../../apollo/mutations/chat/findChatsForUser'
import { Message as IMessage } from '../../graphql/types/models'
import Box from '@mui/material/Box'
import ChatMessageList, { ChatMessage } from '../../lib/src/components/ChatMessageList'
import InstaChat from '../../lib/src/components/Chat'
import ChatOverview from '../../lib/src/components/ChatOverview'
import ChatLoadingSkeleton from '../../lib/src/components/ChatLoadingSkeleton'
import ChatDetailsDrawer from '../../lib/src/components/ChatDetailsDrawer'
import CreateChatModal from '../CreateChatModal'
import AddChatMembersModal from '../AddChatMembersModal'
import { Message } from '../../lib/src/types/Message'
import _intersection from 'lodash/intersection'
import _differenceBy from 'lodash/differenceBy'


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
                        seen: true,
                        selected: chat.selected,
                        temporary: chat.temporary,
                    }
                })
        }
        return []
    }, [findChatsForUser.loading, findChatsForUser.error, findChatsForUser.data])

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

    const hasMoreMessages: boolean = useMemo(() => {
        if (!findMessagesByChatId.loading && !findMessagesByChatId.error && findMessagesByChatId.data) {
            return !!findMessagesByChatId.data.findMessagesByChatId.nextCursor
        }
        return false
    }, [findMessagesByChatId.loading, findMessagesByChatId.error, findMessagesByChatId.data])

    const onFetchMoreMessages = () => {
        const chat = selectedChat as ChatMessage
        const chatId = chat.id
        if (findMessagesByChatId.data && findMessagesByChatId.data.findMessagesByChatId.nextCursor) {
            findMessagesByChatId.fetchMore({
                variables: {
                    chatId,
                    cursor: {
                        _id: findMessagesByChatId.data.findMessagesByChatId.nextCursor._id,
                        createdAt: findMessagesByChatId.data.findMessagesByChatId.nextCursor.createdAt,
                    },
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
            }).catch(console.log)
        }
    }

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
        if (findChatsForUser.data) {
            findChatForUser = findChatsForUser.data.findChatsForUser.data.find(chatForUser => {
                return chatForUser.chat.chatMembers.length === allUserIds.length && _intersection(
                    chatForUser.chat.chatMembers.map(member => member._id),
                    allUserIds,
                ).length === allUserIds.length
            })
        }
        if (findChatForUser) {
            const chatId = findChatForUser.chat._id
            findChatsForUser.updateQuery(findChatsForUser => findChatsForUserMutations.updateSelectedStatus({
                queryData: findChatsForUser,
                variables: {
                    chatId,
                },
            }).queryResult)
            closeCreateChatModal()
        } else {
            createChat({
                variables: {
                    chatMemberIds: allUserIds,
                },
            }).then(({ data }) => {
                const createChat = data?.createChat
                if (createChat) {
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
                                            onClickPhoto={console.log}
                                            onClickReplyPhoto={console.log}
                                            onReact={console.log}
                                            onSendMessage={console.log}
                                            onSendLike={console.log}
                                            onUploadFile={console.log} />
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
        </>
    )
}