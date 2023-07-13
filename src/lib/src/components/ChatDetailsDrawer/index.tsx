import { useState, useEffect, useRef } from 'react'
import SidebarDrawer from '../SidebarDrawer'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import Button from '../Button'
import ChatDetailsDrawerListItem from '../ChatDetailsDrawerListItem'
import LeaveChatModal from '../LeaveChatModal'
import DeleteChatModal from '../DeleteChatModal'


interface User {
    id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl: string | null
}

interface Props {
    open: boolean
    chatId: string | number
    creatorId: string | number
    chatMembers: User[]
    isLeavingChat?: boolean
    isDeletingChat?: boolean

    onClickUser(userId: string | number): void

    onDeleteChat(chatId: string | number): void

    onAddPeople?(): void

    onLeaveChat?(chatId: string | number): void
}

export default function ChatDetailsDrawer(props: Props) {

    const [isLeaveChatModalOpen, setIsLeaveChatModalOpen] = useState(false)

    const handleOpenLeaveChatModal = () => {
        setIsLeaveChatModalOpen(true)
    }

    const handleCloseLeaveChatModal = () => {
        setIsLeaveChatModalOpen(false)
    }

    const handleLeaveChat = () => {
        if (props.onLeaveChat) {
            props.onLeaveChat(props.chatId)
        }
    }

    const shouldCloseLeaveChatModalRef = useRef(false)

    useEffect(() => {
        if (props.isLeavingChat) {
            shouldCloseLeaveChatModalRef.current = true
        } else {
            if (shouldCloseLeaveChatModalRef.current) {
                setIsLeaveChatModalOpen(false)
                shouldCloseLeaveChatModalRef.current = false
            }
        }
    }, [props.isLeavingChat])

    const [isDeleteChatModalOpen, setIsDeleteChatModalOpen] = useState(false)

    const handleOpenDeleteChatModal = () => {
        setIsDeleteChatModalOpen(true)
    }

    const handleCloseDeleteChatModal = () => {
        setIsDeleteChatModalOpen(false)
    }

    const handleDeleteChat = () => {
        props.onDeleteChat(props.chatId)
    }

    const shouldCloseDeleteChatModalRef = useRef(false)

    useEffect(() => {
        if (props.isDeletingChat) {
            shouldCloseDeleteChatModalRef.current = true
        } else {
            if (shouldCloseDeleteChatModalRef.current) {
                setIsDeleteChatModalOpen(false)
                shouldCloseDeleteChatModalRef.current = false
            }
        }
    }, [props.isDeletingChat])

    return (
        <SidebarDrawer
            variant='permanent'
            anchor='right'
            open={props.open}
            PaperProps={{ sx: { backgroundColor: 'black', borderLeft: '1px solid #232323' } }}
        >
            <Box
                component='div'
                paddingTop='24px'
                paddingBottom='24px'
                paddingRight='24px'
                paddingLeft='24px'
                marginTop='8px'
                marginLeft='0'
                marginRight='0'
                display='flex'
                justifyContent='flex-start'
                alignItems='center'
            >
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        lineHeight='25px'
                        minWidth='0'
                        margin='0!important'
                        color='#F5F5F5'
                        textAlign='left'
                        fontWeight='600'
                        position='relative'
                        display='block'
                        maxWidth='100%'
                        fontSize='20px'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                        }}
                    >
                        Details
                    </Box>
                </Box>
            </Box>
            <Box
                component='div'
                display='flex'
                flexDirection='column'
                flexGrow='1'
                flexShrink='1'
                minHeight='0'
                position='relative'
                sx={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
                <Box
                    component='div'
                    border='0'
                    flexGrow='1'
                    fontSize='100%'
                    left='0'
                    margin='0'
                    position='absolute'
                    width='100%'
                    sx={{ overflowX: 'hidden', overflowY: 'auto', verticalAlign: 'baseline' }}
                >
                    <Box
                        component='div'
                        paddingRight='24px'
                        paddingTop='0'
                        paddingLeft='24px'
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        marginTop='22px'
                        marginBottom='18px'
                        paddingBottom='0'
                    >
                        <Box
                            component='span'
                            lineHeight='20px'
                            fontSize='16px'
                            minWidth='0'
                            color='#F5F5F5'
                            margin='0!important'
                            fontWeight='700'
                            position='relative'
                            display='block'
                            maxWidth='100%'
                            sx={{
                                overflowY: 'visible',
                                wordWrap: 'break-word',
                                overflowX: 'visible',
                                whiteSpace: 'pre-line',
                                wordBreak: 'break-word',
                            }}
                        >
                            Members
                        </Box>
                        {props.chatMembers.length > 2 && (
                            <Button
                                variant='primary'
                                text='Add people'
                                onClick={props.onAddPeople}
                            />
                        )}
                    </Box>
                    {props.chatMembers.map((member, _, members) => (
                        <ChatDetailsDrawerListItem
                            key={member.id}
                            user={member}
                            showCreator={members.length > 2 && member.id === props.creatorId}
                            onClickUser={props.onClickUser}
                        />
                    ))}
                    <Box
                        component='div'
                        marginBottom='12px'
                        marginLeft='0'
                        marginTop='12px'
                        marginRight='0'
                        display='block'
                    >
                        <Box
                            component='div'
                            height='1px'
                            width='100%'
                            margin='0'
                            bgcolor='#262626'
                        />
                    </Box>
                    <Box
                        component='div'
                        paddingRight='24px'
                        paddingLeft='24px'
                        paddingTop='8px'
                        marginLeft='0'
                        marginRight='0'
                    >
                        {props.chatMembers.length > 2 && (
                            <>
                                <MuiButton
                                    variant='text'
                                    color='error'
                                    size='large'
                                    sx={{
                                        color: '#ED4956',
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: 'inherit',
                                        },
                                        paddingX: 0,
                                        paddingBottom: 0,
                                        paddingTop: '4px',
                                    }}
                                    onClick={handleOpenLeaveChatModal}
                                    disableElevation
                                    disableRipple
                                >
                                    Leave chat
                                </MuiButton>
                                <Box
                                    component='div'
                                    paddingTop='12px'
                                    paddingBottom='12px'
                                    display='flex'
                                    boxSizing='border-box'
                                    flexDirection='column'
                                    justifyContent='flex-start'
                                >
                                    <Box
                                        component='div'
                                        lineHeight='18px'
                                        fontSize='14px'
                                        fontWeight='400'
                                        minWidth='0'
                                        textAlign='left'
                                        color='#A8A8A8'
                                        position='relative'
                                        display='block'
                                        maxWidth='100%'
                                        sx={{
                                            wordWrap: 'break-word',
                                            whiteSpace: 'pre-line',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        You won't get messages from this group unless someone adds you back to the chat.
                                    </Box>
                                </Box>
                            </>
                        )}
                        <MuiButton
                            variant='text'
                            color='error'
                            size='large'
                            sx={{
                                color: '#ED4956',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'inherit',
                                },
                                paddingX: 0,
                                paddingBottom: '16px',
                                paddingTop: '4px',
                            }}
                            onClick={handleOpenDeleteChatModal}
                            disableElevation
                            disableRipple
                        >
                            Delete chat
                        </MuiButton>
                    </Box>
                </Box>
                <LeaveChatModal
                    open={isLeaveChatModalOpen}
                    isLeavingChat={props.isLeavingChat}
                    onLeaveChat={handleLeaveChat}
                    onCloseModal={handleCloseLeaveChatModal} />
                <DeleteChatModal
                    open={isDeleteChatModalOpen}
                    isDeletingChat={props.isDeletingChat}
                    onDeleteChat={handleDeleteChat}
                    onCloseModal={handleCloseDeleteChatModal} />
            </Box>
        </SidebarDrawer>
    )
}