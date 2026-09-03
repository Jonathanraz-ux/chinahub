import { Link } from 'react-router-dom';
import { categories } from '../../data';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function CategoriesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Explorez nos catégories"
          subtitle="Trouvez l'équipement adapté à votre secteur d'activité"
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.filter(c => c.productCount > 0).map(category => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-video"
            >
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2">
                  {category.description}
                </p>
                <span className="inline-block mt-3 text-sm font-semibold text-chm-gold group-hover:underline">
                  {category.productCount} produit{category.productCount > 1 ? 's' : ''} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
