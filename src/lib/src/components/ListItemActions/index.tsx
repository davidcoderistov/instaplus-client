import Box from '@mui/material/Box'


interface Props {
    children: any
}

export default function ListItemActions(props: Props) {

    return (
        <Box
            component='div'
            minWidth='0'
            flexDirection='column'
            alignSelf='center'
            boxSizing='border-box'
            display='flex'
            flexShrink='0'
            position='relative'
            zIndex='0'
            maxWidth='100%'
        >
            <Box
                component='div'
                flexShrink='1'
                alignContent='stretch'
                bgcolor='transparent'
                boxSizing='border-box'
                display='flex'
                position='static'
                alignItems='stretch'
                flexDirection='row'
                alignSelf='auto'
                justifyContent='flex-start'
                flexGrow='0'
                marginLeft='12px'
                sx={{
                    overflowY: 'visible',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                    overflowX: 'visible',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                }}
            >
                {props.children}
            </Box>
        </Box>
    )
}