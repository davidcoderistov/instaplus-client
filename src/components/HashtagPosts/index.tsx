import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_POSTS_FOR_HASHTAG } from '../../graphql/queries/post'
import { FindPostsForHashtagQueryType } from '../../graphql/types/queries/post'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import MediaGallery from '../../lib/src/components/MediaGallery'
import PostModal from '../PostModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'


export default function HashtagPosts() {

    const { name } = useParams()

    const findPostsForHashtag = useQuery<FindPostsForHashtagQueryType>(FIND_POSTS_FOR_HASHTAG, {
        variables: {
            name,
            offset: 0,
            limit: 9,
        },
    })

    const posts = useMemo(() => {
        if (findPostsForHashtag.loading) {
            return _range(6).map(index => ({
                id: index,
                photoUrl: null,
                multiple: false,
            }))
        }
        if (!findPostsForHashtag.error && findPostsForHashtag.data) {
            return findPostsForHashtag.data.findPostsForHashtag.data.map(post => ({
                id: post._id,
                photoUrl: post.photoUrls.length > 0 ? post.photoUrls[0] : null,
                multiple: post.photoUrls.length > 1,
            }))
        }
        return []
    }, [findPostsForHashtag.loading, findPostsForHashtag.error, findPostsForHashtag.data])

    const hasMorePosts = useMemo(() => {
        if (!findPostsForHashtag.loading && !findPostsForHashtag.error && findPostsForHashtag.data) {
            return findPostsForHashtag.data.findPostsForHashtag.data.length < findPostsForHashtag.data.findPostsForHashtag.count
        }
        return false
    }, [findPostsForHashtag.loading, findPostsForHashtag.error, findPostsForHashtag.data])

    const handleFetchMorePosts = () => {
        if (findPostsForHashtag.data) {
            findPostsForHashtag.fetchMore({
                variables: {
                    offset: findPostsForHashtag.data.findPostsForHashtag.data.length,
                },
                updateQuery(existing: FindPostsForHashtagQueryType, { fetchMoreResult }: { fetchMoreResult: FindPostsForHashtagQueryType }) {
                    return {
                        ...existing,
                        findPostsForHashtag: {
                            ...existing.findPostsForHashtag,
                            data: [
                                ...existing.findPostsForHashtag.data,
                                ...fetchMoreResult.findPostsForHashtag.data,
                            ],
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const [viewPostId, setViewPostId] = useState<string | null>(null)

    const handleViewPost = (postId: string) => {
        setViewPostId(postId)
    }

    const handleClosePostModal = () => {
        setViewPostId(null)
    }

    return (
        <Box
            id='hashtagPostsContainer'
            component='div'
            minHeight='100vh'
            width='100%'
            display='flex'
            flexDirection='column'
            sx={{
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <Box
                component='div'
                bgcolor='#000000'
                display='flex'
                flexDirection='column'
                flexGrow='1'
            >
                <Box
                    component='div'
                    paddingTop='4vh'
                    marginRight='auto'
                    marginTop='0'
                    paddingRight='20px'
                    paddingLeft='20px'
                    marginBottom='16px'
                    flexGrow='1'
                    marginLeft='auto'
                    maxWidth='1035px'
                    width='calc(100% - 40px)'
                    paddingBottom='0'
                    display='block'
                >
                    <InfiniteScroll
                        next={handleFetchMorePosts}
                        style={{ overflow: 'hidden' }}
                        hasMore={hasMorePosts}
                        scrollableTarget='hashtagPostsContainer'
                        loader={
                            <Box
                                component='div'
                                display='flex'
                                flexDirection='row'
                                justifyContent='center'
                                alignItems='flex-start'
                                paddingTop='10px'
                                height='50px'
                            >
                                <CircularProgress
                                    size={30}
                                    thickness={5}
                                    sx={{
                                        color: 'grey',
                                        mt: 1,
                                    }} />
                            </Box>
                        }
                        dataLength={posts.length}
                        scrollThreshold='95%'
                    >
                        <MediaGallery
                            items={posts}
                            onClick={handleViewPost} />
                    </InfiniteScroll>
                </Box>
            </Box>
            {viewPostId && (
                <PostModal
                    postId={viewPostId}
                    post={null}
                    onClose={handleClosePostModal} />
            )}
        </Box>
    )
}