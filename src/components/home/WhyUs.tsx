import { Globe, Shield, CheckCircle, Users, TrendingUp, Headphones } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';

const advantages = [
  {
    icon: Globe,
    title: 'Expertise Chine-Madagascar',
    description: 'Une connaissance approfondie des marchés chinois et des besoins malgaches.',
  },
  {
    icon: Shield,
    title: 'Fournisseurs vérifiés',
    description: 'Nous travaillons uniquement avec des fournisseurs certifiés et fiables.',
  },
  {
    icon: CheckCircle,
    title: 'Contrôle qualité',
    description: 'Inspection et contrôle qualité avant chaque expédition.',
  },
  {
    icon: Users,
    title: 'Accompagnement complet',
    description: 'Du sourcing à la livraison, nous gérons chaque étape pour vous.',
  },
  {
    icon: TrendingUp,
    title: 'Prix compétitifs',
    description: 'Accès direct aux meilleurs prix du marché chinois.',
  },
  {
    icon: Headphones,
    title: 'Suivi personnalisé',
    description: 'Un interlocuteur dédié pour répondre à toutes vos questions.',
  },
];

export default function WhyUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-chm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Pourquoi China Hub Mada ?"
          subtitle="Les raisons pour lesquoles nos clients nous font confiance"
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {advantages.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-chm-border p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-chm-red/10 flex items-center justify-center mb-4">
                <Icon size={24} className="text-chm-red" />
              </div>
              <h3 className="text-lg font-bold text-chm-charcoal mb-2">{title}</h3>
              <p className="text-sm text-chm-text-light leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
