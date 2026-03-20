import { 
  Monitor, 
  Apple, 
  User, 
  Dumbbell, 
  MessageCircle 
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const services = [
  {
    icon: Monitor,
    title: 'Consultoria Online',
    description: 'Treino Personalizado direto no nosso site ou App',
  },
  {
    icon: Apple,
    title: 'Dieta com Nutricionista',
    description: 'Planos alimentares personalizados para seus objetivos',
  },
  {
    icon: User,
    title: 'Aula de Poses',
    description: 'Para atletas e competidores',
  },
  {
    icon: Dumbbell,
    title: 'Correção de Exercícios',
    description: 'Análise e correção da sua técnica',
  },
  {
    icon: MessageCircle,
    title: 'Contato via WhatsApp',
    description: 'Suporte direto e personalizado',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('[data-service-card]'));

    const title = section.querySelector<HTMLElement>('[data-services-title]');
    const subtitle = section.querySelector<HTMLElement>('[data-services-subtitle]');

    const ctx = gsap.context(() => {
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 44, rotateX: 12 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section 
      id="servicos"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            data-services-title
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 opacity-0 translate-y-8"
          >
            SERVIÇOS <span className="text-gradient-gold">EXCLUSIVOS</span>
          </h2>
          <p 
            data-services-subtitle
            className="text-gray-400 text-lg max-w-2xl mx-auto opacity-0 translate-y-8"
          >
            Tudo que você precisa para transformar seu corpo
          </p>
        </div>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                data-service-card
                className={`services-card group relative bg-gradient-to-br from-dark-gray to-black border border-gold/20 rounded-2xl p-6 sm:p-8 
                  hover:border-gold/50 hover:shadow-gold transition-all duration-500 
                  hover:-translate-y-2 hover:scale-[1.02]
                  opacity-0 translate-y-12 w-full sm:w-1/2 lg:basis-[calc((100%-64px)/3)] lg:max-w-[calc((100%-64px)/3)] flex-none`}
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center 
                    group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-7 h-7 text-gold group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-gold/20 blur-xl opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl sm:text-2xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/0 group-hover:border-gold/30 
                  transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
}
