import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_POSTS_FOR_HASHTAG } from '../../graphql/queries/post'
import { FindPostsForHashtagQueryType } from '../../graphql/types/queries/post'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import MediaGallery from '../../lib/src/components/MediaGallery'
import PostModal from '../PostModal'
import DataFallback from '../DataFallback'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'
import { formatNumber } from '../../lib/src/utils'


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
        if (!findPostsForHashtag.loading && !findPostsForHashtag.error && findPostsForHashtag.data) {
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
                    {findPostsForHashtag.loading ? (
                        <MediaGallery
                            items={_range(6).map(index => ({
                                id: index,
                                photoUrl: null,
                                multiple: false,
                            }))}
                            onClick={handleViewPost} />
                    ) : !findPostsForHashtag.error && findPostsForHashtag.data && findPostsForHashtag.data.findPostsForHashtag.count > 0 ? (
                        <Box
                            component='div'
                            minWidth='735px'
                        >
                            <Box
                                component='div'
                                margin='30px auto 44px auto'
                                alignItems='center'
                                display='flex'
                                flexDirection='row'
                                fontSize='16px'
                                lineHeight='24px'
                                width='calc(100%-40px)'
                                boxSizing='border-box'
                                color='#F5F5F5'
                                flexShrink='0'
                                padding='0'
                                position='relative'
                                textAlign='center'
                                sx={{ verticalAlign: 'baseline' }}
                            >
                                <Box
                                    component='div'
                                    display='block'
                                >
                                    <Box
                                        component='div'
                                        display='block'
                                        position='relative'
                                    >
                                        <Box
                                            component='div'
                                            height='152px'
                                            width='152px'
                                            bgcolor='#121212'
                                            borderRadius='50%'
                                            boxSizing='border-box'
                                            display='block'
                                            overflow='hidden'
                                            position='relative'
                                        >
                                            <img
                                                alt=''
                                                style={{
                                                    border: '0',
                                                    fontSize: '100%',
                                                    height: '100%',
                                                    margin: '0',
                                                    padding: '0',
                                                    width: '100%',
                                                }}
                                                src={findPostsForHashtag.data.findPostsForHashtag.data[0].photoUrls[0]} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    component='div'
                                    textAlign='left'
                                    width='100%'
                                    display='block'
                                >
                                    <Box
                                        component='div'
                                        marginLeft='50px'
                                        textAlign='left'
                                        display='block'
                                    >
                                        <Box
                                            component='div'
                                            marginBottom='12px'
                                            bgcolor='transparent'
                                            flexDirection='column'
                                            boxSizing='border-box'
                                            display='flex'
                                            alignItems='stretch'
                                            justifyContent='flex-start'
                                            position='relative'
                                            sx={{
                                                overflowY: 'visible',
                                                overflowX: 'visible',
                                            }}
                                        >
                                            <Box
                                                component='span'
                                                lineHeight='24px'
                                                fontWeight='400'
                                                fontSize='30px'
                                                minWidth='0'
                                                color='#F5F5F5'
                                                position='relative'
                                                display='block'
                                                maxWidth='100%'
                                                sx={{
                                                    overflowY: 'visible',
                                                    overflowX: 'visible',
                                                    wordWrap: 'break-word',
                                                    whiteSpace: 'pre-line',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                #{name}
                                            </Box>
                                        </Box>
                                        <Box
                                            component='div'
                                            bgcolor='transparent'
                                            flexDirection='column'
                                            boxSizing='border-box'
                                            display='flex'
                                            alignItems='stretch'
                                            justifyContent='flex-start'
                                            position='relative'
                                            marginBottom='28px'
                                            sx={{
                                                overflowY: 'visible',
                                                overflowX: 'visible',
                                            }}
                                        >
                                            <Box
                                                component='span'
                                                color='#F5F5F5'
                                                fontWeight='600'
                                            >
                                                <Box
                                                    component='span'
                                                >
                                                    {formatNumber(findPostsForHashtag.data.findPostsForHashtag.count)}
                                                </Box>
                                            </Box>
                                            {findPostsForHashtag.data.findPostsForHashtag.count > 1 ? 'posts' : 'post'}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
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
                                subtitle={`When there are posts tagged with #${name}, you'll see them here.`} />
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