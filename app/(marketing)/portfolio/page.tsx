export default function PortfolioPage() {
  // Exemple de données de projet (à remplacer par tes vrais projets)
  const projects = [
    {
      id: 'project-1',
      title: 'Site vitrine Soofmaax',
      description: 'Création d’un site vitrine moderne, responsive et optimisé SEO pour un client du secteur tech.',
      image: '/images/portfolio-vitrine.jpg',
      link: '#',
    },
    {
      id: 'project-2',
      title: 'E-commerce Next.js',
      description: 'Développement d’une boutique en ligne performante avec gestion de panier et paiement sécurisé.',
      image: '/images/portfolio-ecommerce.jpg',
      link: '#',
    },
    // Ajoute autant de projets que tu veux !
  ];

  return (
    <div className="bg-cream py-24 sm:py-32 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
            Portfolio
          </h1>
          <p className="mt-4 text-lg text-charcoal/70">
            Découvrez nos réalisations web, e-commerce, applications et branding.
          </p>
        </header>

        {/* Grid responsive des projets */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map(project => (
            <article 
              key={project.id}
              className="bg-white rounded-2xl shadow-rose p-8 border border-rose-powder/30 flex flex-col items-center transition hover:scale-[1.03] hover:shadow-magenta duration-300"
            >
              <div className="w-32 h-32 mb-6 rounded-xl bg-charcoal/10 flex items-center justify-center overflow-hidden">
                {/* Image du projet */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold text-charcoal mb-2 text-center">
                {project.title}
              </h3>
              <p className="text-charcoal/70 mb-4 text-center">
                {project.description}
              </p>
              <a 
                href={project.link} 
                className="text-magenta font-semibold hover:underline"
                target="_blank" rel="noopener"
              >
                Voir le projet
              </a>
            </article>
          ))}
        </section>

        {/* CTA pour contacter ou voir plus de projets */}
        <div className="mt-20 flex justify-center">
          <a
            href="/contact"
            className="bg-magenta text-white font-bold rounded-lg px-8 py-4 shadow-rose text-lg hover:opacity-90 transition"
          >
            Discutons de votre projet !
          </a>
        </div>
      </div>
    </div>
  );
}
