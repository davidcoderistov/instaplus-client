import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'


interface Props {
    id: string
    label: string
    dark?: boolean
    error: boolean
    errorMessage: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(({
                                                                     id,
                                                                     label,
                                                                     dark,
                                                                     error,
                                                                     errorMessage,
                                                                     ...rest
                                                                 }, ref) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <TextField
            {...rest}
            ref={ref}
            error={error}
            helperText={error && errorMessage ? errorMessage : ''}
            required
            fullWidth
            id={id}
            label={label}
            type={showPassword ? 'text' : 'password'}
            autoComplete={id}
            sx={dark ? {
                '& label.Mui-focused': {
                    color: '#F5F5F5',
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: '#F5F5F5',
                    },
                },
            } : {}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge='end'
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
})

export default PasswordInput