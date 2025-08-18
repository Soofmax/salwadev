// next-auth.d.ts
import 'next-auth';
import 'next-auth/jwt';

// On définit les types pour les propriétés personnalisées pour éviter la répétition
interface ExtendedUser {
  id: string;
  role?: string;
  avatar?: string;
  status?: string; // ex: 'active', 'inactive', 'suspended'
  emailVerified?: boolean | Date | null;
  phone?: string | null;
  phoneVerified?: boolean | null;
  joinDate?: Date | string;
  lastLogin?: Date | string | null;
  totalOrders?: number;
  totalSpent?: number;
  averageOrderValue?: number;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  notes?: string | null;
  twoFactorEnabled?: boolean;
  location?: string;
  verified?: boolean;
}

declare module 'next-auth' {
  /**
   * L'objet User de la base de données.
   * Il est utilisé dans le callback `authorize` et le callback `jwt` (lors de la première connexion).
   */
  interface User extends ExtendedUser {}

  /**
   * L'objet Session accessible côté client via `useSession` ou `getSession`.
   */
  interface Session {
    user: ExtendedUser & {
      // Conserve les propriétés par défaut de NextAuth (name, email, image)
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  /**
   * Le token JWT qui est encodé.
   * Il est utilisé dans les callbacks `jwt` et `session`.
   */
  interface JWT extends ExtendedUser {}
}
