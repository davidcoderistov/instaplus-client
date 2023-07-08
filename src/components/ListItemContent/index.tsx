import Box from '@mui/material/Box'


interface Props {
    children: any
    gutters: boolean
}

export default function ListItemContent(props: Props) {

    return (
        <Box
            component='div'
            flexShrink='1'
            minWidth='0'
            flexBasis='auto'
            boxSizing='border-box'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            flexDirection='row'
            position='relative'
            zIndex='0'
            flexGrow='1'
            flexWrap='wrap'
        >
            <Box
                component='div'
                minWidth='0'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                flexShrink='0'
                position='relative'
                zIndex='0'
                flexGrow='1'
                maxWidth='100%'
            >
                <Box
                    component='div'
                    alignContent='stretch'
                    bgcolor='transparent'
                    minWidth='0'
                    flexDirection='column'
                    boxSizing='border-box'
                    display='flex'
                    minHeight='0'
                    position='static'
                    alignSelf='auto'
                    justifyContent='flex-start'
                    flexGrow='1'
                    alignItems='flex-start'
                    sx={{
                        overflowY: 'visible',
                        borderBottomLeftRadius: '0',
                        borderBottomRightRadius: '0',
                        overflowX: 'visible',
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        ...props.gutters && { rowGap: '7px' },
                    }}
                >
                    {props.children}
                </Box>
            </Box>
        </Box>
    )
}