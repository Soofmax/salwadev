'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/providers';
import { useAuth } from '@/app/providers';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { services, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();

  const cartItemsCount = services.length;

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-rose-powder/20"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-playfair text-2xl font-bold text-gradient">
              Salwa Dev Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Navigation principale"
          >
            <Link
              href="/"
              className="text-charcoal hover:text-magenta transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/services"
              className="text-charcoal hover:text-magenta transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="text-charcoal hover:text-magenta transition-colors font-medium"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="text-charcoal hover:text-magenta transition-colors font-medium"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-charcoal hover:text-magenta transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative hover:bg-rose-powder/20 hover:text-magenta"
              aria-label={`Panier (${cartItemsCount} article${cartItemsCount > 1 ? 's' : ''})`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 w-5 h-5 bg-magenta text-white text-xs rounded-full flex items-center justify-center font-medium"
                  aria-hidden="true"
                >
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-rose-powder/20 hover:text-magenta"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="border-magenta text-magenta hover:bg-magenta hover:text-white hidden sm:inline-flex"
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    className="text-charcoal hover:text-magenta"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-rose hover:opacity-90 text-white shadow-rose">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden hover:bg-rose-powder/20"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-4 border-t border-rose-powder/20"
            id="mobile-menu"
            role="navigation"
            aria-label="Navigation mobile"
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-charcoal hover:text-magenta transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/services"
                className="text-charcoal hover:text-magenta transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="text-charcoal hover:text-magenta transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className="text-charcoal hover:text-magenta transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="text-charcoal hover:text-magenta transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {!user && (
                <div className="pt-4 border-t border-rose-powder/20 space-y-2">
                  <Link href="/auth/signin">
                    <Button
                      variant="outline"
                      className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white"
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-gradient-rose hover:opacity-90 text-white shadow-rose">
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
