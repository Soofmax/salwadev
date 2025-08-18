import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NotFoundActions() {
  return (
    <div className="flex gap-4 justify-center mb-4 flex-wrap">
      <Button asChild className="bg-gradient-rose text-white px-6 py-3 font-bold rounded-xl shadow-rose text-base hover:brightness-110 transition">
        <Link href="/">Retour à l'accueil</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="border-magenta text-magenta px-6 py-3 font-bold rounded-xl text-base hover:bg-magenta/10 transition"
      >
        <Link href="/services">Découvrir nos services</Link>
      </Button>
    </div>
  );
}
