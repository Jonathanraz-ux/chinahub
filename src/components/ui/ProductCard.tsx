import { Link } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import type { Product } from '../../types';
import ImageWithFallback from './ImageWithFallback';
import { useRequests } from '../../context/RequestContext';
import { showToast } from './Toast';

interface ProductCardProps {
  product: Product;
}

const badgeColors: Record<string, string> = {
  'Populaire': 'bg-chm-gold text-white',
  'Nouveau': 'bg-blue-500 text-white',
  'Promo': 'bg-green-500 text-white',
  'Sur commande': 'bg-chm-charcoal text-white',
  'Disponible': 'bg-green-100 text-green-700',
};

const availabilityColors: Record<string, string> = {
  available: 'bg-green-500',
  'on-order': 'bg-amber-500',
  limited: 'bg-red-500',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useRequests();

  const handleAddToRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1, '');
    showToast(`"${product.name}" ajouté à vos demandes`, 'success');
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-chm-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link to={`/produits/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
          <ImageWithFallback src={product.images[0]} alt={product.name} className="w-full h-full" />
        </div>
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.badges.map(badge => (
              <span
                key={badge}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full ${badgeColors[badge] || 'bg-gray-500 text-white'}`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <Link to={`/produits/${product.slug}`} className="group-hover:text-chm-red transition-colors">
          <p className="text-xs font-medium text-chm-red uppercase tracking-wide mb-1">{product.category}</p>
          <h3 className="text-base font-bold text-chm-charcoal line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-chm-text-light line-clamp-2 mb-4">
          {product.shortDescription}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-chm-charcoal">
              {product.price}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-chm-text-light">
              <span className={`w-2 h-2 rounded-full ${availabilityColors[product.availability] || 'bg-gray-400'}`} />
              {product.availability === 'available' ? 'Disponible' : product.availability === 'on-order' ? 'Sur commande' : 'Stock limité'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/produits/${product.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-chm-red border border-chm-red rounded-lg hover:bg-chm-red hover:text-white transition-colors"
            >
              <Eye size={16} />
              Voir le produit
            </Link>
            <button
              onClick={handleAddToRequest}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium text-chm-text-light border border-chm-border rounded-lg hover:text-chm-red hover:border-chm-red hover:bg-red-50 transition-colors"
              aria-label="Ajouter à ma demande"
              title="Ajouter à ma demande"
            >
              <Plus size={16} />
              Demande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
