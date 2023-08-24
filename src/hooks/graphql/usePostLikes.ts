import { useState } from 'react'


export function usePostLikes() {

    const [viewPostLikesPostId, setViewPostLikesPostId] = useState<string | null>(null)

    const handleViewPostLikes = (postId: string) => {
        setViewPostLikesPostId(postId)
    }

    const handleClosePostLikesModal = () => {
        setViewPostLikesPostId(null)
    }

    return {
        viewPostLikesPostId,
        onViewPostLikes: handleViewPostLikes,
        onClosePostLikes: handleClosePostLikesModal,
    }
}