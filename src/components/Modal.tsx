import React, { useEffect, useRef, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (ev: globalThis.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(ev.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          ref={popupRef}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-8 rounded shadow-md w-1/3 border ">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
