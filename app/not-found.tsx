import { NotFoundTitle } from '@/components/sections/NotFoundTitle';
import { NotFoundSubtitle } from '@/components/sections/NotFoundSubtitle';
import { NotFoundDescription } from '@/components/sections/NotFoundDescription';
import { NotFoundActions } from '@/components/sections/NotFoundActions';
import { NotFoundPortfolioLink } from '@/components/sections/NotFoundPortfolioLink';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center px-4 bg-cream relative overflow-hidden">
      {/* Motif discret */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ead2d8 2px, transparent 1px), radial-gradient(circle, #ead2d8 2px, transparent 1px)',
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0, 14px 14px',
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <NotFoundTitle />
        <NotFoundSubtitle />
        <NotFoundDescription />
        <NotFoundActions />
        <NotFoundPortfolioLink />
      </div>
    </div>
  );
}
