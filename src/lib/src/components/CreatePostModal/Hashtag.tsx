import ListItem from '../ListItem'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'
import { formatNumber } from '../../utils'


interface IHashtag {
    _id: string | number
    name: string
    postIds: string[]
}

interface Props {
    hashtag: IHashtag

    onClick(hashtag: IHashtag): void
}


export default function Hashtag(props: Props) {

    const handleClick = () => {
        props.onClick(props.hashtag)
    }

    const postsCount = props.hashtag.postIds.length

    return (
        <ListItem
            gutters
            clickable
            opaque
            onClick={handleClick}
        >
            <ListItemContent gutters={false}>
                <ListItemTitle
                    loading={false}
                    loader={null}
                    title={`#${props.hashtag.name}`}
                />
                <ListItemSubtitle
                    loading={false}
                    loader={null}
                    subtitle={`${formatNumber(postsCount)} ${postsCount > 1 ? 'posts' : 'post'}`}
                />
            </ListItemContent>
        </ListItem>
    )
}