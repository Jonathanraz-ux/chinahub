import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { useRequests } from '../../context/RequestContext';
import { cn } from '../../utils';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/produits', label: 'Produits' },
  { to: '/categories', label: 'Catégories' },
  { to: '/comment-ca-marche', label: 'Comment ça marche' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { totalCount } = useRequests();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-chm-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CH</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-chm-charcoal font-bold text-lg leading-tight block">China Hub</span>
              <span className="text-chm-red font-semibold text-xs leading-tight block -mt-0.5">Mada</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  location.pathname === link.to
                    ? 'text-chm-red bg-red-50'
                    : 'text-chm-text-light hover:text-chm-charcoal hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-chm-text-light hover:text-chm-charcoal hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link
              to="/mes-demandes"
              className="relative p-2 text-chm-text-light hover:text-chm-charcoal hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mes demandes"
            >
              <ShoppingCart size={20} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-chm-red text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Phone */}
            <a
              href="tel:+261343119768"
              className="hidden md:flex items-center gap-1.5 text-sm text-chm-text-light hover:text-chm-red transition-colors"
            >
              <Phone size={16} />
              <span className="hidden xl:inline">+261 34 31 197 68</span>
            </a>

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-chm-red text-white text-sm font-semibold rounded-lg hover:bg-chm-red-dark transition-colors"
            >
              Demander un devis
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-chm-text-light hover:text-chm-charcoal rounded-lg"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/produits?q=${encodeURIComponent(searchQuery)}`; }} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit, une machine..."
                className="flex-1 px-4 py-2.5 border border-chm-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chm-red/30 focus:border-chm-red"
                autoFocus
              />
              <button type="submit" className="px-6 py-2.5 bg-chm-red text-white text-sm font-semibold rounded-lg hover:bg-chm-red-dark transition-colors">
                Rechercher
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-chm-border shadow-lg animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  location.pathname === link.to
                    ? 'text-chm-red bg-red-50'
                    : 'text-chm-text hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+261343119768"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-chm-text hover:bg-gray-50 rounded-lg"
            >
              <Phone size={16} />
              +261 34 31 197 68
            </a>
            <Link
              to="/contact"
              className="block px-4 py-3 bg-chm-red text-white text-sm font-semibold rounded-lg text-center hover:bg-chm-red-dark transition-colors"
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
