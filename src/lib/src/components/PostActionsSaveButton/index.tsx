import PostActionsButton from '../PostActionsButton'


interface Props {
    isPostSaved: boolean

    onSavePost(): void

    onRemovePost(): void
}

export default function PostActionsSaveButton(props: Props) {

    const handleClick = () => {
        if (props.isPostSaved) {
            props.onRemovePost()
        } else {
            props.onSavePost()
        }
    }

    return (
        <PostActionsButton onClick={handleClick}>
            {({ isHovered }) => props.isPostSaved ? (
                <svg
                    aria-label='Remove'
                    style={{ display: 'block', position: 'relative' }}
                    color='rgb(245, 245, 245)'
                    fill='rgb(245, 245, 245)'
                    height='24'
                    role='img'
                    viewBox='0 0 24 24'
                    width='24'
                >
                    <title>Remove</title>
                    <path
                        d='M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z' />
                </svg>
            ) : (
                <svg
                    aria-label='Save'
                    style={{ display: 'block', position: 'relative' }}
                    color={isHovered ? '#A8A8A8' : '#F5F5F5'}
                    fill={isHovered ? '#A8A8A8' : '#F5F5F5'}
                    height='24'
                    role='img'
                    viewBox='0 0 24 24'
                    width='24'
                >
                    <title>Save</title>
                    <polygon
                        fill='none'
                        points='20 21 12 13.44 4 21 4 3 20 3 20 21'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2' />
                </svg>
            )}
        </PostActionsButton>
    )
}