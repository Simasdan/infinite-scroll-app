import React from 'react'

interface LinkProps {
    to: string;
    children: React.ReactNode;
}

const Link = ({ to, children }: LinkProps) => {

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        if (window.location.pathname === to) {
            window.location.reload()
        } else {
            window.history.pushState({}, '', to)
            const event = new CustomEvent('locationchange');
            window.dispatchEvent(event);
        }
    }

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    )
}

export default Link