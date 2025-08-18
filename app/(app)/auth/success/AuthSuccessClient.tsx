// Fichier : app/(app)/auth/success/AuthSuccessClient.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Types pour une meilleure maintenabilité
type SuccessMessageType = "default" | "passwordReset";

interface SuccessMessage {
  title: string;
  description: string;
  redirect: string;
  linkText: string;
}

interface AuthSuccessClientProps {
  type?: string;
}

// Messages par défaut pour différents types de succès
const successMessages: Record<SuccessMessageType, SuccessMessage> = {
  default: {
    title: "Opération réussie !",
    description: "Votre action a été effectuée avec succès.",
    redirect: "/dashboard",
    linkText: "Aller au tableau de bord",
  },
  passwordReset: {
    title: "Mot de passe mis à jour",
    description: "Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter.",
    redirect: "/auth/signin",
    linkText: "Retour à la connexion",
  },
  // Ajoutez d'autres cas au besoin
};

export function AuthSuccessClient({ type }: AuthSuccessClientProps) {
  const router = useRouter();
  
  // Détermine le type de succès à afficher avec validation
  const messageType = (type && type in successMessages) 
    ? type as SuccessMessageType 
    : "default";
    
  const { title, description, redirect, linkText } = successMessages[messageType];
  
  // Redirection automatique après 3 secondes pour une meilleure UX
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirect);
    }, 3000);
    
    return () => clearTimeout(timer); // Nettoyage du timer
  }, [router, redirect]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="mt-4 text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href={redirect}>{linkText}</Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Vous serez redirigé automatiquement...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
