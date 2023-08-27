import { useNavigate } from 'react-router-dom'
import { useAuthUser } from './useAuthUser'


export function useUserDetailsNavigation() {

    const navigate = useNavigate()

    const [authUser] = useAuthUser()

    return (userId: any) => {
        if (authUser._id === userId) {
            navigate('/profile')
        } else {
            navigate(`/user/${userId}`)
        }
    }
}