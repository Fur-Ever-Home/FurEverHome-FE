import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthRequiredModal.css';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText?: string; // <-- 1. Adăugăm prop-ul pentru textul butonului
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  buttonText = "Autentifică-te" // <-- 2. Valoare implicită dacă nu e trimis
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="auth-modal-close">
          ✕
        </button>
        
        <p className="auth-modal-message">
          {message}
        </p>
        
        <button className="auth-modal-btn" onClick={handleLoginClick}>
          {buttonText} {/* <-- 3. Afișăm textul tradus */}
        </button>
      </div>
    </div>
  );
};

export default AuthRequiredModal;