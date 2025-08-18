import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Mail, Linkedin, Github } from 'lucide-react';

export function AboutFounderSection() {
  return (
    <section className="mt-24 pt-20 border-t border-rose-powder/20">
      <header className="text-center mb-12">
        <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
          Rencontrez le fondateur
        </h2>
      </header>
      <div className="max-w-4xl mx-auto">
        <article className="bg-white rounded-2xl p-8 border border-rose-powder/30 hover:border-magenta hover:shadow-rose transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-rose-powder/30">
                <AvatarImage src="/images/founder-avatar.jpg" alt="Soofmaax" />
                <AvatarFallback className="text-2xl bg-rose-powder/20 text-charcoal font-playfair">
                  SM
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-playfair font-bold text-charcoal mb-2">
                Soofmaax
              </h3>
              <p className="text-magenta font-semibold mb-4">
                Fondateur & Lead Developer
              </p>
              <p className="text-charcoal/80 mb-6 leading-relaxed">
                Passionné de développement web depuis plus de 5 ans, j'ai créé Soofmaax 
                avec la conviction que chaque entreprise mérite des solutions numériques 
                à la hauteur de ses ambitions.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center gap-2 text-charcoal/70">
                  <MapPin className="w-4 h-4" />
                  <span>Paris, France</span>
                </div>
                <div className="flex gap-2">
                  <Link href="mailto:contact@soofmaax.com" className="p-2 bg-rose-powder/20 hover:bg-magenta hover:text-white rounded-lg transition-all duration-300" aria-label="Envoyer un email">
                    <Mail className="w-4 h-4" />
                  </Link>
                  <Link href="#" className="p-2 bg-rose-powder/20 hover:bg-magenta hover:text-white rounded-lg transition-all duration-300" aria-label="Profil LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </Link>
                  <Link href="#" className="p-2 bg-rose-powder/20 hover:bg-magenta hover:text-white rounded-lg transition-all duration-300" aria-label="Profil GitHub">
                    <Github className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
