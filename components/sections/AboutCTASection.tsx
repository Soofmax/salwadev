import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

export function AboutCTASection() {
  return (
    <section className="mt-24 pt-20 border-t border-rose-powder/20">
      <div className="max-w-4xl mx-auto text-center bg-gradient-rose rounded-2xl p-12 text-white shadow-rose-lg">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-white/20 rounded-full">
            <Target className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold tracking-tight sm:text-4xl mb-6">
          Prêt à concrétiser votre projet ?
        </h2>
        <p className="text-xl leading-8 mb-8 opacity-90">
          Discutons de vos objectifs et découvrons ensemble comment 
          nous pouvons vous aider à les atteindre.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="bg-white text-magenta hover:bg-cream shadow-lg">
            <Link href="/contact">Démarrer un projet</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-magenta">
            <Link href="/services">Voir nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
