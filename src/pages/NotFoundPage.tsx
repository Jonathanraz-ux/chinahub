import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-chm-gray flex items-center justify-center mx-auto mb-8">
          <Compass className="w-12 h-12 text-chm-text-light" />
        </div>
        <h1 className="text-6xl font-bold text-chm-red mb-4">404</h1>
        <h2 className="text-2xl font-bold text-chm-charcoal mb-4">Page introuvable</h2>
        <p className="text-chm-text-light mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-chm-red text-white font-bold rounded-lg hover:bg-chm-red-dark transition-colors"
          >
            <ArrowLeft size={18} />
            Retour à l'accueil
          </Link>
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 px-6 py-3 border border-chm-red text-chm-red font-bold rounded-lg hover:bg-chm-red hover:text-white transition-colors"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
