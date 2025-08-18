// Fichier : app/(app)/auth/signin/page.tsx

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

// Logique métier
import { signIn } from "@/lib/actions/auth.actions";

// Composants UI
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
// Le composant qui causait l'erreur (maintenant corrigé à sa source)
import { FormStatus } from "@/components/auth/FormStatus";

// Schéma de validation Zod pour la connexion
const SignInSchema = z.object({
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});

// Le type pour l'état du formulaire, pour plus de clarté
type FormStatusType = { type: 'error' | 'success', message: string } | null;

export default function SignInPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<FormStatusType>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setFormStatus(null);

    startTransition(async () => {
      const result = await signIn(values);
      
      if (result.success) {
        form.reset();
        router.push("/dashboard"); 
      } else {
        setFormStatus({ type: 'error', message: result.message });
        form.setValue("password", "");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Heureux de vous revoir ! Connectez-vous à votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
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
              
              <div className="text-right text-sm">
                <Link href="/auth/forgot-password" className="underline hover:text-primary">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Cette ligne est maintenant valide car FormStatus accepte la prop "status" */}
              <FormStatus status={formStatus} />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Vous n'avez pas de compte ?{" "}
            <Link href="/auth/signup" className="underline hover:text-primary">
              S'inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
