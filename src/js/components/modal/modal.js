import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({children}) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      {children}
    </div>,
    document.querySelector("#modal-root")
  )
};

export default Modal;