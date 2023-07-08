import React from 'react'


interface Props {
    ariaLabel: string
    path: React.ReactNode
    large?: boolean
}

export default function AppDrawerIcon(props: Props) {

    const size = props.large ? 48 : 24

    return (
        <svg
            aria-label={props.ariaLabel}
            style={{ display: 'block', position: 'relative' }}
            color='rgb(245, 245, 245)'
            fill='rgb(245, 245, 245)'
            height='24'
            role='img'
            viewBox={`0 0 ${size} ${size}`}
            width='24'
        >
            {props.path}
        </svg>
    )
}