import { Code2, Zap, Users, Trophy, Calendar, Heart, Rocket, Star } from 'lucide-react';

// On exporte toutes les données qui étaient dans le fichier de la page

export const studioStats = [
  { number: "50+", label: "Projets livrés", icon: Trophy },
  { number: "98%", label: "Clients satisfaits", icon: Star }, // Assurez-vous d'importer Star si vous l'utilisez
  { number: "3 ans", label: "D'expérience", icon: Calendar },
  { number: "24h", label: "Temps de réponse", icon: Zap },
];

export const technologies = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", 
  "Tailwind CSS", "Prisma", "Vercel", "AWS"
];

export const values = [
  {
    icon: Code2,
    title: "Excellence technique",
    description: "Code propre, architectures scalables et bonnes pratiques pour des solutions durables."
  },
  {
    icon: Users,
    title: "Approche collaborative",
    description: "Communication transparente et implication du client à chaque étape du projet."
  },
  {
    icon: Rocket,
    title: "Innovation constante",
    description: "Veille technologique active pour proposer les solutions les plus modernes."
  },
  {
    icon: Heart,
    title: "Passion du métier",
    description: "Chaque ligne de code écrite avec soin, chaque interface pensée pour l'utilisateur."
  }
];

export const timeline = [
  {
    year: "2021",
    title: "Les débuts",
    description: "Création du studio avec une vision claire : démocratiser l'accès aux technologies modernes."
  },
  // ... etc.
];
