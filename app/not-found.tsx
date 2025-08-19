import { NotFoundTitle } from '@/components/sections/NotFoundTitle';
import { NotFoundSubtitle } from '@/components/sections/NotFoundSubtitle';
import { NotFoundDescription } from '@/components/sections/NotFoundDescription';
import { NotFoundActions } from '@/components/sections/NotFoundActions';
import { NotFoundPortfolioLink } from '@/components/sections/NotFoundPortfolioLink';

import './(app)/not-found.css';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function NotFound() {
  // Canvas animation: simple colored dots floating
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate dots
    const dots = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 14 + Math.random() * 16,
      dx: -0.5 + Math.random(),
      dy: -0.5 + Math.random(),
      opacity: 0.18 + Math.random() * 0.20,
      color: Math.random() > 0.5 ? "#e11d48" : "#f472b6"
    }));

    let animationFrame: number;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.globalAlpha = dot.opacity;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color;
        ctx.fill();
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < -dot.r) dot.x = width + dot.r;
        if (dot.x > width + dot.r) dot.x = -dot.r;
        if (dot.y < -dot.r) dot.y = height + dot.r;
        if (dot.y > height + dot.r) dot.y = -dot.r;
      }
      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section>
      <canvas ref={canvasRef}></canvas>
      <section className="signin">
        <h2>404</h2>
        <p>Oups, cette page n’existe pas ou n’est plus disponible.</p>
        <Link href="/" className="button404">
          Retour à l’accueil
        </Link>
      </section>
    </section>
  );
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
