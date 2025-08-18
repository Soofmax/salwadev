// Fichier: app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { Providers } from './providers';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner'; // <-- 1. Importer la bannière
import { cn } from '@/lib/utils'; // <-- 2. Importer l'utilitaire de classes

// Définition des polices
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap', // Améliore les performances de chargement des polices
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap', // Améliore les performances de chargement des polices
});

// 3. Métadonnées enrichies pour un meilleur SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://votre-domaine.com'), // <-- Mettez votre URL de production ici
  title: {
    default: 'Salwa Dev Studio - Services de Développement Sur-Mesure',
    template: '%s | Salwa Dev Studio', // Permet aux pages enfants de définir leur propre titre (ex: "Services | Salwa Dev Studio")
  },
  description:
    'Créatrice de solutions web glamour et performantes. Sites vitrines, landing pages, intégrations Web3 et plus encore.',
  keywords: [
    'développement web',
    'création site internet',
    'site vitrine',
    'landing page',
    'e-commerce',
    'web3',
    'react',
    'next.js',
    'freelance',
  ],
  authors: [
    {
      name: "Votre Nom ou Nom de l'entreprise",
      url: 'https://votre-domaine.com',
    },
  ],
  creator: "Votre Nom ou Nom de l'entreprise",

  openGraph: {
    title: 'SDS - Services de Développement Sur-Mesure',
    description: 'Créatrice de solutions web glamour et performantes.',
    url: 'https://votre-domaine.com',
    siteName: 'SDS',
    // images: [ // <-- Ajoutez une image pour le partage sur les réseaux sociaux
    //   {
    //     url: '/og-image.png', // Doit être dans votre dossier /public
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: 'fr_FR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SDS - Services de Développement Sur-Mesure',
    description: 'Créatrice de solutions web glamour et performantes.',
    // creator: '@votreHandleTwitter',
    // images: ['/og-image.png'], // La même image que pour OpenGraph
  },

  robots: {
    // Instructions pour les robots d'indexation
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      {' '}
      {/* suppressHydrationWarning est utile avec next-themes */}
      <body
        className={cn(
          'bg-cream text-charcoal font-montserrat antialiased', // <-- 4. Classes plus propres
          playfair.variable,
          montserrat.variable
        )}
      >
        <Providers>
          <Header />
          <main className="pt-20">
            {' '}
            {/* Ajusté à 5rem (80px) pour un header un peu plus haut */}
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" richColors />
          <CookieBanner /> {/* <-- 5. Ajout de la bannière */}
        </Providers>
      </body>
    </html>
  );
}
