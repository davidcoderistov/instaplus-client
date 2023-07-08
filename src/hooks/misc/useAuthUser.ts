import { useContext } from 'react'
import AppContext from '../../config/context'
import { User } from '../../types'


export function useAuthUser() {

    const context = useContext(AppContext)
    const authUser = context.loggedInUser as User

    return [authUser, context.setLoggedInUser] as const
}