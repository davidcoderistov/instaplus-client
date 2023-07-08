import React, { useState } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'


interface Props {
    onChangeLocation(location: string): void
}

export default function LocationInput(props: Props) {

    const [location, setLocation] = useState('')

    const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value)
        props.onChangeLocation(event.target.value)
    }

    return (
        <Box
            component='div'
            borderRadius='0'
            bgcolor='transparent'
            flexDirection='column'
            boxSizing='border-box'
            display='flex'
            flexShrink='0'
            alignItems='stretch'
            alignSelf='auto'
            justifyContent='flex-start'
            position='relative'
            flexGrow='0'
            marginTop='5px'
            sx={{
                overflowY: 'visible',
                overflowX: 'visible',
            }}
        >
            <Box
                component='div'
                width='100%'
                display='flex'
                alignItems='center'
                position='relative'
            >
                <InputBase
                    value={location}
                    onChange={handleChangeLocation}
                    sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            display: 'none',
                        },
                        '& input': {
                            MozAppearance: 'textfield',
                        },
                        color: '#FFFFFF',
                        '&.MuiInputBase-root.Mui-disabled': {
                            color: 'red',
                        },
                        '&.Mui-disabled': { '.MuiInputBase-input': { 'WebkitTextFillColor': '#7A7C7F' } },
                        fontSize: '14px',
                        paddingX: '16px',
                    }}
                    inputProps={{
                        maxLength: 125,
                    }}
                    placeholder='Write a location...'
                    endAdornment={
                        <svg
                            aria-label='Add location'
                            style={{ display: 'block', position: 'relative' }}
                            color='rgb(168, 168, 168)'
                            fill='rgb(168, 168, 168)'
                            height='24'
                            role='img'
                            viewBox='0 0 24 24'
                            width='24'
                        >
                            <title>Add location</title>
                            <path
                                d='M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z' />
                        </svg>}
                    fullWidth
                />
            </Box>
        </Box>
    )
}
