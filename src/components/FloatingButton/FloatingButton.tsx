import React, {FC, ReactNode} from 'react';
import cl from './FloatingButton.module.scss'

interface FloatingButtonProps {
    children: ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FloatingButton:FC<FloatingButtonProps> = ({children, ...props}:FloatingButtonProps) => {
    return (
        <button className={cl.btn} {...props}>
            {children}
        </button>
    );
};

export default FloatingButton;