import { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';
import s from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  children 
}: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        <button className={s.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
