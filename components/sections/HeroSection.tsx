'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Star, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Glamour', 'Performantes', 'Innovantes', 'Créatives'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-rose-powder/10 to-cream"
      aria-label="Section d'accueil principale"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-20 left-10 animate-float">
          <Star className="w-8 h-8 text-magenta" />
        </div>
        <div
          className="absolute top-40 right-20 animate-float"
          style={{ animationDelay: '1s' }}
        >
          <Sparkles className="w-6 h-6 text-rose-powder" />
        </div>
        <div
          className="absolute bottom-40 left-20 animate-float"
          style={{ animationDelay: '2s' }}
        >
          <Heart className="w-7 h-7 text-magenta" />
        </div>
        <div
          className="absolute bottom-20 right-10 animate-float"
          style={{ animationDelay: '3s' }}
        >
          <Zap className="w-5 h-5 text-rose-powder" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-rose-powder/30 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-magenta" aria-hidden="true" />
            <span className="text-sm font-medium text-charcoal">
              Développeuse Web & Blockchain
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-charcoal mb-6 leading-tight">
            Solutions Web
            <br />
            <span className="text-gradient relative">
              <span aria-live="polite" aria-atomic="true">
                {words[currentWord]}
              </span>
              <div
                className="absolute -inset-1 bg-gradient-rose opacity-20 blur-2xl rounded-lg"
                aria-hidden="true"
              ></div>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-charcoal/80 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Je transforme vos idées en expériences digitales exceptionnelles.
            Sites vitrines, landing pages, intégrations Web3 et bien plus
            encore.
          </p>

          {/* Stats */}
          <div 
            className="flex flex-wrap justify-center gap-8 mb-12"
            role="region"
            aria-label="Statistiques de performance"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta font-playfair">
                50+
              </div>
              <div className="text-sm text-charcoal/70 font-medium">
                Projets Réalisés
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta font-playfair">
                100%
              </div>
              <div className="text-sm text-charcoal/70 font-medium">
                Clients Satisfaits
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-magenta font-playfair">
                48h
              </div>
              <div className="text-sm text-charcoal/70 font-medium">
                Temps de Livraison
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <nav 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            aria-label="Actions principales"
          >
            <Link href="/services">
              <Button
                size="lg"
                className="bg-gradient-rose hover:opacity-90 text-white shadow-rose-lg px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Découvrir mes Services
                <Sparkles className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-magenta text-magenta hover:bg-magenta hover:text-white px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Voir mon Portfolio
              </Button>
            </Link>
          </nav>

          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-charcoal/60"
            role="region"
            aria-label="Indicateurs de confiance"
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                aria-hidden="true"
              ></div>
              <span>Disponible pour nouveaux projets</span>
            </div>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-magenta" aria-hidden="true" />
              <span>Livraison express</span>
            </div>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center space-x-2">
              <Heart 
                className="w-4 h-4 text-magenta fill-current" 
                aria-hidden="true" 
              />
              <span>Support personnalisé</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-label="Faire défiler vers le bas"
        >
          <ArrowDown className="w-6 h-6 text-magenta" />
        </div>
      </div>
    </section>
  );
}
