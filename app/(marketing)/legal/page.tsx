import type { Metadata } from 'next';
import Link from 'next/link';
// On importe TOUT le contenu depuis notre fichier de constantes
import * as LegalContent from '@/lib/legal-constants';

export const metadata: Metadata = {
  title: 'Mentions Légales | Soofmaax',
  description: 'Informations légales concernant le site et l\'éditeur Soofmaax.',
  robots: 'noindex, follow',
};

// Le composant Section reste le même, il est parfait pour la structure
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4">
      {title}
    </h2>
    {/* On utilise 'prose' pour que le HTML soit bien stylisé */}
    <div 
      className="prose max-w-none text-charcoal/80 leading-relaxed"
      // Cette prop permet d'afficher du HTML stocké dans nos constantes
      dangerouslySetInnerHTML={{ __html: children as string }}
    />
  </section>
);

export default function LegalPage() {
  return (
    <div className="bg-cream py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
            {LegalContent.LEGAL_PAGE_TITLE}
          </h1>
          <p className="mt-4 text-lg text-charcoal/70">
            {LegalContent.LEGAL_PAGE_SUBTITLE}
          </p>
        </header>

        <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-rose-powder/30">
          
          <Section title={LegalContent.EDITOR_SECTION.title}>
            {LegalContent.EDITOR_SECTION.content}
            <p className="mt-4">{LegalContent.EDITOR_SECTION.director}</p>
          </Section>

          <Section title={LegalContent.HOSTING_SECTION.title}>
            {LegalContent.HOSTING_SECTION.content}
          </Section>

          <Section title={LegalContent.INTELLECTUAL_PROPERTY_SECTION.title}>
            {LegalContent.INTELLECTUAL_PROPERTY_SECTION.content}
          </Section>

          <Section title={LegalContent.PERSONAL_DATA_SECTION.title}>
            {LegalContent.PERSONAL_DATA_SECTION.content}
            <p className="mt-4">
              Consultez notre <Link href="/privacy" className="font-semibold text-magenta hover:underline">Politique de Confidentialité</Link>.
            </p>
          </Section>

        </main>
      </div>
    </div>
  );
}
