import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300); // Wait for animation to finish
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={20} className="toast-icon success" />;
            case 'error': return <XCircle size={20} className="toast-icon error" />;
            default: return <Info size={20} className="toast-icon info" />;
        }
    };

    return (
        <div className={`toast-message ${type} ${isExiting ? 'exit' : 'enter'}`}>
            <div className="toast-content">
                {getIcon()}
                <span>{message}</span>
            </div>
            <button className="toast-close" onClick={handleClose}>
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
