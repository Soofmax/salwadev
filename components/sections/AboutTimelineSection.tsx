import { timeline } from '@/lib/about-constants';

export function AboutTimelineSection() {
  return (
    <section className="mt-24 pt-20 border-t border-rose-powder/20">
      <header className="text-center mb-16">
        <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
          Notre parcours
        </h2>
        <p className="mt-6 text-lg leading-8 text-charcoal/80">
          L'évolution de Soofmaax depuis sa création
        </p>
      </header>
      <div className="max-w-3xl mx-auto">
        {timeline.map((item, index) => (
          <div key={item.year} className="flex gap-6 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-rose text-white rounded-full flex items-center justify-center font-bold text-sm shadow-rose">
                {item.year}
              </div>
              {index < timeline.length - 1 && (
                <div className="w-0.5 h-16 bg-rose-powder/40 mt-4" />
              )}
            </div>
            <div className="flex-1 pt-2">
              <h3 className="text-xl font-playfair font-bold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-charcoal/80 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
