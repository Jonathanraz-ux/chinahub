import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';

const steps = [
  {
    num: 1,
    title: 'Exprimez votre besoin',
    description: 'Décrivez-nous le type d\'équipement ou de produit recherché.',
  },
  {
    num: 2,
    title: 'Nous trouvons le meilleur produit',
    description: 'Notre équipe identifie les meilleurs fournisseurs et produits.',
  },
  {
    num: 3,
    title: 'Vous recevez un devis',
    description: 'Un devis détaillé avec prix, délais et conditions vous est envoyé.',
  },
  {
    num: 4,
    title: 'Commande et suivi',
    description: 'Après confirmation, nous gérons la commande et le suivi logistique.',
  },
  {
    num: 5,
    title: 'Livraison à Madagascar',
    description: 'Votre équipement arrive sain et sauf à Madagascar.',
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Comment ça marche ?"
          subtitle="Un processus simple et transparent du début à la fin"
        />

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Mobile: vertical */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-chm-red text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-chm-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold text-chm-charcoal mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-chm-text-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-chm-border" />

            {steps.map(step => (
              <div key={step.num} className="flex flex-col items-center text-center relative z-10 flex-1 max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-chm-red text-white flex items-center justify-center text-sm font-bold mb-4 shadow-lg shadow-chm-red/20">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-chm-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-chm-text-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
