import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Importăm hook-ul de navigare
import './AuthRequiredModal.css';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose, message }) => {
  const navigate = useNavigate(); // <-- 2. Inițializăm navigarea

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose(); // Închidem modalul pentru a nu rămâne deschis în fundal
    navigate('/login'); // <-- 3. Pune aici ruta ta corectă (ex: '/autentificare' sau '/login')
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
        
        {/* 4. Am adăugat evenimentul onClick pe buton */}
        <button className="auth-modal-btn" onClick={handleLoginClick}>
          Autentifică-te
        </button>
      </div>
    </div>
  );
};

export default AuthRequiredModal;