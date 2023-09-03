import React, { useState, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_SUGGESTED_POSTS } from '../../graphql/queries/post'
import { FindSuggestedPostsQueryType } from '../../graphql/types/queries/post'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import MediaGallery from '../../lib/src/components/MediaGallery'
import PostModal from '../PostModal'
import DataFallback from '../DataFallback'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'


export default function SuggestedPosts() {

    const findSuggestedPosts = useQuery<FindSuggestedPostsQueryType>(FIND_SUGGESTED_POSTS, {
        variables: {
            offset: 0,
            limit: 9,
        },
    })

    const suggestedPosts = useMemo(() => {
        if (!findSuggestedPosts.loading && !findSuggestedPosts.error && findSuggestedPosts.data) {
            return findSuggestedPosts.data.findSuggestedPosts.data.map(post => ({
                id: post._id,
                photoUrl: post.photoUrls.length > 0 ? post.photoUrls[0] : null,
                multiple: post.photoUrls.length > 1,
            }))
        }
        return []
    }, [findSuggestedPosts.loading, findSuggestedPosts.error, findSuggestedPosts.data])

    const hasMoreSuggestedPosts = useMemo(() => {
        if (!findSuggestedPosts.loading && !findSuggestedPosts.error && findSuggestedPosts.data) {
            return findSuggestedPosts.data.findSuggestedPosts.data.length < findSuggestedPosts.data.findSuggestedPosts.count
        }
        return false
    }, [findSuggestedPosts.loading, findSuggestedPosts.error, findSuggestedPosts.data])

    const handleFetchMoreSuggestedPosts = () => {
        if (findSuggestedPosts.data) {
            findSuggestedPosts.fetchMore({
                variables: {
                    offset: findSuggestedPosts.data.findSuggestedPosts.data.length,
                },
                updateQuery(existing: FindSuggestedPostsQueryType, { fetchMoreResult }: { fetchMoreResult: FindSuggestedPostsQueryType }) {
                    return {
                        ...existing,
                        findSuggestedPosts: {
                            ...existing.findSuggestedPosts,
                            data: [
                                ...existing.findSuggestedPosts.data,
                                ...fetchMoreResult.findSuggestedPosts.data,
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
            id='suggestedPostsContainer'
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
                    {findSuggestedPosts.loading ? (
                        <MediaGallery
                            items={_range(6).map(index => ({
                                id: index,
                                photoUrl: null,
                                multiple: false,
                            }))}
                            onClick={handleViewPost} />
                    ) : !findSuggestedPosts.error && findSuggestedPosts.data && findSuggestedPosts.data.findSuggestedPosts.count > 0 ? (
                        <InfiniteScroll
                            next={handleFetchMoreSuggestedPosts}
                            style={{ overflow: 'hidden' }}
                            hasMore={hasMoreSuggestedPosts}
                            scrollableTarget='suggestedPostsContainer'
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
                            dataLength={suggestedPosts.length}
                            scrollThreshold='95%'
                        >
                            <MediaGallery
                                items={suggestedPosts}
                                onClick={handleViewPost} />
                        </InfiniteScroll>
                    ) : (
                        <Box
                            component='div'
                            width='100%'
                            height='100%'
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <DataFallback
                                title='No posts yet'
                                subtitle={`When there are suggested posts for you, you'll see them here.`} />
                        </Box>
                    )}
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