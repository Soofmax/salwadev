// Fichier: components/billing/InvoicesList.tsx

'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DownloadInvoiceButton } from "./DownloadInvoiceButton";

// Définition du type pour une facture.
// Ce type peut être partagé dans un fichier de types plus tard.
interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: 'Payée' | 'En attente' | 'Échouée';
  pdfUrl: string;
}

interface InvoicesListProps {
  invoices: Invoice[];
}

export function InvoicesList({ invoices }: InvoicesListProps) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-center border-2 border-dashed rounded-lg p-12">
        <h3 className="font-playfair text-2xl">Aucune facture trouvée</h3>
        <p className="font-montserrat text-muted-foreground mt-2">
          Votre historique de facturation est vide pour le moment.
        </p>
      </div>
    );
  }

  const statusVariant = {
    'Payée': 'default',
    'Échouée': 'destructive',
    'En attente': 'secondary',
  };

  return (
    <Card className="shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-montserrat font-semibold">Date</TableHead>
            <TableHead className="font-montserrat font-semibold">Montant</TableHead>
            <TableHead className="font-montserrat font-semibold">Statut</TableHead>
            <TableHead className="text-right font-montserrat font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-montserrat">
                {invoice.date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </TableCell>
              <TableCell className="font-montserrat font-semibold">
                {invoice.amount.toFixed(2)}€
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status] as 'default' | 'destructive' | 'secondary'}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {/* On délègue l'action de téléchargement à un composant bouton dédié */}
                <DownloadInvoiceButton invoiceId={invoice.id} pdfUrl={invoice.pdfUrl} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// Note: J'ai ajouté une Card autour de la Table pour un meilleur style.
// Il faudra donc importer Card depuis "@/components/ui/card".
import { Card } from "@/components/ui/card";
