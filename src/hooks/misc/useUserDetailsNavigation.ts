import { useNavigate } from 'react-router-dom'


export function useUserDetailsNavigation() {

    const navigate = useNavigate()

    return (userId: any) => {
        navigate(`/user/${userId}`)
    }
}