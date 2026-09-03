import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, Send, ArrowRight } from 'lucide-react';
import { useRequests } from '../context/RequestContext';
import { showToast } from '../components/ui/Toast';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import SectionTitle from '../components/ui/SectionTitle';
import Breadcrumb from '../components/ui/Breadcrumb';

interface ClientInfo {
  name: string;
  phone: string;
  city: string;
  email: string;
  message: string;
}

const initialClient: ClientInfo = {
  name: '',
  phone: '',
  city: '',
  email: '',
  message: '',
};

const cities = [
  'Antananarivo',
  'Toamasina',
  'Antsirabe',
  'Mahajanga',
  'Fianarantsoa',
  'Tuléar',
  'Autre',
];

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-chm-border bg-white text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red focus:border-transparent transition';

export default function RequestListPage() {
  const { items, removeItem, updateQuantity, updateRemark, clearItems, totalCount } = useRequests();
  const [client, setClient] = useState<ClientInfo>(initialClient);

  const handleClientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!client.name || !client.phone || !client.city) {
      showToast('Veuillez remplir les champs obligatoires.', 'error');
      return;
    }
    showToast('Votre demande de devis a été envoyée. Nous vous contacterons sous 24-48h.');
    clearItems();
    setClient(initialClient);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-chm-gray flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-12 h-12 text-chm-text-light" />
          </div>
          <h1 className="text-3xl font-bold text-chm-charcoal mb-4">
            Votre liste de demandes est vide
          </h1>
          <p className="text-chm-text-light mb-8">
            Parcourez notre catalogue et ajoutez des produits à votre liste pour
            recevoir un devis personnalisé.
          </p>
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 px-8 py-4 bg-chm-red text-white font-bold rounded-xl hover:bg-chm-red-dark transition-colors"
          >
            Explorer les produits
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', to: '/' },
            { label: 'Mes demandes' },
          ]}
        />

        <div className="mt-6">
          <SectionTitle
            title={`Mes demandes (${items.length})`}
            subtitle="Révisez, ajustez et envoyez votre liste pour recevoir un devis personnalisé."
          />
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.product.id}
              className="bg-white border border-chm-border rounded-2xl p-6 flex flex-col sm:flex-row gap-6"
            >
              <Link to={`/produits/${item.product.slug}`} className="shrink-0">
                <ImageWithFallback
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full sm:w-40 h-full sm:h-32 rounded-xl overflow-hidden"
                />
              </Link>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-chm-red uppercase tracking-wide mb-1">
                      {item.product.category}
                    </p>
                    <Link
                      to={`/produits/${item.product.slug}`}
                      className="text-lg font-bold text-chm-charcoal hover:text-chm-red transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-chm-text-light mt-1">
                      Prix unitaire : <span className="font-semibold text-chm-text">{item.product.price}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-chm-text-light hover:text-chm-red rounded-lg hover:bg-chm-red/10 transition-colors"
                    aria-label="Retirer le produit"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center border border-chm-border rounded-xl overflow-hidden h-11">
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="px-4 h-full text-chm-text-light hover:text-chm-red hover:bg-chm-gray transition-colors"
                      aria-label="Diminuer la quantité"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-14 text-center font-semibold text-chm-text">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-4 h-full text-chm-text-light hover:text-chm-red hover:bg-chm-gray transition-colors"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <textarea
                    value={item.remark}
                    onChange={e => updateRemark(item.product.id, e.target.value)}
                    placeholder="Remarque sur ce produit (optionnel)"
                    rows={1}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-chm-border bg-chm-gray text-sm text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-chm-gray rounded-2xl p-6 border border-chm-border">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-chm-charcoal">Total d'articles</span>
            <span className="text-2xl font-bold text-chm-red">{totalCount}</span>
          </div>
          <p className="text-sm text-chm-text-light">
            Les prix sont indicatifs. Un devis détaillé vous sera envoyé après validation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 bg-white border border-chm-border rounded-2xl shadow-lg p-6 lg:p-10">
          <h2 className="text-2xl font-bold text-chm-charcoal mb-6">
            Informations de contact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">
                Nom complet <span className="text-chm-red">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={client.name}
                onChange={handleClientChange}
                required
                placeholder="Votre nom et prénom"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">
                Email <span className="text-xs font-normal text-chm-text-light">(optionnel)</span>
              </label>
              <input
                type="email"
                name="email"
                value={client.email}
                onChange={handleClientChange}
                placeholder="vous@email.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">
                Téléphone <span className="text-chm-red">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={client.phone}
                onChange={handleClientChange}
                required
                placeholder="+261 34 00 000 00"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">
                Ville <span className="text-chm-red">*</span>
              </label>
              <select
                name="city"
                value={client.city}
                onChange={handleClientChange}
                required
                className={inputClass}
              >
                <option value="" disabled>Sélectionnez votre ville</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-chm-text mb-2">
              Message / Précisions <span className="text-xs font-normal text-chm-text-light">(optionnel)</span>
            </label>
            <textarea
              name="message"
              value={client.message}
              onChange={handleClientChange}
              rows={4}
              placeholder="Ajoutez des précisions sur votre demande (options, livraison, etc.)"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-chm-red text-white font-bold rounded-xl hover:bg-chm-red-dark transition-colors"
          >
            <Send size={18} />
            Envoyer ma demande de devis
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 text-chm-red font-semibold hover:text-chm-red-dark transition-colors"
          >
            Continuer mes achats
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}