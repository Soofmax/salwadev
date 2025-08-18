import Link from 'next/link';

export function AboutPortfolioLink() {
  return (
    <div className="mt-12 flex flex-col items-center">
      <span className="text-base text-charcoal-light font-medium mb-2">
        Découvrez&nbsp;
        <span className="font-semibold text-magenta">notre excellence digitale</span>&nbsp;:
      </span>
      <Link
        href="/portfolio"
        className="px-6 py-2 rounded-full bg-gradient-rose text-white font-bold shadow-rose hover:scale-105 hover:shadow-rose-lg transition text-base font-montserrat"
        style={{
          boxShadow: '0 2px 10px rgba(199,56,99,0.13)',
        }}
      >
        Portfolio Soofmaax
      </Link>
    </div>
  );
}
