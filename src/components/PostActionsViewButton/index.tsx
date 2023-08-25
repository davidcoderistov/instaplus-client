import PostActionsButton from '../PostActionsButton'
import React from 'react'


interface Props {
    onClick(): void
}

export default function PostActionsViewButton(props: Props) {

    return (
        <PostActionsButton onClick={props.onClick}>
            {({ isHovered }) => (
                <svg
                    aria-label='View'
                    style={{ display: 'block', position: 'relative' }}
                    color={isHovered ? '#A8A8A8' : '#F5F5F5'}
                    fill={isHovered ? '#A8A8A8' : '#F5F5F5'}
                    height='24'
                    role='img'
                    viewBox={`0 0 23 23`}
                    width='24'
                >
                    <title>View</title>
                    <polygon fill='none'
                             points='13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953'
                             stroke='currentColor'
                             strokeLinecap='round'
                             strokeLinejoin='round'
                             strokeWidth='2' />
                    <polygon fillRule='evenodd'
                             points='10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056' />
                    <circle cx='12.001' cy='12.005' fill='none' r='10.5'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2' />
                </svg>
            )}
        </PostActionsButton>
    )
}