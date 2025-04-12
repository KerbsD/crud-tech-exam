import React from 'react';

const Modal = ({ show, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="containers border mt-3">
            <div
                style={{ animation: "pop 0.4s ease-out" }}
            >
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal; 