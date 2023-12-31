import { useChatMembers } from '../../hooks'
import Box from '@mui/material/Box'
import Button from '../Button'
import ChatAvatar from '../ChatAvatar'


interface Props {
    chatId: string | number
    chatMembers: { id: string | number, username: string, photoUrl: string | null }[]
    authUserId: string | number
    creator: string

    onViewUser(userId: string | number): void

    onViewChatDetails(chatId: string | number): void
}

export default function ChatDescription(props: Props) {

    const [usernames, photoUrls] = useChatMembers(props.chatMembers, props.authUserId, 5)

    const handleClickView = () => {
        if (props.chatMembers.length > 2) {
            props.onViewChatDetails(props.chatId)
        } else {
            props.onViewUser(props.chatMembers.filter(chatMember => chatMember.id !== props.authUserId)[0].id)
        }
    }

    return (
        <Box
            component='div'
            display='block'
        >
            <Box
                component='div'
                flexDirection='column'
                bgcolor='#000000'
                display='flex'
                alignItems='stretch'
                maxWidth='100%'
                justifyContent='flex-end'
            >
                <Box
                    component='div'
                    height='20px'
                    width='100%'
                    bgcolor='#000000'
                    display='block'
                />
                <Box
                    component='div'
                    flexDirection='column'
                    display='flex'
                    alignItems='center'
                    textAlign='center'
                >
                    <Box
                        component='div'
                        paddingTop='16px'
                        paddingBottom='16px'
                        display='block'
                    >
                        <ChatAvatar
                            photoUrls={photoUrls}
                            containerSize={96}
                            avatarSize={photoUrls.length > 1 ? 72 : 96} />
                    </Box>
                    <Box
                        component='div'
                        paddingLeft='14px'
                        paddingRight='14px'
                        width='100%'
                        boxSizing='border-box'
                        display='block'
                    >
                        <Box
                            component='div'
                            justifyContent='center'
                            bgcolor='transparent'
                            boxSizing='border-box'
                            display='flex'
                            position='static'
                            alignItems='stretch'
                            flexDirection='row'
                            borderRadius='0'
                            sx={{
                                overflowY: 'visible',
                                overflowX: 'visible',
                            }}
                        >
                            <Box
                                component='span'
                                lineHeight='25px'
                                minWidth='0'
                                marginBottom='0!important'
                                color='#F5F5F5'
                                textAlign='center'
                                marginRight='0!important'
                                fontWeight='600'
                                position='relative'
                                fontSize='20px'
                                display='block'
                                maxWidth='100%'
                                marginLeft='0!important'
                                marginTop='0!important'
                                sx={{
                                    overflowY: 'visible',
                                    wordWrap: 'break-word',
                                    overflowX: 'visible',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                <Box
                                    component='span'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    display='block'
                                    maxWidth='100%'
                                    sx={{
                                        overflowX: 'hidden',
                                        overflowY: 'hidden',
                                    }}
                                >
                                    {usernames}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        paddingTop='2px'
                        display='block'
                    >
                        <Box
                            component='span'
                            lineHeight='18px'
                            fontSize='14px'
                            fontWeight='400'
                            minWidth='0'
                            marginBottom='0!important'
                            textAlign='center'
                            marginRight='0!important'
                            color='#A8A8A8'
                            position='relative'
                            display='block'
                            maxWidth='100%'
                            marginLeft='0!important'
                            marginTop='0!important'
                            sx={{
                                overflowY: 'visible',
                                wordWrap: 'break-word',
                                overflowX: 'visible',
                                whiteSpace: 'pre-line',
                                wordBreak: 'break-word',
                            }}
                        >
                            {props.chatMembers.length > 2 ? (
                                <Box
                                    component='span'
                                >
                                    {props.creator} created this group
                                </Box>
                            ) : (
                                <Box
                                    component='span'
                                >
                                    {props.creator} &middot; InstaPlus
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        paddingTop='24px'
                        paddingBottom='32px'
                        display='block'
                    >
                        <Button
                            variant='secondary'
                            text={props.chatMembers.length > 2 ? 'View chat details' : 'View profile'}
                            contained
                            onClick={handleClickView} />
                    </Box>
                </Box>
                <Box
                    component='div'
                    height='10px'
                    width='100%'
                    bgcolor='#000000'
                    display='block'
                />
            </Box>
        </Box>
    )
}