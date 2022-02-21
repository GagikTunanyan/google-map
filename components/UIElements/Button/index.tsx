import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

interface PropTypes {
    className?: string;
    color?: 'info' | 'warning' | 'success' | 'delete'; 
    onClick?: CallableFunction 
};

const getColor = (color: string | undefined) => {
    switch (color) {
        case "delete":
            return styles.Delete;
        case "warning":
            return styles.Warning;
        case "success": 
            return styles.Success;
        default:
            return styles.Info;
    }
}

const Button: React.FC<PropTypes & ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { type, className, children, color, onClick } = props
    return (
        <button 
            // {...props}
            onClick={(e) => !!onClick && onClick(e)}
            type={type ?? 'button'}
            className={`${styles.Button} ${className ?? ''} ${getColor(color)}`}
        >
            {children}
        </button>
    )
};

export default Button;