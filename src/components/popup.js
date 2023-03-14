import { useState } from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'
        }`}
    >
      <div className="bg-white rounded-lg p-6">
        <button className="absolute top-0 right-0" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;