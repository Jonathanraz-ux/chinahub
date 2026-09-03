import { Star } from 'lucide-react';
import { testimonials } from '../../data';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionTitle from '../ui/SectionTitle';

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Ce que disent nos clients"
          subtitle="(Témoignages de démonstration)"
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-chm-cream border border-chm-border rounded-xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'text-chm-gold fill-chm-gold' : 'text-gray-300'}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-chm-text leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-chm-border pt-4">
                <p className="font-bold text-chm-charcoal text-sm">{testimonial.name}</p>
                <p className="text-xs text-chm-text-light">{testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
