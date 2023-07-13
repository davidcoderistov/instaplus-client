import Box from '@mui/material/Box'
import ListItem from '../ListItem'
import ListItemAvatar from '../ListItemAvatar'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'


interface Props {
    user: {
        id: string | number
        username: string
        firstName: string
        lastName: string
        photoUrl: string | null
    }
    showCreator: boolean

    onClickUser(id: string | number): void
}

export default function ChatDetailsDrawerListItem(props: Props) {

    const handleClickUser = () => {
        props.onClickUser(props.user.id)
    }

    return (
        <ListItem
            gutters
            clickable
            onClick={handleClickUser}
        >
            <ListItemAvatar
                loading={false}
                large
                loader={null}
                photoUrls={props.user.photoUrl ? [props.user.photoUrl] : []}
                usernames={[props.user.username]}
                onClick={handleClickUser}
            />
            <ListItemContent gutters={false}>
                <ListItemTitle
                    loading={false}
                    loader={null}
                    title={props.user.username}
                    onClick={handleClickUser}
                />
                <ListItemSubtitle
                    loading={false}
                    large
                    loader={null}
                    subtitle={props.showCreator ? (
                        <Box
                            component='div'
                            display='flex'
                            flexDirection='row'
                        >
                            <Box
                                component='span'
                            >
                                Admin
                            </Box>
                            <Box
                                component='span'
                                marginRight='4px'
                                marginLeft='4px'
                                marginTop='0'
                                marginBottom='0'
                                flexShrink='0'
                                color='#A8A8A8'
                            >
                                <Box
                                    component='span'
                                >
                                    <Box
                                        component='span'
                                        height='1px'
                                        width='1px'
                                        position='absolute'
                                        sx={{
                                            clip: 'rect(0,0,0,0)',
                                            overflowX: 'hidden',
                                            overflowY: 'hidden',
                                        }}
                                    >
                                        &nbsp;
                                    </Box>
                                    <Box
                                        component='span'
                                    > · </Box>
                                </Box>
                            </Box>
                            <Box
                                component='span'
                            >
                                {props.user.firstName} {props.user.lastName}
                            </Box>
                        </Box>
                    ) : `${props.user.firstName} ${props.user.lastName}`}
                />
            </ListItemContent>
        </ListItem>
    )
}