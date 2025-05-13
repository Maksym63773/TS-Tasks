import React, {FC} from 'react';
import './Modal.scss';

interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    children: React.ReactNode;
}

const Modal:FC<ModalProps> = ({active,setActive,children}:ModalProps) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;