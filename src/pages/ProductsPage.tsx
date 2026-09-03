import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '../data';
import ProductCard from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import type { Product } from '../types';
import { cn } from '../utils';

const SECTORS = ['Agroalimentaire', 'Industrie', 'Énergie', 'Construction', 'Textile', 'Impression'];

const PRICE_RANGES = [
  { label: 'Moins de 500 000 Ar', min: 0, max: 500000 },
  { label: '500 000 - 1 000 000 Ar', min: 500000, max: 1000000 },
  { label: 'Plus de 1 000 000 Ar', min: 1000000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Populaire' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Nouveautés' },
];

const PAGE_SIZE = 6;

function priceToNumber(price: string): number {
  const match = price.match(/[\d\s]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/\s/g, ''), 10) || 0;
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('cat') ? [searchParams.get('cat')!] : []
  );
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categorySlug));
    }

    if (selectedSector) {
      result = result.filter(p => p.sector === selectedSector);
    }

    if (selectedAvailability) {
      result = result.filter(p => p.availability === selectedAvailability);
    }

    if (selectedPriceRange) {
      const range = PRICE_RANGES.find(r => r.label === selectedPriceRange);
      if (range) {
        result = result.filter(p => {
          const num = priceToNumber(p.price);
          return num >= range.min && num <= range.max;
        });
      }
    }

    if (featuredOnly) {
      result = result.filter(p => p.featured);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
        break;
      case 'newest':
        result.sort((a, b) => (b.badges.includes('Nouveau') ? 1 : 0) - (a.badges.includes('Nouveau') ? 1 : 0));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.badges.includes('Populaire') ? 1 : 0) - (a.badges.includes('Populaire') ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, selectedSector, selectedAvailability, selectedPriceRange, featuredOnly, sortBy]);

  const activeFilterCount =
    selectedCategories.length +
    (selectedSector ? 1 : 0) +
    (selectedAvailability ? 1 : 0) +
    (selectedPriceRange ? 1 : 0) +
    (featuredOnly ? 1 : 0);

  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string }[] = [];
    selectedCategories.forEach(slug => {
      const cat = categories.find(c => c.slug === slug);
      if (cat) filters.push({ key: `cat-${slug}`, label: cat.name });
    });
    if (selectedSector) filters.push({ key: 'sector', label: selectedSector });
    if (selectedAvailability) {
      filters.push({ key: 'availability', label: selectedAvailability === 'available' ? 'Disponible' : 'Sur commande' });
    }
    if (selectedPriceRange) filters.push({ key: 'price', label: selectedPriceRange });
    if (featuredOnly) filters.push({ key: 'featured', label: 'Produits en vedette' });
    return filters;
  }, [selectedCategories, selectedSector, selectedAvailability, selectedPriceRange, featuredOnly]);

  const removeFilter = (key: string) => {
    if (key.startsWith('cat-')) toggleCategory(key.replace('cat-', ''));
    if (key === 'sector') setSelectedSector('');
    if (key === 'availability') setSelectedAvailability('');
    if (key === 'price') setSelectedPriceRange('');
    if (key === 'featured') setFeaturedOnly(false);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSector('');
    setSelectedAvailability('');
    setSelectedPriceRange('');
    setFeaturedOnly(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (searchQuery.trim()) params.q = searchQuery.trim();
    setSearchParams(params);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const filtersPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-chm-charcoal uppercase tracking-wide mb-4">
          Catégories
        </h3>
        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="mt-0.5 h-4 w-4 rounded border-chm-border text-chm-red focus:ring-chm-red"
              />
              <span className="text-sm text-chm-text group-hover:text-chm-red transition-colors">
                {cat.name}
                <span className="text-chm-text-light ml-1">({cat.productCount})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-chm-charcoal uppercase tracking-wide mb-4">
          Secteur d'activité
        </h3>
        <select
          value={selectedSector}
          onChange={e => setSelectedSector(e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg bg-white text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
        >
          <option value="">Tous les secteurs</option>
          {SECTORS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-chm-charcoal uppercase tracking-wide mb-4">
          Disponibilité
        </h3>
        <div className="space-y-2">
          {[
            { value: 'available', label: 'Disponible' },
            { value: 'on-order', label: 'Sur commande' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                checked={selectedAvailability === opt.value}
                onChange={() => setSelectedAvailability(opt.value)}
                className="h-4 w-4 border-chm-border text-chm-red focus:ring-chm-red"
              />
              <span className="text-sm text-chm-text group-hover:text-chm-red transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-chm-charcoal uppercase tracking-wide mb-4">
          Prix
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="price"
              checked={selectedPriceRange === ''}
              onChange={() => setSelectedPriceRange('')}
              className="h-4 w-4 border-chm-border text-chm-red focus:ring-chm-red"
            />
            <span className="text-sm text-chm-text group-hover:text-chm-red transition-colors">Tous</span>
          </label>
          {PRICE_RANGES.map(range => (
            <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === range.label}
                onChange={() => setSelectedPriceRange(range.label)}
                className="h-4 w-4 border-chm-border text-chm-red focus:ring-chm-red"
              />
              <span className="text-sm text-chm-text group-hover:text-chm-red transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-chm-charcoal uppercase tracking-wide mb-4">
          Autres
        </h3>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-chm-text">Produits en vedette</span>
          <button
            type="button"
            role="switch"
            aria-checked={featuredOnly}
            onClick={() => setFeaturedOnly(f => !f)}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-chm-red focus:ring-offset-2',
              featuredOnly ? 'bg-chm-red' : 'bg-chm-gray-dark'
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                featuredOnly ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full px-4 py-2 text-sm font-semibold text-chm-red border border-chm-red rounded-lg hover:bg-chm-red hover:text-white transition-colors"
        >
          Effacer tous les filtres
        </button>
      )}
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Notre catalogue"
          subtitle="Découvrez notre gamme d'équipements professionnels importés de Chine, sélectionnés pour répondre aux besoins des entreprises malgaches."
        />

        <div className="flex flex-col md:flex-row gap-8">
          <form onSubmit={handleSearchSubmit} className="relative md:flex-1 mb-6 md:mb-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chm-text-light w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit, une machine, un secteur..."
              className="w-full pl-12 pr-4 py-3 text-sm border border-chm-border rounded-lg bg-white text-chm-text placeholder-chm-text-light focus:outline-none focus:ring-2 focus:ring-chm-red"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-chm-text-light hover:text-chm-charcoal"
              >
                <X size={18} />
              </button>
            )}
          </form>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-chm-border rounded-lg text-chm-charcoal bg-white lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filtres
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-chm-red rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2.5 text-sm border border-chm-border rounded-lg bg-white text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 border border-chm-border rounded-xl bg-chm-cream p-6">
              {filtersPanel}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {activeFilters.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mb-6">
                {activeFilters.map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => removeFilter(filter.key)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-chm-gray border border-chm-border rounded-full text-chm-text hover:bg-chm-red hover:text-white hover:border-chm-red transition-colors"
                  >
                    {filter.label}
                    <X size={14} />
                  </button>
                ))}
                <button
                  onClick={clearAll}
                  className="text-xs font-semibold text-chm-red hover:text-chm-red-dark"
                >
                  Tout effacer
                </button>
              </div>
            )}

            <p className="text-sm text-chm-text-light mb-6">
              <strong className="text-chm-text">{filteredProducts.length}</strong> produits trouvés
            </p>

            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-chm-red text-chm-red font-semibold rounded-lg hover:bg-chm-red hover:text-white transition-colors"
                    >
                      Voir plus
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-chm-border rounded-xl bg-chm-cream">
                <p className="text-lg font-bold text-chm-charcoal mb-2">Aucun produit trouvé</p>
                <p className="text-sm text-chm-text-light mb-6">
                  Essayez de modifier vos filtres ou votre recherche.
                </p>
                <button
                  onClick={clearAll}
                  className="px-5 py-2.5 text-sm font-semibold text-chm-red border border-chm-red rounded-lg hover:bg-chm-red hover:text-white transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] bg-white shadow-xl overflow-y-auto p-6 animate-slide-in-left">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-chm-charcoal">Filtres</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-chm-text-light hover:text-chm-charcoal"
              >
                <X size={20} />
              </button>
            </div>
            {filtersPanel}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full px-4 py-3 text-sm font-bold text-white bg-chm-red rounded-lg hover:bg-chm-red-dark transition-colors"
            >
              Voir {filteredProducts.length} produits
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
