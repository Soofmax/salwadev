import Link from 'next/link';
import { Sparkles, Heart, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-playfair text-xl font-bold text-gradient">
                SDS
              </span>
            </div>
            <p className="text-sm text-cream/80 leading-relaxed">
              Créatrice de solutions web glamour et performantes. Transformons
              ensemble vos idées en expériences digitales exceptionnelles.
            </p>
            <div className="flex space-x-3">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-magenta/20 hover:text-rose-powder"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-magenta/20 hover:text-rose-powder"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-magenta/20 hover:text-rose-powder"
              >
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-rose-powder">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Sites Vitrines
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Landing Pages
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Intégrations Web3
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  SEO Avancé
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Internationalisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-rose-powder">
              Entreprise
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-rose-powder">
              Légal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-sm text-cream/80 hover:text-rose-powder transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-cream/60 flex items-center space-x-1">
            <span>© 2024 SDS. Créé avec</span>
            <Heart className="w-4 h-4 text-magenta fill-current" />
            <span>et beaucoup de café</span>
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-xs text-cream/60">
            <span>Made with Next.js</span>
            <span>•</span>
            <span>Hébergé sur Vercel</span>
            <span>•</span>
            <span>Blockchain Polygon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
