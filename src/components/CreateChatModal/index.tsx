import { useSearchedUsers } from '../../hooks/graphql'
import InstaSearchUsersModal from '../../lib/src/components/SearchUsersModal'


interface Props {
    open: boolean
    isCreatingChat: boolean

    onCreateChat(userIds: (string | number)[]): void

    onCloseModal(): void
}

export default function CreateChatModal(props: Props) {

    const [{ searchedUsers, isSearching }, onSearch] = useSearchedUsers()

    return (
        <InstaSearchUsersModal
            open={props.open}
            title='New message'
            actionTitle='Chat'
            onCloseModal={props.onCloseModal}
            users={searchedUsers}
            usersLoading={isSearching}
            onSearch={onSearch}
            isTakingAction={props.isCreatingChat}
            onTakeAction={props.onCreateChat}
        />
    )
}