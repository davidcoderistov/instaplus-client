import Box from '@mui/material/Box'


interface Props {
    children: any
    gutters?: boolean
    clickable?: boolean
    dark?: boolean
    opaque?: boolean
    onClick?: () => void
}

export default function ListItem(props: Props) {

    return (
        <Box
            component='div'
            paddingLeft='0'
            bgcolor={props.opaque ? '#000000' : 'transparent'}
            width='100%'
            paddingTop='0'
            minWidth='0'
            flexBasis='auto'
            marginTop='0'
            marginBottom='0'
            boxSizing='border-box'
            paddingRight='0'
            minHeight='0'
            flexShrink='0'
            alignItems='stretch'
            flexDirection='row'
            position='relative'
            marginLeft='0'
            display='block'
            zIndex='0'
            maxWidth='100%'
            paddingBottom='0'
            textAlign='inherit'
            marginRight='0'
            sx={{
                borderRightStyle: 'solid',
                borderBottomColor: props.opaque ? '#262626' : '#00000066',
                borderLeftWidth: '0',
                borderTopColor: '#00000066',
                borderBottomRightRadius: 'unset',
                touchAction: 'manipulation',
                borderRightWidth: '0',
                borderRightColor: '#00000066',
                borderTopWidth: '0',
                userSelect: 'none',
                borderLeftColor: '#00000066',
                borderLeftStyle: 'solid',
                borderBottomLeftRadius: 'unset',
                outlineStyle: 'none',
                borderBottomWidth: props.opaque ? '1px' : '0',
                borderBottomStyle: 'solid',
                borderTopLeftRadius: 'unset',
                borderTopRightRadius: 'unset',
                borderTopStyle: 'solid',
                ...props.clickable && {
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: props.opaque ? '#1A1A1A' : props.dark ? '#3C3C3C' : '#121212',
                    },
                },
            }}
            onClick={props.onClick}
        >
            <Box
                component='div'
                paddingBottom='8px'
                alignContent='stretch'
                bgcolor='transparent'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                flexShrink='0'
                paddingTop='8px'
                position='static'
                paddingLeft={props.gutters ? '24px' : '16px'}
                alignItems='stretch'
                paddingRight={props.gutters ? '24px' : '16px'}
                alignSelf='auto'
                justifyContent='flex-start'
                flexGrow='0'
                sx={{
                    overflowY: 'visible',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                    overflowX: 'visible',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                }}
            >
                <Box
                    component='div'
                    justifyContent='center'
                    minWidth='0'
                    flexDirection='column'
                    boxSizing='border-box'
                    display='flex'
                    alignItems='stretch'
                    position='relative'
                    zIndex='0'
                    flexGrow='1'
                >
                    <Box
                        component='div'
                        flexWrap='nowrap'
                        boxSizing='border-box'
                        display='flex'
                        alignItems='center'
                        flexShrink='0'
                        justifyContent='space-between'
                        flexDirection='row'
                        position='relative'
                        zIndex='0'
                    >
                        {props.children}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}