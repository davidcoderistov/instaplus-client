import ListItem from '../ListItem'
import ListItemAvatar from '../ListItemAvatar'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'
import ListItemActions from '../ListItemActions'
import { Reaction } from '../../types/Message'


export default function ReactionUser(props: Reaction) {

    return (
        <ListItem>
            <ListItemAvatar
                loading={false}
                loader={null}
                photoUrls={props.creator.photoUrl ? [props.creator.photoUrl] : []}
                usernames={[props.creator.username]}
            />
            <ListItemContent gutters={false}>
                <ListItemTitle
                    loading={false}
                    loader={null}
                    title={props.creator.username}
                />
                <ListItemSubtitle
                    loading={false}
                    loader={null}
                    subtitle={`${props.creator.firstName} ${props.creator.lastName}`}
                />
            </ListItemContent>
            <ListItemActions>
                {props.reaction}
            </ListItemActions>
        </ListItem>
    )
}