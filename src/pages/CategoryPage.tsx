import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
import { products, categories } from '../data';
import ProductCard from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import Breadcrumb from '../components/ui/Breadcrumb';
import ImageWithFallback from '../components/ui/ImageWithFallback';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-chm-gray flex items-center justify-center mx-auto mb-8">
            <SearchX className="w-12 h-12 text-chm-text-light" />
          </div>
          <h1 className="text-3xl font-bold text-chm-charcoal mb-4">
            Catégorie non trouvée
          </h1>
          <p className="text-chm-text-light mb-8">
            La catégorie que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 px-8 py-4 bg-chm-red text-white font-bold rounded-xl hover:bg-chm-red-dark transition-colors"
          >
            <ArrowLeft size={18} />
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const categoryProducts = products.filter(p => p.categorySlug === category.slug);

  return (
    <div className="min-h-screen bg-white pb-16">
      <section className="bg-chm-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', to: '/' },
              { label: 'Produits', to: '/produits' },
              { label: category.name },
            ]}
          />

          <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-chm-charcoal mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-chm-text-light mb-6">{category.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-chm-red/10 text-chm-red text-sm font-semibold rounded-full">
                  {categoryProducts.length} produit{categoryProducts.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-chm-border shadow-lg">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={`Produits dans "${category.name}"`}
            subtitle="Découvrez notre sélection de produits pour cette catégorie."
          />

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-chm-gray flex items-center justify-center mx-auto mb-6">
                <SearchX className="w-10 h-10 text-chm-text-light" />
              </div>
              <h3 className="text-xl font-bold text-chm-charcoal mb-2">
                Aucun produit dans cette catégorie
              </h3>
              <p className="text-chm-text-light mb-8 max-w-md mx-auto">
                Cette catégorie est en cours de mise à jour. Contactez-nous pour
                un sourcing personnalisé de ce type de produit.
              </p>
              <Link
                to="/sourcing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-chm-red text-white font-semibold rounded-xl hover:bg-chm-red-dark transition-colors"
              >
                Demander un sourcing
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}