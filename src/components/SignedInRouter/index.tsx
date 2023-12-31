import React, { useState, useMemo } from 'react'
import { useApolloClient, useQuery, useMutation, useSubscription } from '@apollo/client'
import { useIncrementUnreadMessagesCount } from '../../hooks/graphql'
import { FIND_SUGGESTED_USERS } from '../../graphql/queries/user'
import {
    FIND_CHATS_FOR_USER,
    FIND_MESSAGES_BY_CHAT_ID,
    FIND_UNREAD_MESSAGES_COUNT_FOR_USER,
} from '../../graphql/queries/chat'
import {
    FindChatsForUserQueryType,
    FindMessagesByChatIdQueryType,
    FindUnreadMessagesCountForUserQueryType,
} from '../../graphql/types/queries/chat'
import { FIND_USER_HAS_UNSEEN_NOTIFICATIONS } from '../../graphql/queries/notification'
import { FindUserHasUnseenNotificationsQueryType } from '../../graphql/types/queries/notification'
import { NEW_MESSAGE, NEW_MESSAGE_REACTION } from '../../graphql/subscriptions/chat'
import { NewMessageSubscriptionType } from '../../graphql/types/subscriptions/chat'
import { MARK_MESSAGE_AS_READ } from '../../graphql/mutations/chat'
import findChatsForUserMutations from '../../apollo/mutations/chat/findChatsForUser'
import findMessagesByChatIdMutations from '../../apollo/mutations/chat/findMessagesByChatId'
import { Message } from '../../graphql/types/models'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useUserDetailsNavigation } from '../../hooks/misc'
import { useAuthUser } from '../../hooks/misc'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import AppDrawer from '../../lib/src/components/AppDrawer'
import NotificationsDrawer from '../NotificationsDrawer'
import SearchDrawer from '../SearchDrawer'
import CreatePostModal from '../CreatePostModal'
import Chat from '../Chat'
import FollowedUsersPosts from '../FollowedUsersPosts'
import PostView from '../PostView'
import UserDetails from '../UserDetails'
import HashtagPosts from '../HashtagPosts'
import SuggestedUsers from '../SuggestedUsers'
import SuggestedPosts from '../SuggestedPosts'
import ProfileSettings from '../ProfileSettings'
import LogoutModal from '../LogoutModal'


export default function SignedInRouter() {

    const [authUser] = useAuthUser()

    const client = useApolloClient()

    useQuery(FIND_SUGGESTED_USERS)

    const [markMessageAsRead] = useMutation(MARK_MESSAGE_AS_READ)

    const incrementUnreadMessagesCount = useIncrementUnreadMessagesCount()

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
                                } else {
                                    incrementUnreadMessagesCount(chatWithLatestMessage.chat._id)
                                }
                            } else {
                                incrementUnreadMessagesCount(chatWithLatestMessage.chat._id)
                            }
                            return findMessagesByChatIdMutations.addMessage({
                                queryData,
                                variables: {
                                    message,
                                },
                            }).queryResult
                        } else {
                            incrementUnreadMessagesCount(chatWithLatestMessage.chat._id)
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
        setIsSearchDrawerOpen(false)
    }

    const handleCloseNotificationsDrawer = () => {
        setIsNotificationsDrawerOpen(false)
    }

    const handleClickApp = () => {
        if (isNotificationsDrawerOpen) {
            setIsNotificationsDrawerOpen(false)
        } else if (isSearchDrawerOpen) {
            setIsSearchDrawerOpen(false)
        }
    }

    const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false)

    const handleOpenSearchDrawer = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsSearchDrawerOpen(isSearchDrawerOpen => !isSearchDrawerOpen)
        setIsNotificationsDrawerOpen(false)
    }

    const handleCloseSearchDrawer = () => {
        setIsSearchDrawerOpen(false)
    }

    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)

    const handleOpenCreatePostModal = () => {
        setIsCreatePostModalOpen(true)
    }

    const handleCloseCreatePostModal = () => {
        setIsCreatePostModalOpen(false)
    }

    const navigate = useNavigate()

    const handleViewSettings = () => {
        navigate('/accounts/edit')
    }

    const navigateToUserDetails = useUserDetailsNavigation()

    const handleViewProfile = () => {
        navigateToUserDetails(authUser._id)
    }

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const handleLogout = () => {
        setIsLogoutModalOpen(true)
    }

    const handleCloseLogoutModal = () => {
        setIsLogoutModalOpen(false)
    }

    const findUnreadMessagesCountForUser = useQuery<FindUnreadMessagesCountForUserQueryType>(FIND_UNREAD_MESSAGES_COUNT_FOR_USER)

    const unreadMessagesCount = useMemo(() => {
        if (!findUnreadMessagesCountForUser.loading && !findUnreadMessagesCountForUser.error && findUnreadMessagesCountForUser.data) {
            return findUnreadMessagesCountForUser.data.findUnreadMessagesCountForUser.count
        }
        return 0
    }, [findUnreadMessagesCountForUser])

    const findUserHasUnseenNotifications = useQuery<FindUserHasUnseenNotificationsQueryType>(FIND_USER_HAS_UNSEEN_NOTIFICATIONS)

    const hasUnseenNotifications = useMemo(() => {
        if (!findUserHasUnseenNotifications.loading && !findUserHasUnseenNotifications.error && findUserHasUnseenNotifications.data) {
            return findUserHasUnseenNotifications.data.findUserHasUnseenNotifications.hasUnseenNotifications
        }
        return false
    }, [findUserHasUnseenNotifications])

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
                isSearchDrawerOpen={isSearchDrawerOpen}
                isNotificationsDrawerOpen={isNotificationsDrawerOpen}
                isCreatingNewPost={isCreatePostModalOpen}
                unreadMessagesCount={unreadMessagesCount}
                hasUnseenNotifications={hasUnseenNotifications}
                onOpenSearchDrawer={handleOpenSearchDrawer}
                onOpenNotificationsDrawer={handleOpenNotificationsDrawer}
                onOpenCreateNewPost={handleOpenCreatePostModal}
                onViewSettings={handleViewSettings}
                onViewProfile={handleViewProfile}
                onLogout={handleLogout} />
            <NotificationsDrawer
                open={isNotificationsDrawerOpen}
                onClose={handleCloseNotificationsDrawer} />
            <SearchDrawer
                open={isSearchDrawerOpen}
                onClose={handleCloseSearchDrawer} />
            {isCreatePostModalOpen && (
                <CreatePostModal
                    open={isCreatePostModalOpen}
                    onCloseModal={handleCloseCreatePostModal} />
            )}
            <LogoutModal
                open={isLogoutModalOpen}
                onCloseModal={handleCloseLogoutModal} />
            <Routes>
                <Route path='/' element={
                    <FollowedUsersPosts />
                } />
                <Route path='/explore' element={
                    <SuggestedPosts />
                } />
                <Route path='/people/suggested' element={
                    <SuggestedUsers />
                } />
                <Route path='/tags/:name' element={
                    <HashtagPosts />
                } />
                <Route path='/chat/:userId?' element={
                    <Chat />
                } />
                <Route path='/post/:postId' element={
                    <PostView />
                } />
                <Route path='/user/:userId' element={
                    <UserDetails />
                } />
                <Route path='/profile' element={
                    <UserDetails />
                } />
                <Route path='/accounts/edit' element={
                    <ProfileSettings />
                } />
                <Route path='*' element={
                    <Navigate to='/' replace />
                } />
            </Routes>
        </Box>
    )
}