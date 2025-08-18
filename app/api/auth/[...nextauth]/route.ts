// Fichier : app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockUsers } from "@/src/data/mocks/mockUsers";
// L'import de 'User' n'est plus strictement nécessaire avec cette approche, mais ne pose pas de problème.

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = mockUsers.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );

        // Si l'utilisateur est trouvé, on retourne l'objet utilisateur complet.
        // C'est parfait, car le callback 'jwt' pourra l'utiliser.
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  
  // ==================================================================
  // SECTION CORRIGÉE ET OPTIMISÉE
  // ==================================================================
  callbacks: {
    /**
     * Ce callback est appelé quand un token JWT est créé (à la connexion).
     * Il sert à enrichir le token avec les données de l'utilisateur.
     */
    async jwt({ token, user }) {
      // L'objet 'user' n'est disponible que lors de la première connexion.
      // On utilise l'opérateur "spread" (...) pour fusionner toutes les propriétés
      // de l'objet 'user' dans le 'token'. C'est propre et évolutif.
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },

    /**
     * Ce callback est appelé quand une session est accédée côté client.
     * Il sert à envoyer les données du token vers le client.
     */
    async session({ session, token }) {
      // On remplace l'objet 'session.user' par le contenu complet du 'token'.
      // Le token contient déjà toutes nos propriétés étendues (id, role, status, etc.).
      // Le 'as any' indique à TypeScript de nous faire confiance sur la structure de l'objet,
      // ce qui est sûr ici grâce à notre fichier next-auth.d.ts et au tsconfig.json ajusté.
      session.user = token as any;
      return session;
    },
  },
  // ==================================================================

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
});

export { handler as GET, handler as POST };
