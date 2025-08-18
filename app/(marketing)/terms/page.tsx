import type { Metadata } from 'next';
import Link from 'next/link';
import * as TermsContent from '@/lib/terms-constants';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Soofmaax',
  description: 'Consultez les conditions générales de vente pour les services fournis par Soofmaax.',
  robots: 'noindex, follow',
};

// Composant générique pour afficher du contenu HTML
const HtmlContent = ({ content }: { content: string }) => (
  <div 
    className="prose prose-lg max-w-none text-charcoal/80 leading-relaxed"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default function TermsOfServicePage() {
  return (
    <div className="bg-cream py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
            {TermsContent.TERMS_PAGE_TITLE}
          </h1>
          <p className="mt-4 text-lg text-charcoal/70">
            {TermsContent.TERMS_PAGE_SUBTITLE}
          </p>
        </header>

        <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-rose-powder/30">
          {TermsContent.SECTIONS.map((section) => (
            <section key={section.title} className="mb-10 last:mb-0">
              <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4 pb-2 border-b border-rose-powder/30">
                {section.title}
              </h2>
              <HtmlContent content={section.content} />
            </section>
          ))}
           <p className="mt-12 text-center text-sm text-charcoal/60">
            Pour toute question, n'hésitez pas à nous contacter via notre <Link href="/contact" className="font-semibold text-magenta hover:underline">page de contact</Link>.
          </p>
        </main>
      </div>
    </div>
  );
}
