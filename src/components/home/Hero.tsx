import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ImageWithFallback from '../ui/ImageWithFallback';

const trustItems = [
  'Sourcing personnalisé',
  'Accompagnement',
  'Fournisseurs vérifiés',
  'Livraison Madagascar',
  'Suivi commercial',
];

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-chm-gray pt-28 lg:pt-36 pb-16 lg:pb-24">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-chm-border shadow-sm">
              <span className="text-xs font-bold text-chm-gold uppercase tracking-wider">Sourcing International</span>
              <span className="text-chm-text-light">→</span>
              <span className="text-xs font-bold text-chm-red uppercase tracking-wider">Madagascar</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-chm-charcoal leading-tight">
              Vos équipements professionnels, directement de Chine à Madagascar
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-chm-text-light leading-relaxed max-w-xl">
              China Hub Mada vous accompagne dans la recherche, l'achat, le contrôle et l'importation de machines et de produits adaptés à votre activité.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/produits"
                className="inline-flex items-center justify-center px-6 py-3 bg-chm-red text-white font-semibold rounded-lg hover:bg-chm-red-dark transition-colors shadow-lg shadow-chm-red/20"
              >
                Explorer les produits
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-chm-charcoal text-chm-charcoal font-semibold rounded-lg hover:bg-chm-charcoal hover:text-white transition-colors"
              >
                Parler à un conseiller
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
              {trustItems.map(item => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  <span className="text-sm text-chm-text-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                alt="Équipements professionnels importés de Chine"
                className="w-full aspect-[4/3]"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-chm-red/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-chm-gold/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
