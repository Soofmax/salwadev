import { Mail, MapPin } from 'lucide-react';

// On exporte chaque morceau de texte comme une constante.
export const LEGAL_PAGE_TITLE = "Mentions Légales";
export const LEGAL_PAGE_SUBTITLE = "Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique.";

export const EDITOR_SECTION = {
  title: "1. Éditeur du site",
  content: `
    Le présent site, accessible à l’URL www.soofmaax.com, est édité par :
    <br /><br />
    <strong>Soofmaax (EI)</strong>,
    <br />
    Entreprise Individuelle
    <br />
    Adresse : 123 Rue de l'Exemple, 75001 Paris, France
    <br />
    Email : contact@soofmaax.com
    <br />
    N° SIRET : 123 456 789 00010
  `,
  director: "Le directeur de la publication est Soofmaax."
};

export const HOSTING_SECTION = {
  title: "2. Hébergement",
  content: `
    Le site est hébergé par la société Vercel Inc., située au :
    <br /><br />
    <strong>Vercel Inc.</strong>
    <br />
    340 S Lemon Ave #4133, Walnut, CA 91789, USA
    <br />
    Contact : vercel.com/contact
  `
};

export const INTELLECTUAL_PROPERTY_SECTION = {
  title: "3. Propriété intellectuelle",
  content: `
    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
    Toute reproduction totale ou partielle de ce site sans l'autorisation expresse de l'éditeur est interdite et constituerait une contrefaçon.
  `
};

export const PERSONAL_DATA_SECTION = {
  title: "4. Données personnelles",
  content: `
    La collecte et le traitement des données personnelles s'effectuent dans le respect du RGPD. Pour plus d'informations, veuillez consulter notre Politique de Confidentialité.
  `
};

