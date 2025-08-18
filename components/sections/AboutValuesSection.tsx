import { values } from '@/lib/about-constants';

export function AboutValuesSection() {
  return (
    <section className="mt-24 pt-20 border-t border-rose-powder/20">
      <header className="text-center mb-16">
        <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
          Nos valeurs fondamentales
        </h2>
        <p className="mt-6 text-lg leading-8 text-charcoal/80 max-w-2xl mx-auto">
          Ce qui nous anime au quotidien et guide chacune de nos décisions
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <article key={value.title} className="bg-white rounded-2xl p-8 border border-rose-powder/30 hover:border-magenta hover:shadow-rose transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rose-powder/20 rounded-xl">
                  <Icon className="w-6 h-6 text-magenta" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-charcoal">
                  {value.title}
                </h3>
              </div>
              <p className="text-charcoal/80 leading-relaxed">{value.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
