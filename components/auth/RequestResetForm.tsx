// Fichier: components/auth/FormStatus.tsx
import React from 'react';

interface FormStatusProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string | undefined;
}

export const FormStatus: React.FC<FormStatusProps> = ({ type = 'info', message }) => {
  if (!message) return null;

  const getStatusStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '1rem',
          fontSize: '14px'
        };
      case 'error':
        return {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '1rem',
          fontSize: '14px'
        };
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '1rem',
          fontSize: '14px'
        };
      case 'info':
      default:
        return {
          backgroundColor: '#d1ecf1',
          color: '#0c5460',
          border: '1px solid #bee5eb',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '1rem',
          fontSize: '14px'
        };
    }
  };

  return (
    <div style={getStatusStyles()}>
      {message}
    </div>
  );
};
