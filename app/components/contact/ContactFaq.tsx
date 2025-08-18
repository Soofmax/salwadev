export default function ContactFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {faqs.map((faq, index) => (
        <details 
          key={index}
          className="bg-white rounded-2xl border border-rose-powder/30 hover:border-magenta transition-all duration-300 group"
        >
          <summary className="p-6 cursor-pointer font-playfair font-bold text-charcoal hover:text-magenta transition-colors">
            {faq.question}
          </summary>
          <div className="px-6 pb-6 text-charcoal/80 border-t border-rose-powder/20">
            <p className="pt-4">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
