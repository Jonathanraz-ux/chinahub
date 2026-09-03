import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data';
import SectionTitle from '../components/ui/SectionTitle';
import Breadcrumb from '../components/ui/Breadcrumb';
import ImageWithFallback from '../components/ui/ImageWithFallback';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', to: '/' },
            { label: 'Catégories' },
          ]}
        />

        <div className="mt-8">
          <SectionTitle
            title="Toutes nos catégories"
            subtitle="Parcourez nos catégories pour trouver les équipements adaptés à votre secteur d'activité."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2">
                  {category.description}
                </p>
                <span className="inline-block mt-3 text-sm font-semibold text-chm-gold group-hover:underline">
                  {category.productCount > 0 ? `${category.productCount} produit${category.productCount > 1 ? 's' : ''}` : 'Prix sur demande'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-chm-gray rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-chm-charcoal mb-4">
            Vous ne trouvez pas votre équipement ?
          </h2>
          <p className="text-chm-text-light max-w-2xl mx-auto mb-8">
            Nous pouvons trouver n'importe quel produit ou machine depuis la Chine selon vos besoins spécifiques.
          </p>
          <Link
            to="/sourcing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-chm-red text-white font-semibold rounded-lg hover:bg-chm-red-dark transition-colors"
          >
            Sourcing personnalisé
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
