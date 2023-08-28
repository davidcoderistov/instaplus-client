import { useNavigate } from 'react-router-dom'


export function useHashtagNavigation() {

    const navigate = useNavigate()

    return (name: string) => {
        navigate(`/tags/${name}`)
    }
}