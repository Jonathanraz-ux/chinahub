import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function SpecificNeeds() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-chm-charcoal">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Vous recherchez une machine spécifique ?
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Notre équipe peut rechercher le fournisseur idéal pour votre besoin particulier.
          Décrivez-nous votre projet et nous nous occupons du reste.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/sourcing"
            className="inline-flex items-center justify-center px-6 py-3 bg-chm-red text-white font-semibold rounded-lg hover:bg-chm-red-dark transition-colors shadow-lg shadow-chm-red/30"
          >
            Sourcing personnalisé
          </Link>
          <Link
            to="/produits"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-chm-charcoal transition-colors"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
