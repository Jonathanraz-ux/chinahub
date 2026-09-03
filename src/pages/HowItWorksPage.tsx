import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  ShieldCheck,
  FileText,
  Package,
  Ship,
  CheckCircle,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from '../components/ui/SectionTitle';
import { cn } from '../utils';

const steps = [
  {
    num: 1,
    title: 'Expression de votre besoin',
    description:
      'Décrivez-nous ce que vous recherchez : type d\'équipement, capacité souhaitée, budget. Plus vous êtes précis, plus nous pouvons cibler efficacement votre recherche.',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
  },
  {
    num: 2,
    title: 'Recherche et sélection du produit',
    description:
      'Notre équipe identifie les meilleures options parmi nos fournisseurs vérifiés en Chine, en tenant compte de la qualité, du prix et de vos besoins spécifiques.',
    icon: Search,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  {
    num: 3,
    title: 'Vérification de l\'offre',
    description:
      'Nous vérifions la qualité et la fiabilité du produit : contrôle des standards, inspection des fournisseurs et validation des caractéristiques techniques avant toute proposition.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  },
  {
    num: 4,
    title: 'Devis et confirmation',
    description:
      'Vous recevez un devis détaillé et transparent incluant le prix du produit, les frais de transport, les droits de douane et les délais de livraison estimés.',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
  },
  {
    num: 5,
    title: 'Commande et suivi',
    description:
      'Une fois le devis confirmé, la commande est passée auprès du fournisseur et vous êtes informé de l\'avancement à chaque étape du processus.',
    icon: Package,
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=400&fit=crop',
  },
  {
    num: 6,
    title: 'Acheminement vers Madagascar',
    description:
      'Transport maritime ou aérien selon vos besoins et votre budget. Nous gérons la logistique, le dédouanement et toutes les formalités d\'importation.',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop',
  },
  {
    num: 7,
    title: 'Réception et accompagnement',
    description:
      'Nous vous accompagnons jusqu\'à la réception de votre équipement et restons disponibles pour les conseils techniques et le suivi après-vente.',
    icon: CheckCircle,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
  },
];

function StepItem({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={cn(
        'relative transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center lg:items-stretch">
        {/* Numbered circle */}
        <div className="absolute left-5 top-1 sm:top-6 lg:left-1/2 lg:-translate-x-1/2 z-10 hidden sm:flex">
          <div className="w-10 h-10 rounded-full bg-chm-red text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-chm-red/20">
            {step.num}
          </div>
        </div>

        {/* Mobile number badge */}
        <div className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-chm-red text-white font-bold mb-4">
          {step.num}
        </div>

        {/* Image */}
        <div className={cn(
          'lg:flex items-center',
          isEven ? 'lg:order-1' : 'lg:order-2'
        )}>
          <div className="relative overflow-hidden rounded-xl border border-chm-border shadow-md w-full sm:w-full lg:w-[90%] mx-auto sm:mx-0">
            <img
              src={step.image}
              alt={step.title}
              loading="lazy"
              className="w-full aspect-[3/2] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className={cn(
          'mt-4 lg:mt-0 flex flex-col justify-center sm:pl-16 lg:pl-0',
          isEven ? 'lg:order-2 lg:pr-8 lg:text-left lg:items-start' : 'lg:order-1 lg:pl-8 lg:text-left lg:items-start'
        )}>
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-chm-red/10 text-chm-red mb-4">
            <Icon size={22} />
          </div>
          <div className="sm:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-chm-red/10 text-chm-red mb-4">
            <Icon size={22} />
          </div>
          <h2 className="text-2xl font-bold text-chm-charcoal mb-3">
            {step.title}
          </h2>
          <p className="text-chm-text-light leading-relaxed max-w-md">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Comment ça marche ?"
          subtitle="Un processus simple, transparent et entièrement accompagné, de l'expression de votre besoin jusqu'à la réception de votre équipement à Madagascar."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-chm-border lg:-translate-x-px hidden sm:block" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, index) => (
              <StepItem key={step.num} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={heroRef}
          className={cn(
            'mt-20 text-center py-16 px-6 rounded-2xl bg-chm-charcoal text-white transition-all duration-700',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-chm-gray max-w-xl mx-auto mb-8">
            Décrivez-nous votre besoin dès aujourd'hui et notre équipe s'occupe du reste.
            Le premier pas vers votre équipement professionnel.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-chm-red text-white font-bold rounded-lg hover:bg-chm-red-dark transition-colors"
          >
            Commencer maintenant
          </Link>
        </div>
      </div>
    </div>
  );
}
