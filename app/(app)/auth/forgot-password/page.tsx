// Fichier : app/(app)/auth/forgot-password/page.tsx

"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

// Logique métier importée depuis vos actions
import { requestPasswordReset } from "@/lib/actions/auth.actions";

// Utilisation de VOS composants UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// Importation du composant FormStatus (qui attend la prop "status")
import { FormStatus } from "@/components/auth/FormStatus";

// Schéma de validation Zod
const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
});

// Définition du type pour l'état du formulaire pour plus de clarté
type FormStatusType = { type: 'error' | 'success', message: string } | null;

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<FormStatusType>(null);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setFormStatus(null);

    startTransition(async () => {
      const result = await requestPasswordReset(values.email);
      
      // Mettre à jour l'état du formulaire avec le résultat de l'action
      setFormStatus({ type: result.success ? 'success' : 'error', message: result.message });

      // Afficher une notification toast
      if (result.success) {
        toast.success(result.message);
        // On ne vide pas le formulaire pour que l'utilisateur voie pour quel e-mail il a fait la demande
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Mot de passe oublié ?</CardTitle>
          <CardDescription>
            Pas de problème. Saisissez votre e-mail et nous vous enverrons un lien pour le réinitialiser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="john.doe@example.com" disabled={isPending || formStatus?.type === 'success'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* ================================================================== */}
              {/*                         CORRECTION APPLIQUÉE                       */}
              {/* On passe l'objet "formStatus" directement à la prop "status".      */}
              {/* Le composant gère lui-même s'il doit s'afficher ou non.            */}
              <FormStatus status={formStatus} />
              {/* ================================================================== */}

              <Button type="submit" className="w-full" disabled={isPending || formStatus?.type === 'success'}>
                {isPending ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <Link href="/auth/signin" className="underline text-muted-foreground hover:text-primary">
              Retour à la connexion
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
