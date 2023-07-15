import { useSearchedUsers } from '../../hooks/graphql'
import InstaSearchUsersModal from '../../lib/src/components/SearchUsersModal'


interface Props {
    open: boolean
    isAddingChatMembers: boolean
    excludeUserIds: (string | number)[]

    onAddChatMembers(userIds: (string | number)[]): void

    onCloseModal(): void
}

export default function AddChatMembersModal(props: Props) {

    const [{ searchedUsers, isSearching }, onSearch] = useSearchedUsers(props.excludeUserIds)

    return (
        <InstaSearchUsersModal
            open={props.open}
            title='Add people'
            actionTitle='Add'
            onCloseModal={props.onCloseModal}
            users={searchedUsers}
            usersLoading={isSearching}
            onSearch={onSearch}
            isTakingAction={props.isAddingChatMembers}
            onTakeAction={props.onAddChatMembers}
        />
    )
}