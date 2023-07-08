import React, { useState, useMemo, useCallback } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import { Close } from '@mui/icons-material'
import UserChip from './UserChip'
import SearchableUser from './SearchableUser'


interface User {
    id: string | number
    firstName: string
    lastName: string
    username: string
    photoUrl: string
}

interface Props {
    open: boolean
    users: User[]
    usersLoading: boolean
    isCreatingChat: boolean

    onSearch(searchQuery: string): void

    onCreateChat(userIds: string[]): void

    onCloseModal(): void
}

export default function CreateChatModal(props: Props) {

    const [searchQuery, setSearchQuery] = useState('')

    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateSearchQuery(event.target.value)
    }

    const updateSearchQuery = (value: string) => {
        setSearchQuery(value)
        props.onSearch(value)
    }

    const [selectedUsers, setSelectedUsers] = useState<User[]>([])

    const selectedUsersById = useMemo(() => selectedUsers.reduce((accumulator, user) => ({
        ...accumulator,
        [user.id]: true,
    }), {}), [selectedUsers])

    const users = useMemo(() => props.users.map(user => ({
        ...user,
        selected: Boolean(selectedUsersById[user.id]),
    })), [props.users, selectedUsersById])

    const handleRemoveUser = useCallback((id: string | number) => {
        setSelectedUsers(users => users.filter(user => user.id !== id))
    }, [])

    const handleAddUser = useCallback((user: User & { selected: boolean }) => {
        if (user) {
            if (user.selected) {
                handleRemoveUser(user.id)
            } else {
                setSelectedUsers(users => [...users, user])
                updateSearchQuery('')
            }
        }
    }, [handleRemoveUser])

    const handleCreateChat = () => {
        props.onCreateChat(selectedUsers.map(user => user.id))
    }

    return (
        <Dialog
            open={props.open}
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#262626',
                    borderRadius: '12px',
                    maxWidth: '550px',
                    height: '550px',
                },
            }}
            onClose={props.onCloseModal}
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                height='55px'
                borderBottom='1px solid #363636'
            >
                <Box component='div' />
                <Box
                    color='#FFFFFF'
                    position='absolute'
                    left='50%'
                    sx={{
                        transform: 'translateX(-50%)',
                    }}
                >
                    <Box
                        component='span'
                        lineHeight='20px'
                        fontSize='16px'
                        minWidth='0'
                        margin='0!important'
                        color='#F5F5F5'
                        fontWeight='700'
                        position='relative'
                        display='block'
                        maxWidth='100%'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                        }}
                    >
                        New message
                    </Box>
                </Box>
                <IconButton
                    aria-label='close'
                    size='large'
                    onClick={props.onCloseModal}
                >
                    <Close sx={{ color: '#FFFFFF' }} />
                </IconButton>
            </Box>
            <Box
                component='div'
                maxHeight='120px'
                padding='12px'
                borderRadius='0'
                bgcolor='transparent'
                boxSizing='border-box'
                display='flex'
                flexShrink='0'
                position='static'
                alignItems='stretch'
                flexDirection='row'
                alignSelf='auto'
                justifyContent='flex-start'
                flexGrow='0'
                sx={{
                    overflowX: 'auto',
                    overflowY: 'auto',
                }}
            >
                <Box
                    component='div'
                    borderRadius='0'
                    paddingRight='12px'
                    bgcolor='transparent'
                    flexDirection='column'
                    boxSizing='border-box'
                    display='flex'
                    flexShrink='0'
                    paddingLeft='12px'
                    marginTop='8px'
                    position='static'
                    alignItems='stretch'
                    alignSelf='auto'
                    justifyContent='flex-start'
                    flexGrow='0'
                    sx={{
                        overflowY: 'visible',
                        overflowX: 'visible',
                    }}
                >
                    <Box
                        component='span'
                        lineHeight='20px'
                        fontSize='16px'
                        minWidth='0'
                        margin='0!important'
                        fontWeight='600'
                        position='relative'
                        display='block'
                        maxWidth='100%'
                        color='#F5F5F5'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                        }}
                    >
                        To:
                    </Box>
                </Box>
                <Box
                    component='div'
                    alignContent='stretch'
                    borderRadius='0'
                    bgcolor='transparent'
                    minWidth='0'
                    boxSizing='border-box'
                    display='flex'
                    minHeight='0'
                    position='static'
                    alignItems='stretch'
                    flexDirection='row'
                    alignSelf='auto'
                    justifyContent='flex-start'
                    flexGrow='1'
                    flexWrap='wrap'
                    sx={{
                        overflowY: 'visible',
                        overflowX: 'visible',
                    }}
                >
                    <Box
                        component='div'
                        display='flex'
                        flexDirection='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        marginRight='10px'
                        flexWrap='wrap'
                        columnGap='5px'
                        rowGap='8px'
                    >
                        {selectedUsers.map(user => (
                            <UserChip
                                key={user.id}
                                user={user}
                                onRemoveUser={handleRemoveUser} />
                        ))}
                    </Box>
                    <InputBase
                        value={searchQuery}
                        onChange={handleChangeSearchQuery}
                        sx={{
                            color: '#FFFFFF',
                            backgroundColor: '#262626',
                            marginX: '4px',
                            paddingX: '16px',
                            paddingY: '8px',
                            borderRadius: '10px',
                            '& input': {
                                MozAppearance: 'textfield',
                                '&::placeholder': {
                                    fontSize: '14px',
                                    color: '#EEEEFF',
                                },
                            },
                        }}
                        placeholder='Search...'
                        fullWidth
                        multiline
                        autoFocus
                    />
                </Box>
            </Box>
            <Box
                component='div'
                borderRadius='0'
                bgcolor='transparent'
                minWidth='0'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                minHeight='0'
                position='static'
                alignItems='stretch'
                alignSelf='auto'
                justifyContent='flex-start'
                flexGrow='1'
                borderTop='1px solid #363636'
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                }}
            >
                {props.usersLoading ? [...Array(8).keys()].map(index => (
                    <SearchableUser
                        key={index}
                        loading />
                )) : props.users.length > 0 ? users.map(user => (
                    <SearchableUser
                        key={user.id}
                        id={user.id}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        username={user.username}
                        photoUrl={user.photoUrl}
                        selected={user.selected}
                        onClickUser={handleAddUser} />
                )) : (
                    <Box
                        component='div'
                        marginTop='16px'
                        borderRadius='0'
                        bgcolor='transparent'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        flexShrink='0'
                        position='static'
                        alignItems='stretch'
                        alignSelf='auto'
                        justifyContent='flex-start'
                        flexGrow='0'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                        }}
                    >
                        <Box
                            component='div'
                            paddingTop='12px'
                            paddingRight='24px'
                            paddingLeft='24px'
                            paddingBottom='12px'
                            borderRadius='0'
                            bgcolor='transparent'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            flexShrink='0'
                            position='static'
                            alignItems='stretch'
                            alignSelf='auto'
                            justifyContent='flex-start'
                            flexGrow='0'
                            sx={{
                                overflowY: 'visible',
                                overflowX: 'visible',
                            }}
                        >
                            <Box
                                component='span'
                                lineHeight='18px'
                                fontSize='14px'
                                fontWeight='400'
                                minWidth='0'
                                margin='0!important'
                                color='#A8A8A8'
                                position='relative'
                                display='block'
                                maxWidth='100%'
                                sx={{
                                    overflowX: 'visible',
                                    overflowY: 'visible',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                No account found.
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
            <Box
                component='div'
                margin='16px'
                borderRadius='0'
                bgcolor='transparent'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                flexShrink='0'
                position='static'
                alignItems='stretch'
                alignSelf='auto'
                justifyContent='flex-start'
                flexGrow='0'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <LoadingButton
                    variant='contained'
                    fullWidth
                    color='primary'
                    size='large'
                    sx={{
                        color: '#F5F5F5',
                        backgroundColor: '#0095F6',
                        textTransform: 'none',
                        paddingY: '9px',
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: '#1877F2',
                        },
                        '&.MuiLoadingButton-loading': {
                            backgroundColor: '#0095F6',
                        },
                        '.MuiLoadingButton-loadingIndicator': {
                            color: '#FFFFFF',
                        },
                        '&.Mui-disabled': {
                            color: props.isCreatingChat ? 'default' : '#4F6070',
                            backgroundColor: props.isCreatingChat ? 'default' : '#1B4865',
                        },
                    }}
                    loading={props.isCreatingChat}
                    disabled={selectedUsers.length < 1}
                    onClick={handleCreateChat}
                >
                    Chat
                </LoadingButton>
            </Box>
        </Dialog>
    )
}