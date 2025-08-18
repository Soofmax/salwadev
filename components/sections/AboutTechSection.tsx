import { technologies } from '@/lib/about-constants';

export function AboutTechSection() {
  return (
    <section className="mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-4xl">
          Notre stack technologique
        </h2>
        <p className="mt-4 text-lg text-charcoal/80">
          Technologies modernes pour des solutions performantes
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {technologies.map((tech) => (
          <span key={tech} className="bg-white text-charcoal border border-rose-powder/30 hover:border-magenta hover:shadow-rose px-4 py-2 text-sm rounded-lg transition-all duration-300 font-semibold">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
