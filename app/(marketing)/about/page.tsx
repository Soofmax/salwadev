import { AboutHeroSection } from '@/components/sections/AboutHeroSection';
import { AboutStatsSection } from '@/components/sections/AboutStatsSection';
import { AboutValuesSection } from '@/components/sections/AboutValuesSection';
import { AboutTechSection } from '@/components/sections/AboutTechSection';
import { AboutTimelineSection } from '@/components/sections/AboutTimelineSection';
import { AboutFounderSection } from '@/components/sections/AboutFounderSection';
import { AboutPortfolioLink } from '@/components/sections/AboutPortfolioLink';
import { AboutCTASection } from '@/components/sections/AboutCTASection';

export const metadata = {
  title: 'À Propos | Soofmaax - Studio de Développement Web Expert',
  description: 'Découvrez Soofmaax, votre partenaire de confiance pour le développement web. Plus de 50 projets réalisés, une expertise technique reconnue et une approche centrée sur vos besoins.',
  keywords: ['développement web', 'studio digital', 'Next.js', 'React', 'TypeScript', 'Soofmaax'],
};

export default function AboutPage() {
  return (
    <div className="bg-cream py-24 sm:py-32 relative overflow-hidden">
      {/* Motif discret en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full opacity-10" style={{
          backgroundImage:
            'radial-gradient(circle, #ead2d8 2px, transparent 1px), radial-gradient(circle, #ead2d8 2px, transparent 1px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px'
        }} />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AboutHeroSection />
        <AboutStatsSection />
        <AboutValuesSection />
        <AboutTechSection />
        <AboutTimelineSection />
        <AboutFounderSection />
        <AboutPortfolioLink />
        <AboutCTASection />
      </div>
    </div>
  );
}
