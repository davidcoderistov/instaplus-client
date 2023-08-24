import { useState, useCallback } from 'react'


export function useCommentLikes() {

    const [viewCommentLikesCommentId, setViewCommentLikesCommentId] = useState<string | null>(null)

    const handleViewCommentLikes = useCallback((commentId: string) => {
        setViewCommentLikesCommentId(commentId)
    }, [])

    const handleCloseCommentLikesModal = () => {
        setViewCommentLikesCommentId(null)
    }

    return {
        viewCommentLikesCommentId,
        onViewCommentLikes: handleViewCommentLikes,
        onCloseCommentLikes: handleCloseCommentLikesModal,
    }
}