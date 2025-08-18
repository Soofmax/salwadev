// Fichier : app/(app)/billing/invoices/page.tsx
import { InvoicesList } from '@/components/billing/InvoicesList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

// Typage des données de facturation
type InvoiceStatus = "En attente" | "Payée" | "Échouée";

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: InvoiceStatus;
  pdfUrl: string;
}

// Métadonnées pour le SEO (Next.js 15)
export const metadata: Metadata = {
  title: "Historique des Factures | Votre Service",
  description: "Consultez et téléchargez toutes vos factures passées.",
};

// Simulation d'une fonction qui récupère les factures de l'utilisateur.
// Dans une vraie application, cette fonction interrogerait votre base de données ou l'API Stripe.
async function getUserInvoices(): Promise<Invoice[]> {
  // Simule un appel réseau
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  return [
    { 
      id: 'inv_123', 
      date: new Date('2025-08-15T00:00:00Z'), 
      amount: 29.00, 
      status: 'Payée' as const, 
      pdfUrl: '/invoices/inv_123.pdf' 
    },
    { 
      id: 'inv_122', 
      date: new Date('2025-07-15T00:00:00Z'), 
      amount: 29.00, 
      status: 'Payée' as const, 
      pdfUrl: '/invoices/inv_122.pdf' 
    },
    { 
      id: 'inv_121', 
      date: new Date('2025-06-15T00:00:00Z'), 
      amount: 29.00, 
      status: 'Payée' as const, 
      pdfUrl: '/invoices/inv_121.pdf' 
    },
    { 
      id: 'inv_120', 
      date: new Date('2025-05-15T00:00:00Z'), 
      amount: 29.00, 
      status: 'Payée' as const, 
      pdfUrl: '/invoices/inv_120.pdf' 
    },
  ];
}

export default async function InvoicesPage(): Promise<JSX.Element> {
  // En tant que Server Component, on récupère les données directement.
  const invoices = await getUserInvoices();

  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
      <div className="mb-12">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/billing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la facturation
          </Link>
        </Button>
        
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
          Historique des factures
        </h1>
        
        <p className="font-montserrat mt-4 text-lg text-muted-foreground">
          Consultez et téléchargez toutes vos factures pour votre comptabilité.
        </p>
      </div>

      {/* 
        On délègue l'affichage de la liste au composant dédié.
        On lui passe les données récupérées côté serveur.
      */}
      <InvoicesList invoices={invoices} />
    </div>
  );
}
