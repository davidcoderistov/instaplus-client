import { useNavigate } from 'react-router-dom'


export function usePostViewNavigation() {

    const navigate = useNavigate()

    return (postId: any) => {
        navigate(`/post/${postId}`)
    }
}