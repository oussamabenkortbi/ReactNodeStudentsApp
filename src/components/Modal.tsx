import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, show, onClose, children }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);


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