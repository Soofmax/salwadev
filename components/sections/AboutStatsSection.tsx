import { studioStats } from '@/lib/about-constants';

export function AboutStatsSection() {
  return (
    <section className="mt-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {studioStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center bg-white rounded-2xl p-6 border border-rose-powder/30 hover:border-magenta hover:shadow-rose transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-rose-powder/20 rounded-full">
                  <Icon className="w-6 h-6 text-magenta" />
                </div>
              </div>
              <div className="text-3xl font-playfair font-bold text-charcoal">
                {stat.number}
              </div>
              <div className="text-charcoal/70 mt-1">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
