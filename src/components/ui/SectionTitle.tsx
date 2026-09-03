import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({ title, subtitle, centered = true, className = '' }: SectionTitleProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12 transition-all duration-700',
        centered ? 'text-center' : 'text-left',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-chm-charcoal">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-lg text-chm-text-light max-w-2xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        'mt-4 w-16 h-1 bg-chm-red rounded-full',
        centered && 'mx-auto'
      )} />
    </div>
  );
}
