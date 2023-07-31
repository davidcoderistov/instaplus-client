import React, { useState } from 'react'
import { useApolloClient, useMutation, useSubscription } from '@apollo/client'
import { FIND_CHATS_FOR_USER, FIND_MESSAGES_BY_CHAT_ID } from '../../graphql/queries/chat'
import { FindChatsForUserQueryType, FindMessagesByChatIdQueryType } from '../../graphql/types/queries/chat'
import { NEW_MESSAGE, NEW_MESSAGE_REACTION } from '../../graphql/subscriptions/chat'
import { NewMessageSubscriptionType } from '../../graphql/types/subscriptions/chat'
import { MARK_MESSAGE_AS_READ } from '../../graphql/mutations/chat'
import findChatsForUserMutations from '../../apollo/mutations/chat/findChatsForUser'
import findMessagesByChatIdMutations from '../../apollo/mutations/chat/findMessagesByChatId'
import { Message } from '../../graphql/types/models'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthUser } from '../../hooks/misc'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import AppDrawer from '../../lib/src/components/AppDrawer'
import NotificationsDrawer from '../NotificationsDrawer'
import Chat from '../Chat'


export default function SignedInRouter() {

    const [authUser] = useAuthUser()

    const client = useApolloClient()

    const [markMessageAsRead] = useMutation(MARK_MESSAGE_AS_READ)

    useSubscription<NewMessageSubscriptionType>(NEW_MESSAGE, {
        fetchPolicy: 'no-cache',
        onData(data) {
            const chatWithLatestMessage = data.data.data?.newMessage
            if (!data.data.error && chatWithLatestMessage) {

                client.cache.updateQuery(
                    { query: FIND_CHATS_FOR_USER },
                    (queryData: FindChatsForUserQueryType | null) => {
                        if (queryData) {
                            if (queryData.findChatsForUser &&
                                queryData.findChatsForUser.data.find(chatForUser => chatForUser.chat._id === chatWithLatestMessage.chat._id)) {
                                return findChatsForUserMutations.updateLatestMessage({
                                    queryData,
                                    variables: {
                                        chatId: chatWithLatestMessage.chat._id,
                                        message: chatWithLatestMessage.message as Message,
                                    },
                                }).queryResult
                            } else {
                                return findChatsForUserMutations.addChat({
                                    queryData,
                                    variables: {
                                        chat: chatWithLatestMessage,
                                    },
                                }).queryResult
                            }
                        }
                    },
                )

                client.cache.updateQuery(
                    {
                        query: FIND_MESSAGES_BY_CHAT_ID,
                        variables: {
                            chatId: chatWithLatestMessage.chat._id,
                        },
                    },
                    (queryData: FindMessagesByChatIdQueryType | null) => {
                        if (queryData) {
                            let message = chatWithLatestMessage.message as Message
                            const findChatsForUserQueryData: FindChatsForUserQueryType | null = client.cache.readQuery({ query: FIND_CHATS_FOR_USER })
                            if (findChatsForUserQueryData && findChatsForUserQueryData.findChatsForUser) {
                                const chatForUser = findChatsForUserQueryData.findChatsForUser.data.find(chatForUser => chatForUser.chat._id === chatWithLatestMessage.chat._id)
                                if (chatForUser && chatForUser.chat.selected) {
                                    markMessageAsRead({
                                        variables: {
                                            messageId: message._id,
                                        },
                                    })
                                    message = {
                                        ...message,
                                        seenByUserIds: [...message.seenByUserIds, authUser._id],
                                    }
                                }
                            }
                            return findMessagesByChatIdMutations.addMessage({
                                queryData,
                                variables: {
                                    message,
                                },
                            }).queryResult
                        }
                    },
                )
            }
        },
    })

    useSubscription(NEW_MESSAGE_REACTION)

    const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false)

    const handleOpenNotificationsDrawer = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsNotificationsDrawerOpen(isNotificationsDrawerOpen => !isNotificationsDrawerOpen)
    }

    const handleClickApp = () => {
        if (isNotificationsDrawerOpen) {
            setIsNotificationsDrawerOpen(false)
        }
    }

    return (
        <Box
            component='div'
            display='flex'
            height='100vh'
            width='100%'
            bgcolor='#000000'
            onClick={handleClickApp}
        >
            <CssBaseline />
            <AppDrawer
                username={authUser.username}
                photoUrl={authUser.photoUrl}
                isSearchDrawerOpen={false}
                isNotificationsDrawerOpen={isNotificationsDrawerOpen}
                isCreatingNewPost={false}
                isSettingsOpen={false}
                onOpenSearchDrawer={console.log}
                onOpenNotificationsDrawer={handleOpenNotificationsDrawer}
                onOpenCreateNewPost={console.log} />
            <NotificationsDrawer
                open={isNotificationsDrawerOpen} />
            <Routes>
                <Route path='/' element={
                    <div style={{ color: 'white' }}>
                        Home
                    </div>
                } />
                <Route path='/explore' element={
                    <div style={{ color: 'white' }}>
                        Explore
                    </div>
                } />
                <Route path='/reels' element={
                    <div style={{ color: 'white' }}>
                        Reels
                    </div>
                } />
                <Route path='/chat' element={
                    <Chat />
                } />
                <Route path='/profile' element={
                    <div style={{ color: 'white' }}>
                        Profile
                    </div>
                } />
                <Route path='*' element={
                    <Navigate to='/' replace />
                } />
            </Routes>
        </Box>
    )
}