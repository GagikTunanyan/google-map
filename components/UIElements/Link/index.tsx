import React from "react";
import Link from "next/link";
import styles from './Link.module.scss';

interface PropTypes {
    to: string;
    className?: string;
    target?: '_blank' | '_parent' | 'self' | '_top'
}

const CustomLink: React.FC<PropTypes> = (props) => {
    const { to, children, className, target } = props
    return (
        <Link href={to}>
            <a className={className} target={target ?? '_self'}>{children}</a>
        </Link>
    )
};

export default CustomLink;