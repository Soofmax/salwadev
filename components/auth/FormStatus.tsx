// Fichier: components/auth/FormStatus.tsx
import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react'; // Icônes plus jolies et cohérentes

// 1. Définir le type de l'objet status que l'on va recevoir
type StatusObject = {
  type: 'success' | 'error';
  message: string;
} | null; // On autorise null pour pouvoir le cacher facilement

// 2. Mettre à jour l'interface pour accepter une seule prop : "status"
interface FormStatusProps {
  status: StatusObject;
}

export const FormStatus = ({ status }: FormStatusProps) => {
  // 3. Si status est null ou n'a pas de message, on n'affiche rien
  if (!status || !status.message) {
    return null;
  }

  const isSuccess = status.type === 'success';

  // Utilisation des classes Tailwind pour le style, comme dans le reste de ton projet
  const wrapperClasses = `
    flex items-center p-3 rounded-md my-4 text-sm
    ${isSuccess ? 'bg-emerald-500/15 text-emerald-600' : 'bg-destructive/15 text-destructive'}
  `;

  const Icon = isSuccess ? CheckCircle2 : AlertTriangle;

  return (
    <div className={wrapperClasses}>
      <Icon className="h-4 w-4 mr-2" />
      <span>{status.message}</span>
    </div>
  );
};
