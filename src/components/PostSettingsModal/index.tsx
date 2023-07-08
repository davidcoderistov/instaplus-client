import React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'


interface Props {
    open: boolean
    following: boolean

    onUnfollowUser(): void

    onGoToPost(): void

    onViewProfile(): void

    onCloseModal(): void
}

export default function PostSettingsModal(props: Props) {

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
            sx={{ zIndex: 99999 }}
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
                        {props.following && (
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
                                    paddingY: '12px',
                                    borderBottom: '1px solid #363636',
                                }}
                                onClick={props.onUnfollowUser}
                                disableElevation
                                disableRipple
                            >
                                Unfollow
                            </Button>
                        )}
                        <Button
                            variant='text'
                            fullWidth
                            sx={{
                                color: '#F5F5F5',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'inherit',
                                },
                                paddingY: '12px',
                                borderBottom: '1px solid #363636',
                            }}
                            onClick={props.onGoToPost}
                            disableElevation
                            disableRipple
                        >
                            Go to post
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
                                paddingY: '12px',
                                borderBottom: '1px solid #363636',
                            }}
                            onClick={props.onViewProfile}
                            disableElevation
                            disableRipple
                        >
                            About this account
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
                                paddingY: '12px',
                            }}
                            onClick={props.onCloseModal}
                            disableElevation
                            disableRipple
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}