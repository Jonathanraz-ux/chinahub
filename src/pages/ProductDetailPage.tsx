import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Check,
  X,
  MessageSquare,
  Phone,
  Mail,
  Truck,
  FileText,
  Eye,
} from 'lucide-react';
import { products } from '../data';
import { useRequests } from '../context/RequestContext';
import { showToast } from '../components/ui/Toast';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import Breadcrumb from '../components/ui/Breadcrumb';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import { cn, getAvailabilityLabel } from '../utils';

const availabilityStyles: Record<string, string> = {
  'available': 'bg-green-100 text-green-700',
  'on-order': 'bg-amber-100 text-amber-700',
  'limited': 'bg-orange-100 text-orange-700',
};

const availabilityDot: Record<string, string> = {
  'available': 'bg-green-500',
  'on-order': 'bg-amber-500',
  'limited': 'bg-orange-500',
};

const CONTACT_PREFERENCES = [
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { value: 'phone', label: 'Téléphone', icon: Phone },
  { value: 'email', label: 'Email', icon: Mail },
];

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useRequests();

  const product = products.find(p => p.slug === slug);

  const [activeImage, setActiveImage] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const [quoteForm, setQuoteForm] = useState({
    quantity: 1,
    name: '',
    phone: '',
    city: '',
    needs: '',
    contactPreference: 'whatsapp',
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    message: '',
  });

  if (!product) {
    return (
      <div className="py-24">
        <div className="max-w-xl mx-auto text-center px-4">
          <div className="w-16 h-16 rounded-full bg-chm-gray flex items-center justify-center mx-auto mb-6">
            <Eye className="w-8 h-8 text-chm-text-light" />
          </div>
          <h1 className="text-3xl font-bold text-chm-charcoal mb-3">Produit non trouvé</h1>
          <p className="text-chm-text-light mb-8">
            Le produit que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 px-6 py-3 bg-chm-red text-white font-semibold rounded-lg hover:bg-chm-red-dark transition-colors"
          >
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const selectedAvailabilityLabel = getAvailabilityLabel(product.availability);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Votre demande a été envoyée avec succès !', 'success');
    setQuoteOpen(false);
    setQuoteForm({
      quantity: 1,
      name: '',
      phone: '',
      city: '',
      needs: '',
      contactPreference: 'whatsapp',
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Votre demande a été envoyée avec succès !', 'success');
    setContactOpen(false);
    setContactForm({ name: '', phone: '', message: '' });
  };

  const handleAddToRequest = () => {
    addItem(product);
    showToast('Produit ajouté à votre demande', 'success');
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', to: '/' },
            { label: 'Produits', to: '/produits' },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="relative overflow-hidden rounded-xl border border-chm-border group aspect-[4/3]">
              <div className="w-full h-full overflow-hidden cursor-zoom-in">
                <ImageWithFallback
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-125"
                />
              </div>
              {product.badges.length > 0 && (
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  {product.badges.map(badge => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-chm-red text-white"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                      i === activeImage ? 'border-chm-red' : 'border-chm-border hover:border-chm-text-light'
                    )}
                  >
                    <ImageWithFallback src={img} alt="" className="w-full h-full" />
                  </button>
                ))}
              </div>
            )}

            <p className="mt-4 text-xs text-chm-text-light italic">
              Images présentées à titre illustratif. Les caractéristiques et visuels définitifs sont confirmés lors du devis.
            </p>
          </div>

          {/* Right: Details */}
          <div>
            <p className="text-sm font-medium text-chm-red uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-chm-charcoal mb-3">
              {product.name}
            </h1>

            {product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges.map(badge => (
                  <span
                    key={badge}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-chm-gray border border-chm-border text-chm-text"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              {product.priceType === 'fixed' ? (
                <span className="text-3xl font-bold text-chm-charcoal">{product.price}</span>
              ) : (
                <span className="text-2xl font-bold text-chm-red">Prix sur devis</span>
              )}
            </div>

            <p className="text-chm-text-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specs */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-chm-charcoal mb-4">Caractéristiques techniques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-0 overflow-hidden rounded-lg border border-chm-border">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex flex-col px-4 py-3 sm:odd:border-r sm:[&:nth-child(odd)]:border-r sm:border-chm-border',
                      i % 2 === 0 ? 'bg-chm-cream' : 'bg-white'
                    )}
                  >
                    <span className="text-xs font-medium text-chm-text-light uppercase tracking-wide">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-chm-charcoal mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-chm-charcoal mb-4">Applications</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.applications.map((app, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-chm-text">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 shrink-0">
                      <Check size={12} />
                    </span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            {/* Options */}
            {product.options.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-chm-charcoal mb-4">Options disponibles</h2>
                <div className="flex flex-wrap gap-2">
                  {product.options.map((opt, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm bg-chm-cream border border-chm-border rounded-full text-chm-text"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability + delivery */}
            <div className="space-y-4 border-t border-chm-border pt-6 mb-8">
              <div className="flex items-center gap-3">
                <span className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-full',
                  availabilityStyles[product.availability]
                )}>
                  <span className={cn('w-2 h-2 rounded-full', availabilityDot[product.availability])} />
                  {selectedAvailabilityLabel}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-chm-text-light">
                <Truck size={18} className="text-chm-red shrink-0" />
                <span>Délai de livraison : <strong className="text-chm-text">{product.deliveryTime}</strong></span>
              </div>
              <div className="flex items-start gap-3 text-sm text-chm-text-light">
                <FileText size={18} className="text-chm-red shrink-0 mt-0.5" />
                <span>Conditions : {product.orderConditions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons — sticky on desktop */}
        <div className="mt-4 lg:mt-0">
          <div className="lg:sticky lg:bottom-4 lg:z-20 bg-white border border-chm-border rounded-xl shadow-lg p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setQuoteOpen(true)}
                className="px-4 py-3 bg-chm-red text-white font-bold rounded-lg hover:bg-chm-red-dark transition-colors"
              >
                Demander un devis
              </button>
              <button
                onClick={() => setContactOpen(true)}
                className="px-4 py-3 border border-chm-red text-chm-red font-bold rounded-lg hover:bg-chm-red hover:text-white transition-colors"
              >
                Contacter le vendeur
              </button>
              <button
                onClick={handleAddToRequest}
                className="px-4 py-3 border border-chm-charcoal text-chm-charcoal font-bold rounded-lg hover:bg-chm-charcoal hover:text-white transition-colors"
              >
                Ajouter à ma demande
              </button>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <SectionTitle
              title="Produits similaires"
              subtitle="D'autres équipements qui pourraient vous intéresser"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quote modal */}
      {quoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setQuoteOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-up">
            <button
              onClick={() => setQuoteOpen(false)}
              className="absolute right-4 top-4 p-2 text-chm-text-light hover:text-chm-charcoal"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-chm-charcoal mb-1">Demander un devis</h2>
              <p className="text-sm text-chm-text-light mb-6">Recevez une offre détaillée pour ce produit.</p>

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-chm-charcoal mb-1">Produit</label>
                  <input
                    type="text"
                    value={product.name}
                    readOnly
                    className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg bg-chm-gray text-chm-text focus:outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-chm-charcoal mb-1">Quantité</label>
                  <input
                    type="number"
                    min={1}
                    value={quoteForm.quantity}
                    onChange={e => setQuoteForm({ ...quoteForm, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-chm-charcoal mb-1">Nom complet</label>
                    <input
                      type="text"
                      required
                      value={quoteForm.name}
                      onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-chm-charcoal mb-1">Téléphone</label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                      placeholder="+261 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-chm-charcoal mb-1">Ville</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.city}
                    onChange={e => setQuoteForm({ ...quoteForm, city: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                    placeholder="Votre ville"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-chm-charcoal mb-1">Votre besoin</label>
                  <textarea
                    rows={3}
                    value={quoteForm.needs}
                    onChange={e => setQuoteForm({ ...quoteForm, needs: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                    placeholder="Décrivez vos besoins, spécifications, capacité souhaitée..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-chm-charcoal mb-2">Préférence de contact</label>
                  <div className="grid grid-cols-3 gap-2">
                    {CONTACT_PREFERENCES.map(pref => {
                      const Icon = pref.icon;
                      return (
                        <button
                          key={pref.value}
                          type="button"
                          onClick={() => setQuoteForm({ ...quoteForm, contactPreference: pref.value })}
                          className={cn(
                            'flex flex-col items-center gap-1.5 px-2 py-3 text-xs font-semibold rounded-lg border transition-colors',
                            quoteForm.contactPreference === pref.value
                              ? 'border-chm-red bg-chm-red text-white'
                              : 'border-chm-border bg-white text-chm-text hover:border-chm-red'
                          )}
                        >
                          <Icon size={18} />
                          {pref.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-chm-red text-white font-bold rounded-lg hover:bg-chm-red-dark transition-colors"
                >
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact panel */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setContactOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-up">
            <button
              onClick={() => setContactOpen(false)}
              className="absolute right-4 top-4 p-2 text-chm-text-light hover:text-chm-charcoal"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-chm-charcoal mb-1">Contacter le vendeur</h2>
              <p className="text-sm text-chm-text-light mb-6">
                Choisissez votre canal de communication préféré.
              </p>

              <div className="space-y-3 mb-8">
                <a
                  href="https://wa.me/261343119768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 border border-chm-border rounded-lg hover:border-chm-red hover:bg-chm-cream transition-colors"
                >
                  <MessageSquare size={20} className="text-green-500" />
                  <span className="text-sm font-semibold text-chm-text">WhatsApp</span>
                </a>
                <a
                  href="tel:+261343119768"
                  className="flex items-center gap-3 px-4 py-3 border border-chm-border rounded-lg hover:border-chm-red hover:bg-chm-cream transition-colors"
                >
                  <Phone size={20} className="text-chm-red" />
                  <span className="text-sm font-semibold text-chm-text">+261 34 31 197 68</span>
                </a>
                <a
                  href="mailto:contact@chinahubmada.mg"
                  className="flex items-center gap-3 px-4 py-3 border border-chm-border rounded-lg hover:border-chm-red hover:bg-chm-cream transition-colors"
                >
                  <Mail size={20} className="text-blue-500" />
                  <span className="text-sm font-semibold text-chm-text">contact@chinahubmada.mg</span>
                </a>
              </div>

              <div className="border-t border-chm-border pt-6">
                <h3 className="text-sm font-bold text-chm-charcoal mb-4">Envoyer un message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-chm-charcoal mb-1">Nom complet</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-chm-charcoal mb-1">Téléphone</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                      placeholder="+261 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-chm-charcoal mb-1">Message</label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-chm-border rounded-lg text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red"
                      placeholder="Votre message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-chm-red text-white font-bold rounded-lg hover:bg-chm-red-dark transition-colors"
                  >
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
