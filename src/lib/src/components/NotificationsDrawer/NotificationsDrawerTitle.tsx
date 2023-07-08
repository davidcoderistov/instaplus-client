import Box from '@mui/material/Box'
import Button from '../Button'


interface Props {
    title: string
    showSeeAll?: boolean

    onSeeAll?(): void
}

export default function NotificationsDrawerTitle(props: Props) {

    return (
        <Box
            component='div'
            paddingRight='24px'
            paddingTop='0'
            paddingLeft='24px'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginTop='22px'
            marginBottom='18px'
            paddingBottom='0'
        >
            <Box
                component='span'
                lineHeight='20px'
                fontSize='16px'
                minWidth='0'
                color='#F5F5F5'
                margin='0!important'
                fontWeight='700'
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
                {props.title}
            </Box>
            {props.showSeeAll && (
                <Button
                    variant='primary'
                    text='See all'
                    onClick={props.onSeeAll}
                />
            )}
        </Box>
    )
}