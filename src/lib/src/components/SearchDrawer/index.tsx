import React, { useState, useEffect, useCallback } from 'react'
import SidebarDrawer from '../SidebarDrawer'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import { Search, Cancel } from '@mui/icons-material'
import SearchDrawerUserItem from '../SearchDrawerListItem'
import ClearSearchHistoryModal from '../ClearSearchHistoryModal'
import Button from '../Button'
import { Typography } from '@mui/material'


interface Tag {
    type: 'tag'
    id: string | number
    name: string
    postsCount: number
}

interface User {
    type: 'user'
    id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl: string
    followedByUsernames: string[]
    followedByCount: number
}

type Item = Tag | User

interface SearchDrawerProps {
    open: boolean
    searchHistoryItems: Item[]
    isSearchHistoryLoading: boolean
    searchedItems: Item[]
    isSearching: boolean

    onSearch(searchQuery: string): void

    onClearSearchHistory(): void

    onClickItem(id: string | number, type: 'tag' | 'user'): void

    onRemoveItem(id: string | number, type: 'tag' | 'user'): void
}

export default function SearchDrawer(props: SearchDrawerProps) {

    const [searchQuery, setSearchQuery] = useState('')

    const noSearchHistoryItems = !props.isSearchHistoryLoading && props.searchHistoryItems.length < 1
    const noSearchedItems = !props.isSearching && props.searchedItems.length < 1

    const handleChangeSearchQuery = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
        props.onSearch(event.target.value)
    }, [props.onSearch])

    const handleClearSearchQuery = useCallback(() => {
        setSearchQuery('')
    }, [props.onSearch])

    const [isClearSearchHistoryModalOpen, setIsClearSearchHistoryModalOpen] = useState(false)

    const handleOpenClearSearchHistoryModal = useCallback(() => {
        setIsClearSearchHistoryModalOpen(true)
    }, [])

    const handleCloseClearSearchHistoryModal = useCallback(() => {
        setIsClearSearchHistoryModalOpen(false)
    }, [])

    const handleClearSearchHistory = useCallback(() => {
        setIsClearSearchHistoryModalOpen(false)
        props.onClearSearchHistory()
    }, [props.onClearSearchHistory])

    useEffect(() => {
        if (!props.open) {
            setSearchQuery('')
        }
    }, [props.open])

    return (
        <SidebarDrawer
            variant='permanent'
            anchor='left'
            open={props.open}
            PaperProps={{ sx: { backgroundColor: 'black', borderRight: '1px solid #232323' } }}
        >
            <Box
                component='div'
                paddingTop='24px'
                paddingBottom='36px'
                paddingRight='14px'
                paddingLeft='24px'
                marginTop='8px'
                marginLeft='0'
                marginBottom='8px'
                marginRight='0'
                display='block'
            >
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        lineHeight='30px'
                        minWidth='0'
                        margin='0!important'
                        color='#F5F5F5'
                        textAlign='left'
                        fontWeight='600'
                        position='relative'
                        display='block'
                        maxWidth='100%'
                        fontSize='22px'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                        }}
                    >
                        Search
                    </Box>
                </Box>
            </Box>
            <InputBase
                value={searchQuery}
                onChange={handleChangeSearchQuery}
                sx={{
                    color: '#FFFFFF',
                    backgroundColor: '#262626',
                    marginX: '16px',
                    paddingX: '16px',
                    paddingY: '4px',
                    borderRadius: '10px',
                    '& input': {
                        MozAppearance: 'textfield',
                        '&::placeholder': {
                            fontSize: '14px',
                            color: '#EEEEFF',
                        },
                    },
                }}
                startAdornment={<Search sx={{ marginRight: '5px', color: '#7A7C7F' }} />}
                endAdornment={searchQuery.length > 0 ? (
                    <IconButton
                        sx={{ padding: 0 }}
                        onClick={handleClearSearchQuery}
                    >
                        <Cancel sx={{ color: '#A8A8A8', fontSize: '17px' }} />
                    </IconButton>
                ) : null}
                placeholder='Search'
                autoFocus
            />
            <Box
                component='div'
                marginTop='24px'
                borderTop='1px solid #262626'
            />
            <Box
                component='div'
                paddingY='12px'
                display='flex'
                flexDirection='column'
                flexGrow='1'
                flexShrink='1'
                minHeight='0'
                position='relative'
                sx={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
                <Box
                    component='div'
                    border='0'
                    flexGrow='1'
                    fontSize='100%'
                    left='0'
                    margin='0'
                    position='absolute'
                    width='100%'
                    sx={{ overflowX: 'hidden', overflowY: 'auto', verticalAlign: 'baseline' }}
                >
                    {searchQuery.length > 0 ? props.isSearching ? (
                        <Box
                            component='div'
                            position='relative'
                            display='flex'
                            flexDirection='column'
                            paddingY='0'
                        >
                            {[...Array(8).keys()].map(index => (
                                <SearchDrawerUserItem
                                    key={index}
                                    loading
                                />
                            ))}
                        </Box>
                    ) : props.searchedItems.length > 0 ? (
                        <Box
                            component='div'
                            position='relative'
                            display='flex'
                            flexDirection='column'
                            paddingY='0'
                        >
                            {props.searchedItems.map(item => (
                                <SearchDrawerUserItem
                                    key={item.id}
                                    item={item}
                                    onClickItem={props.onClickItem}
                                />
                            ))}
                        </Box>
                    ) : null : props.isSearchHistoryLoading ? (
                        <Box
                            component='div'
                            position='relative'
                            display='flex'
                            flexDirection='column'
                            paddingY='0'
                        >
                            {[...Array(8).keys()].map(index => (
                                <SearchDrawerUserItem
                                    key={index}
                                    loading
                                />
                            ))}
                        </Box>
                    ) : (
                        <>
                            <Box
                                component='div'
                                margin='6px 24px 8px'
                                alignItems='stretch'
                                border='0'
                                boxSizing='border-box'
                                display='flex'
                                flexShrink='0'
                                fontSize='100%'
                                justifyContent='space-between'
                                maxHeight='24px'
                                padding='0'
                                position='relative'
                                sx={{ verticalAlign: 'baseline' }}
                            >
                                <Box
                                    component='span'
                                    lineHeight='20px'
                                    fontSize='15px'
                                    minWidth='0'
                                    margin='0!important'
                                    color='#F5F5F5'
                                    fontWeight='600'
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
                                    Recent
                                </Box>
                                {!noSearchHistoryItems && (
                                    <Button
                                        variant='primary'
                                        text='Clear all'
                                        onClick={handleOpenClearSearchHistoryModal}
                                    />
                                )}
                            </Box>
                            {props.searchHistoryItems.length > 0 && (
                                <Box
                                    component='div'
                                    position='relative'
                                    display='flex'
                                    flexDirection='column'
                                    paddingY='0'
                                >
                                    {props.searchHistoryItems.map(item => (
                                        <SearchDrawerUserItem
                                            key={item.id}
                                            item={item}
                                            onRemoveItem={props.onRemoveItem}
                                        />
                                    ))}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
                {((searchQuery.length < 1 && noSearchHistoryItems) || (searchQuery.length > 0 && noSearchedItems)) && (
                    <Box
                        component='div'
                        position='absolute'
                        top='50%'
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        width='100%'
                    >
                        <Typography
                            fontSize={14}
                            color='#A8A8A8'
                        >
                            {searchQuery.length > 0 ? 'No results found.' : 'No recent searches.'}
                        </Typography>
                    </Box>
                )}
            </Box>
            <ClearSearchHistoryModal
                open={isClearSearchHistoryModalOpen}
                onClearSearchHistory={handleClearSearchHistory}
                onCloseModal={handleCloseClearSearchHistoryModal}
            />
        </SidebarDrawer>
    )
}