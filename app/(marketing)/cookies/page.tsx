import type { Metadata } from 'next';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import * as CookiesContent from '@/lib/cookies-constants';

export const metadata: Metadata = {
  title: 'Politique de Gestion des Cookies | Soofmaax',
  description: 'Découvrez comment Soofmaax utilise les cookies pour améliorer votre expérience.',
  robots: 'noindex, follow',
};

const HtmlContent = ({ content }: { content: string }) => (
  <div 
    className="prose prose-lg max-w-none text-charcoal/80 leading-relaxed"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default function CookiesPolicyPage() {
  return (
    <div className="bg-cream py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
            {CookiesContent.COOKIES_PAGE_TITLE}
          </h1>
          <p className="mt-4 text-lg text-charcoal/70">
            {CookiesContent.COOKIES_PAGE_SUBTITLE}
          </p>
        </header>

        <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-rose-powder/30">
          {CookiesContent.SECTIONS.map((section) => (
            <section key={section.title} className="mb-10 last:mb-0">
              <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4 pb-2 border-b border-rose-powder/30">
                {section.title}
              </h2>
              <HtmlContent content={section.content} />
              {section.title === "Comment gérer vos cookies ?" && (
                <div className="mt-6">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-charcoal border border-rose-powder/30 hover:border-magenta hover:shadow-rose rounded-lg transition-all duration-300 font-semibold">
                    <Settings className="w-4 h-4" />
                    Gérer mes préférences de cookies
                  </button>
                </div>
              )}
            </section>
          ))}
          <p className="mt-12 text-center text-sm text-charcoal/60">
            Pour plus d'informations, consultez notre <Link href="/privacy" className="font-semibold text-magenta hover:underline">Politique de Confidentialité</Link>.
          </p>
        </main>
      </div>
    </div>
  );
}
