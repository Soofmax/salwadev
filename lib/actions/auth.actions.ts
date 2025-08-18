// Fichier : lib/actions/auth.actions.ts

"use server"; // Applique la directive à toutes les fonctions de ce fichier

import { z } from "zod";
// import { db } from "@/lib/db"; // Exemple d'import de votre client de base de données
// import bcrypt from "bcryptjs"; // Exemple d'import pour le hachage de mot de passe

// ============================================================================
// ACTION : CONNEXION (SIGN IN)
// ============================================================================
const SignInSchema = z.object({
  email: z.string().email("Un email valide est requis."),
  password: z.string().min(1, "Le mot de passe est requis."),
});

export async function signIn(
  values: z.infer<typeof SignInSchema>
): Promise<{ success: boolean; message: string }> {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "Données de connexion invalides." };
  }

  const { email, password } = validatedFields.data;

  // TODO: Remplacer par votre logique métier
  // 1. Rechercher l'utilisateur par email.
  // 2. Vérifier si l'email est vérifié.
  // 3. Comparer le mot de passe.
  // 4. Créer la session utilisateur.
  console.log("Tentative de connexion pour:", { email });
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (password === "fail") { // Pour tester facilement un échec
    return { success: false, message: "Email ou mot de passe incorrect." };
  }

  return { 
    success: true, 
    message: "Connexion réussie !" 
  };
}

// ============================================================================
// ACTION : INSCRIPTION (SIGN UP)
// ============================================================================
const SignUpSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email({ message: "Veuillez fournir une adresse email valide." }),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
});

export async function signUp(
  values: z.infer<typeof SignUpSchema>
): Promise<{ success: boolean; message: string }> {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "Données d'inscription invalides." };
  }

  const { name, email, password } = validatedFields.data;

  // TODO: Remplacer par votre logique métier
  console.log("Création du compte pour:", { name, email });
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { 
    success: true, 
    message: "Inscription réussie ! Un email de vérification a été envoyé." 
  };
}

// ============================================================================
// ACTION : VÉRIFICATION D'EMAIL
// ============================================================================
const VerifyEmailSchema = z.object({
  token: z.string().min(1, "Le token de vérification est invalide."),
});

export async function verifyEmail(
  token: string
): Promise<{ success: boolean; message: string }> {
  const validatedFields = VerifyEmailSchema.safeParse({ token });

  if (!validatedFields.success) {
    return { success: false, message: "Token invalide." };
  }

  // TODO: Remplacer par votre logique métier
  console.log("Vérification de l'email avec le token:", token);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Votre email a été vérifié avec succès. Vous pouvez maintenant vous connecter." };
}


// ============================================================================
// ACTION : DEMANDE DE RÉINITIALISATION DE MOT DE PASSE
// ============================================================================
const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez fournir une adresse email valide." }),
});

export async function requestPasswordReset(
  email: string
): Promise<{ success: boolean; message: string }> {
  const validatedFields = ResetPasswordSchema.safeParse({ email });

  if (!validatedFields.success) {
    return { success: false, message: "Adresse email invalide." };
  }

  // TODO: Logique métier
  console.log("Demande de réinitialisation pour:", validatedFields.data.email);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Si un compte est associé à cet email, un lien de réinitialisation a été envoyé.",
  };
}

// ============================================================================
// ACTION : CHANGEMENT EFFECTIF DU MOT DE PASSE
// ============================================================================
const NewPasswordSchema = z.object({
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
  token: z.string().min(1, "Le token est manquant ou invalide."),
});

export async function changePassword(
  values: z.infer<typeof NewPasswordSchema>
): Promise<{ success: boolean; message: string }> {
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: errorMessage };
  }

  const { password, token } = validatedFields.data;

  // TODO: Logique métier
  console.log("Mise à jour du mot de passe pour l'utilisateur associé au token:", token);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Votre mot de passe a été mis à jour avec succès." };
}

// ============================================================================
// ACTION : MISE À JOUR DU PROFIL UTILISATEUR
// ============================================================================
const UpdateProfileSchema = z.object({
  userId: z.string(),
  name: z.string().min(2, "Le nom est requis.").optional(),
});

export async function updateProfile(
  values: z.infer<typeof UpdateProfileSchema>
): Promise<{ success: boolean; message: string }> {
  const validatedFields = UpdateProfileSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, message: "Données invalides." };
  }

  // TODO: Remplacer par votre logique métier
  console.log("Mise à jour du profil pour l'utilisateur:", values.userId);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Votre profil a été mis à jour." };
}

// ============================================================================
// ACTION : SUPPRESSION DE COMPTE
// ============================================================================
const DeleteAccountSchema = z.object({
  userId: z.string(),
  confirmation: z.string().regex(/^supprimer mon compte$/, {
    message: "Veuillez taper 'supprimer mon compte' pour confirmer."
  })
});

export async function deleteAccount(
  values: z.infer<typeof DeleteAccountSchema>
): Promise<{ success: boolean; message: string }> {
  const validatedFields = DeleteAccountSchema.safeParse(values);
  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: errorMessage };
  }

  // TODO: Remplacer par votre logique métier
  console.log("Suppression du compte pour l'utilisateur:", values.userId);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Votre compte a été supprimé avec succès." };
}
