import Link from 'next/link';

export function NotFoundPortfolioLink() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <span className="text-sm text-charcoal-light font-medium mb-2">
        Ou découvrez&nbsp;
        <span className="font-semibold text-magenta">l’excellence digitale</span>&nbsp;:
      </span>
      <Link
        href="/portfolio"
        className="px-5 py-2 rounded-full bg-gradient-rose text-white font-bold shadow-rose hover:scale-105 hover:shadow-rose-lg transition text-base font-montserrat"
        style={{
          boxShadow: '0 2px 10px rgba(199,56,99,0.13)',
        }}
      >
        Notre Portfolio
      </Link>
    </div>
  );
}
