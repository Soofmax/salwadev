// Fichier : app/(app)/auth/signup/page.tsx

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

// Logique métier importée depuis vos actions (avec le nom corrigé)
import { signUp } from "@/lib/actions/auth.actions";

// Utilisation de VOS composants UI et de votre composant de statut
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
import { FormStatus } from "@/components/auth/FormStatus";

// Schéma de validation Zod pour l'inscription
const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit faire au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  password: z.string().min(8, { message: "Le mot de passe doit faire au moins 8 caractères." }),
});

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setFormStatus(null);

    startTransition(async () => {
      // Appel de votre action 'signUp' (nom corrigé)
      const result = await signUp(values); 
      
      if (result.success) {
        toast.success(result.message);
        form.reset();
        // Redirection vers la page de succès avec l'email en paramètre
        router.push(`/auth/signup-success?email=${encodeURIComponent(values.email)}`);
      } else {
        setFormStatus({ type: 'error', message: result.message });
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            Rejoignez-nous en remplissant le formulaire ci-dessous.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="john.doe@example.com" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type={showPassword ? "text" : "password"} placeholder="********" disabled={isPending} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary transition-colors">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormStatus status={formStatus} />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Création du compte..." : "S'inscrire"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/signin" className="underline hover:text-primary">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
