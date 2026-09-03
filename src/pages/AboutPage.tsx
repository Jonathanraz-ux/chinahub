import {
  ShieldCheck,
  Award,
  TrendingUp,
  HeartHandshake,
  Handshake,
  Factory,
  Send,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { showToast } from '../components/ui/Toast';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: ShieldCheck,
    title: 'Confiance',
    description: 'Des relations basées sur la transparence et l\'intégrité à chaque étape.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Des produits et services de la plus haute qualité, vérifiés en amont.',
  },
  {
    icon: TrendingUp,
    title: 'Transparence',
    description: 'Des prix clairs, sans frais cachés, avec un suivi complet de votre commande.',
  },
  {
    icon: HeartHandshake,
    title: 'Innovation',
    description: 'Des solutions modernes adaptées aux besoins réels du marché malgache.',
  },
];

const steps = [
  {
    title: '1. Écoute et analyse',
    description: 'Nous analysons votre besoin en détail pour comprendre exactement ce que vous cherchez.',
  },
  {
    title: '2. Recherche de fournisseurs',
    description: 'Nous identifions les meilleurs fournisseurs chinois vérifiés et fiables pour votre produit.',
  },
  {
    title: '3. Devis et validation',
    description: 'Nous vous transmettons un devis détaillé, vous validez chaque étape avant de commander.',
  },
  {
    title: '4. Importation et livraison',
    description: 'Nous gérons la logistique complète jusqu\'à la livraison à Madagascar.',
  },
];

const commitments = [
  'Fournisseurs 100% vérifiés et certifiés',
  'Vérification qualité avant expédition',
  'Prix compétitifs et transparents',
  'Accompagnement de A à Z',
  'Suivi de commande en temps réel',
  'Après-vente réactif',
];

const trustBadges = [
  { icon: Globe, label: 'Réseau Chine-Madagascar' },
  { icon: Factory, label: 'Fabricants sélectionnés' },
  { icon: ShieldCheck, label: 'Qualité vérifiée' },
  { icon: Handshake, label: 'Accompagnement dédié' },
];

export default function AboutPage() {
  const [email, setEmail] = useState('');
  const missionAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Veuillez saisir votre email.', 'error');
      return;
    }
    showToast('Merci ! Vous recevrez bientôt nos actualités.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-chm-charcoal py-24">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #D4A843 0%, transparent 50%), radial-gradient(circle at 80% 20%, #B91C1C 0%, transparent 50%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            À propos de China Hub Mada
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Votre pont de confiance entre Madagascar et les plus grands fabricants chinois.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={missionAnim.ref} className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${missionAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <SectionTitle
                title="Notre mission"
                subtitle="Faciliter l'accès des entreprises malgaches aux meilleurs équipements et produits industriels de Chine."
                centered={false}
              />
              <p className="text-chm-text-light leading-relaxed mb-6">
                China Hub Mada est né de la conviction que chaque entreprise malgache, quelle
                que soit sa taille, mérite d'accéder aux meilleures solutions industrielles
                disponibles. Nous connectons les entrepreneurs de Madagascar aux plus grands
                fabricants chinois, en éliminant les barrières de langue, de logistique et de
                confiance.
              </p>
              <p className="text-chm-text-light leading-relaxed mb-8">
                Grâce à notre réseau de partenaires en Chine et notre expertise de terrain à
                Madagascar, nous transformons l'importation en une expérience simple, sûre et
                transparente.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Large gamme de produits référencés', 'Fournisseurs vérifiés et sélectionnés', 'Livraison partout à Madagascar'].map(item => (
                  <span key={item} className="flex items-center gap-2 px-4 py-2 bg-chm-gray rounded-full text-sm font-medium text-chm-text">
                    <CheckCircle2 className="w-4 h-4 text-chm-gold" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-chm-gray rounded-2xl overflow-hidden border border-chm-border">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                  alt="Usine moderne en Chine"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-chm-red text-white px-6 py-4 rounded-2xl shadow-lg hidden sm:block">
                <p className="font-bold">Expertise</p>
                <p className="text-sm text-white/80">Importation Chine-Madagascar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-chm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Nos valeurs"
            subtitle="Ce qui guide chacune de nos décisions et de nos actions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-chm-border hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-chm-red/10 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-chm-red" />
                </div>
                <h3 className="text-lg font-bold text-chm-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-chm-text-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Comment nous travaillons"
            subtitle="Un processus simple et structuré pour garantir votre satisfaction."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border border-chm-border rounded-2xl p-6 h-full hover:border-chm-red/30 transition-colors">
                  <span className="text-4xl font-bold text-chm-red/20 mb-4 block">{index + 1}</span>
                  <h3 className="text-lg font-bold text-chm-charcoal mb-2">{step.title}</h3>
                  <p className="text-sm text-chm-text-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-chm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Nos engagements"
            subtitle="Ce que vous garantit China Hub Mada à chaque collaboration."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((commitment, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-5 rounded-xl border border-chm-border">
                <CheckCircle2 className="w-6 h-6 text-chm-gold shrink-0" />
                <span className="font-medium text-chm-text">{commitment}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-chm-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <badge.icon className="w-10 h-10 text-chm-gold mb-3" />
                <span className="text-white font-semibold">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div ref={ctaAnim.ref} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <SectionTitle
            title="Parlez-nous de votre projet"
            subtitle="Décrivez-nous vos besoins, nous trouverons la solution adaptée."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sourcing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-chm-red text-white font-bold rounded-xl hover:bg-chm-red-dark transition-colors"
            >
              <Send size={18} />
              Demander un sourcing
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-chm-red text-chm-red font-bold rounded-xl hover:bg-chm-red hover:text-white transition-colors"
            >
              <Handshake size={18} />
              Nous contacter
            </Link>
          </div>
          <form onSubmit={handleNewsletter} className="mt-12 max-w-md mx-auto">
            <label className="block text-sm font-semibold text-chm-text mb-2">
              Restez informé de nos produits
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-chm-border bg-chm-gray focus:outline-none focus:ring-2 focus:ring-chm-red"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-chm-charcoal text-white font-semibold rounded-lg hover:bg-chm-red transition-colors"
              >
                S'abonner
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}