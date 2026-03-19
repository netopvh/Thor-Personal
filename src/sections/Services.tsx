import { 
  Monitor, 
  Apple, 
  Dna, 
  User, 
  Dumbbell, 
  MessageCircle 
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
    icon: Dna,
    title: 'Hormônios',
    description: 'Acompanhamento hormonal especializado',
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
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      id="servicos"
      ref={ref}
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
            className={`font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            SERVIÇOS <span className="text-gradient-gold">EXCLUSIVOS</span>
          </h2>
          <p 
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Tudo que você precisa para transformar seu corpo
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative bg-gradient-to-br from-dark-gray to-black border border-gold/20 rounded-2xl p-6 sm:p-8 
                  hover:border-gold/50 hover:shadow-gold transition-all duration-500 
                  hover:-translate-y-2 hover:scale-[1.02]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ 
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms'
                }}
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
