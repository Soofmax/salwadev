import { Send } from 'lucide-react';

export default function ContactForm() {
  return (
    <form className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-charcoal mb-2">
            Prénom *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-charcoal mb-2">
            Nom *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
            placeholder="Votre nom"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
            placeholder="+33 1 23 45 67 89"
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-semibold text-charcoal mb-2">
          Type de projet *
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
        >
          <option value="">Sélectionnez un type de projet</option>
          <option value="site-vitrine">Site vitrine</option>
          <option value="e-commerce">E-commerce</option>
          <option value="application">Application web</option>
          <option value="refonte">Refonte de site existant</option>
          <option value="seo">SEO / Référencement</option>
          <option value="maintenance">Maintenance / Support</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-semibold text-charcoal mb-2">
          Budget estimé
        </label>
        <select
          id="budget"
          name="budget"
          className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
        >
          <option value="">Sélectionnez une fourchette</option>
          <option value="moins-1000">Moins de 1 000€</option>
          <option value="1000-3000">1 000€ - 3 000€</option>
          <option value="3000-5000">3 000€ - 5 000€</option>
          <option value="5000-10000">5 000€ - 10 000€</option>
          <option value="plus-10000">Plus de 10 000€</option>
          <option value="a-discuter">À discuter</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
          Décrivez votre projet *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
          placeholder="Décrivez votre projet, vos objectifs, vos contraintes, votre délai souhaité..."
        />
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-semibold text-charcoal mb-2">
          Délai souhaité
        </label>
        <select
          id="timeline"
          name="timeline"
          className="w-full px-4 py-3 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-2 focus:ring-magenta/20 transition-all duration-300"
        >
          <option value="">Sélectionnez un délai</option>
          <option value="urgent">Urgent (moins de 2 semaines)</option>
          <option value="1-mois">Dans le mois</option>
          <option value="2-3-mois">2-3 mois</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-lg font-semibold bg-gradient-rose text-white hover:opacity-90 shadow-rose transition-all duration-300"
        >
          <Send className="w-5 h-5" />
          Envoyer ma demande
        </button>
        <p className="mt-4 text-sm text-charcoal/70">
          Réponse garantie sous <strong>24h ouvrées</strong>
        </p>
      </div>
    </form>
  );
}
