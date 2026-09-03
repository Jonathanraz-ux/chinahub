import { Shield, CheckCircle, Truck, Lock, Headphones } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const items = [
  { icon: Shield, label: 'Fournisseurs vérifiés' },
  { icon: CheckCircle, label: 'Contrôle qualité' },
  { icon: Truck, label: 'Suivi en temps réel' },
  { icon: Lock, label: 'Paiement sécurisé' },
  { icon: Headphones, label: 'Assistance dédiée' },
];

export default function TrustBar() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="bg-white border-y border-chm-border">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon size={20} className="text-chm-red shrink-0" />
              <span className="text-sm font-medium text-chm-text">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
