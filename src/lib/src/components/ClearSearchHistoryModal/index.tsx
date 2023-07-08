import React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'


interface Props {
    open: boolean

    onClearSearchHistory(): void

    onCloseModal(): void
}

export default function ClearSearchHistoryModal(props: Props) {

    return (
        <Dialog
            open={props.open}
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#262626',
                    borderRadius: '12px',
                    maxWidth: '400px',
                },
            }}
            onClose={props.onCloseModal}
        >
            <Box
                component='div'
                justifyContent='center'
                flexDirection='column'
                display='flex'
                alignItems='center'
                overflow='hidden'
                position='relative'
                zIndex='0'
                boxSizing='content-box'
            >
                <Box
                    component='div'
                    width='400px'
                    flexShrink='1'
                    position='relative'
                    display='block'
                >
                    <Box
                        component='div'
                        display='flex'
                        flexDirection='column'
                    >
                        <Box
                            component='div'
                            margin='32px'
                            alignItems='stretch'
                            border='0'
                            boxSizing='border-box'
                            display='flex'
                            flexDirection='column'
                            flexShrink='0'
                            fontSize='100%'
                            padding='0'
                            position='relative'
                            textAlign='center'
                            sx={{ verticalAlign: 'baseline' }}
                        >
                            <Box
                                component='span'
                                lineHeight='25px'
                                fontWeight='400'
                                minWidth='0'
                                margin='0!important'
                                color='#F5F5F5'
                                position='relative'
                                fontSize='20px'
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
                                Clear search history?
                            </Box>
                            <Box
                                component='span'
                                lineHeight='18px'
                                paddingTop='10px'
                                fontSize='14px'
                                fontWeight='400'
                                minWidth='0'
                                margin='0!important'
                                color='#A8A8A8'
                                position='relative'
                                display='block'
                                maxWidth='100%'
                                sx={{
                                    overflowY: 'visible',
                                    wordWrap: 'break-word',
                                    overflowX: 'visible',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                You won't be able to undo this. If you clear your search history, you may still see
                                accounts you've searched for as suggested results.
                            </Box>
                        </Box>
                        <Button
                            variant='text'
                            fullWidth
                            color='error'
                            size='large'
                            sx={{
                                color: '#ED4956',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'inherit',
                                },
                                borderTop: '1px solid #363636',
                                borderBottom: '1px solid #363636',
                            }}
                            onClick={props.onClearSearchHistory}
                            disableElevation
                            disableRipple
                        >
                            Clear all
                        </Button>
                        <Button
                            variant='text'
                            fullWidth
                            sx={{
                                color: '#F5F5F5',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'inherit',
                                },
                            }}
                            onClick={props.onCloseModal}
                            disableElevation
                            disableRipple
                        >
                            Not now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}