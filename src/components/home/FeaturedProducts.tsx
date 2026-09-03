import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from '../ui/ProductCard';

export default function FeaturedProducts() {
  const { ref, isVisible } = useScrollAnimation();
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-20 bg-chm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Produits en vedette"
          subtitle="Découvrez nos équipements les plus demandés"
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-chm-red text-chm-red font-semibold rounded-lg hover:bg-chm-red hover:text-white transition-colors"
          >
            Voir tous les produits
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
