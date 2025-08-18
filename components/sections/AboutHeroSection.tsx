import Link from 'next/link';

export function AboutHeroSection() {
  return (
    <header className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-6xl">
        Notre histoire, votre futur digital
      </h1>
      <p className="mt-6 text-xl leading-8 text-charcoal/80 max-w-3xl mx-auto">
        Soofmaax est né d'une passion pour la technologie et d'une volonté de créer des 
        <strong> solutions numériques qui ont un impact réel</strong>. Nous croyons en la puissance 
        d'un design réfléchi et d'un code performant.
      </p>
      <nav aria-label="Breadcrumb" className="mt-8">
        <ol className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
          <li>
            <Link href="/" className="hover:text-magenta transition-colors">
              Accueil
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-2">À Propos</li>
        </ol>
      </nav>
    </header>
  );
}
