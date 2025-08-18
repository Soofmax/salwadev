import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@soofmaax.com',
    description: 'Réponse garantie sous 24h',
    href: 'mailto:contact@soofmaax.com'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+33 (0)1 23 45 67 89',
    description: 'Lun-Ven 9h-18h',
    href: 'tel:+33123456789'
  },
  {
    icon: MapPin,
    title: 'Localisation',
    value: 'Paris, France',
    description: 'Interventions à distance et sur site',
    href: '#'
  },
  {
    icon: Calendar,
    title: 'Consultation',
    value: 'Rendez-vous gratuit',
    description: 'Planifiez un appel découverte',
    href: '#consultation'
  }
];

export default function ContactCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {contactInfo.map((info, index) => {
        const Icon = info.icon;
        return (
          <a
            key={index}
            href={info.href}
            className="bg-white rounded-2xl p-6 border border-rose-powder/30 hover:border-magenta hover:shadow-rose transition-all duration-300 group text-center flex flex-col items-center"
          >
            <div className="p-3 bg-rose-powder/20 rounded-full group-hover:bg-magenta group-hover:text-white transition-all duration-300">
              <Icon className="w-6 h-6 text-magenta group-hover:text-white" />
            </div>
            <h3 className="font-playfair font-bold text-charcoal mt-4">
              {info.title}
            </h3>
            <p className="text-charcoal font-semibold mt-2">
              {info.value}
            </p>
            <p className="text-charcoal/70 text-sm mt-1">
              {info.description}
            </p>
          </a>
        );
      })}
    </div>
  );
}
