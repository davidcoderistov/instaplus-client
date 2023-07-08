import PostActionsButton from '../PostActionsButton'


interface Props {
    onClick(): void
}

export default function PostActionsCommentButton(props: Props) {

    return (
        <PostActionsButton onClick={props.onClick}>
            {({ isHovered }) => (
                <svg
                    aria-label='Comment'
                    style={{ display: 'block', position: 'relative' }}
                    color={isHovered ? '#A8A8A8' : '#F5F5F5'}
                    fill={isHovered ? '#A8A8A8' : '#F5F5F5'}
                    height='24'
                    role='img'
                    viewBox='0 0 24 24'
                    width='24'
                >
                    <title>Comment</title>
                    <path
                        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                        fill='none'
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth='2' />
                </svg>
            )}
        </PostActionsButton>
    )
}