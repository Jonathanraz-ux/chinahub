import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-chm-red">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Prêt à démarrer votre projet d'importation ?
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Contactez-nous dès maintenant pour un devis gratuit ou pour discuter de votre projet
          avec l'un de nos experts en sourcing international.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-chm-red font-semibold rounded-lg hover:bg-chm-cream transition-colors shadow-lg"
          >
            Demander un devis gratuit
          </Link>
          <a
            href="tel:+261343119768"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}
