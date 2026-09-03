import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Camera,
  ShieldCheck,
  BadgeCheck,
  Send,
  Search,
  Handshake,
} from 'lucide-react';
import { showToast } from '../components/ui/Toast';
import SectionTitle from '../components/ui/SectionTitle';

interface SourcingForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  productType: string;
  description: string;
  quantity: string;
  budget: string;
  deadline: string;
  contactPreference: string;
}

const initialForm: SourcingForm = {
  name: '',
  email: '',
  phone: '',
  city: '',
  productType: '',
  description: '',
  quantity: '',
  budget: '',
  deadline: '',
  contactPreference: 'whatsapp',
};

const advantages = [
  {
    icon: Search,
    title: 'Accès à des milliers de fournisseurs',
    description: 'Nous exploitons notre réseau en Chine pour trouver le fournisseur idéal pour votre produit.',
  },
  {
    icon: ShieldCheck,
    title: 'Vérification qualité garantie',
    description: 'Chaque fournisseur et chaque produit sont rigoureusement vérifiés avant expédition.',
  },
  {
    icon: Handshake,
    title: 'Accompagnement personnalisé',
    description: 'Un conseiller dédié vous accompagne de la recherche jusqu\'à la livraison.',
  },
  {
    icon: BadgeCheck,
    title: 'Transparence totale',
    description: 'Prix, frais et délais clairs. Vous savez exactement ce que vous achetez.',
  },
];

const productTypes = [
  'Machines industrielles',
  'Équipements agricoles',
  'Matériel de construction',
  'Électronique',
  'Véhicules',
  'Équipements de restauration',
  'Textile et habillement',
  'Matériel médical',
  'Énergie solaire',
  'Emballage',
  'Pièces détachées',
  'Autre produit',
];

const cities = [
  'Antananarivo',
  'Toamasina',
  'Antsirabe',
  'Mahajanga',
  'Fianarantsoa',
  'Tuléar',
  'Autre',
];

const budgets = [
  'Moins de 500 000 Ar',
  '500 000 - 1 000 000 Ar',
  '1 000 000 - 5 000 000 Ar',
  'Plus de 5 000 000 Ar',
  'À définir',
];

const deadlines = ['Urgent', '1 mois', '2-3 mois', 'Pas de délai spécifique'];

const contactPreferences = ['WhatsApp', 'Appel téléphonique', 'Email'];

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-chm-border bg-white text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red focus:border-transparent transition';

export default function SourcingPage() {
  const [form, setForm] = useState<SourcingForm>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city || !form.description) {
      showToast('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }
    showToast('Votre demande de sourcing a été envoyée. Nous vous recontactons sous 24-48h.');
    setForm(initialForm);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-chm-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-chm-charcoal mb-4">
            Sourcing personnalisé
          </h1>
          <p className="text-xl text-chm-text-light max-w-2xl mx-auto">
            Vous ne trouvez pas le produit que vous cherchez ? Nous trouvons
            n'importe quel produit pour vous directement de Chine.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pourquoi choisir notre service de sourcing ?"
            subtitle="Nous simplifions l'importation depuis la Chine avec un service complet et fiable."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => (
              <div
                key={index}
                className="bg-white border border-chm-border rounded-2xl p-6 hover:shadow-lg hover:border-chm-red/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-chm-red/10 flex items-center justify-center mb-4">
                  <adv.icon className="w-7 h-7 text-chm-red" />
                </div>
                <h3 className="text-lg font-bold text-chm-charcoal mb-2">{adv.title}</h3>
                <p className="text-sm text-chm-text-light leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-chm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Types de produits que nous sourçons"
            subtitle="Des machines industrielles aux équipements spécialisés, nous trouvons tout."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {productTypes.map((type, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-white border border-chm-border rounded-full text-sm font-medium text-chm-text hover:border-chm-red hover:text-chm-red transition-colors cursor-default"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Décrivez votre besoin"
            subtitle="Plus vous êtes précis, plus nous serons rapides à vous trouver le bon produit."
          />
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl border border-chm-border p-6 lg:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-chm-text mb-2">
                  Nom complet <span className="text-chm-red">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom et prénom"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-chm-text mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vous@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-chm-text mb-2">
                  Téléphone <span className="text-chm-red">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+261 34 00 000 00"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-chm-text mb-2">
                  Ville de livraison <span className="text-chm-red">*</span>
                </label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
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

            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">Type de produit</label>
              <input
                type="text"
                name="productType"
                value={form.productType}
                onChange={handleChange}
                placeholder="Ex : machine à granulés, pompe à eau, emballages..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">
                Description détaillée du besoin <span className="text-chm-red">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Décrivez le produit recherché : usage, spécifications techniques, caractéristiques souhaitées..."
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-chm-text mb-2">Quantité souhaitée</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="Ex : 1, 10, 100..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-chm-text mb-2">Budget indicatif</label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>Sélectionnez une fourchette</option>
                  {budgets.map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">Délai souhaité</label>
              <div className="flex flex-wrap gap-3">
                {deadlines.map(deadline => (
                  <label key={deadline} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deadline"
                      value={deadline}
                      checked={form.deadline === deadline}
                      onChange={handleChange}
                      className="accent-chm-red"
                    />
                    <span className="text-sm text-chm-text">{deadline}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">Préférence de contact</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {contactPreferences.map(pref => (
                  <label key={pref} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactPreference"
                      value={pref}
                      checked={form.contactPreference === pref}
                      onChange={handleChange}
                      className="accent-chm-red"
                    />
                    <span className="text-sm text-chm-text">{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-chm-text mb-2">
                Photo ou document (optionnel)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-chm-border rounded-xl bg-chm-gray cursor-pointer hover:border-chm-red transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-8 h-8 text-chm-text-light mb-2" />
                    <p className="text-sm text-chm-text-light">
                      Cliquez pour joindre une photo ou un document
                    </p>
                    <p className="text-xs text-chm-text-light/70 mt-1">
                      JPG, PNG, PDF - max 10 Mo
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-chm-red text-white font-bold rounded-xl hover:bg-chm-red-dark transition-colors"
            >
              <Send size={18} />
              Envoyer ma demande
            </button>

            <p className="text-sm text-center text-chm-text-light mt-4">
              Aucun engagement. Nous vous recontactons sous 24-48h.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}