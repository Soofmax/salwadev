export default function ThankYouPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-cream px-4 py-24">
      <div className="bg-white rounded-xl border border-rose-powder/30 shadow p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-magenta mb-4">Merci pour votre demande !</h1>
        <p className="text-charcoal/80 text-lg mb-6">
          Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.<br />
          Un récapitulatif vous a été envoyé par email si vous l’avez indiqué.
        </p>
        <a href="/" className="inline-block mt-4 bg-gradient-rose text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:opacity-90 transition">
          Retour à l’accueil
        </a>
      </div>
    </div>
  );
}