// Fichier: components/billing/DownloadInvoiceButton.tsx

'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

interface DownloadInvoiceButtonProps {
  invoiceId: string;
  pdfUrl: string; // Dans une vraie app, on pourrait ne passer que l'ID
}

export function DownloadInvoiceButton({ invoiceId, pdfUrl }: DownloadInvoiceButtonProps) {
  // On utilise useTransition pour gérer l'état de chargement sans bloquer l'UI.
  const [isPending, startTransition] = useTransition();

  const handleDownload = () => {
    startTransition(() => {
      // Dans une application réelle, on pourrait appeler une Server Action
      // qui génère un lien de téléchargement sécurisé et temporaire.
      // Pour cette démo, on simule le téléchargement en ouvrant le lien PDF.
      console.log(`Téléchargement de la facture ${invoiceId}...`);
      
      // Ouvre le lien du PDF dans un nouvel onglet.
      // Le navigateur gérera le téléchargement ou l'affichage.
      window.open(pdfUrl, '_blank');
    });
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleDownload}
      disabled={isPending}
      className="font-montserrat"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      Télécharger
    </Button>
  );
}
