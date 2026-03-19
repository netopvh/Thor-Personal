import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const plans = [
  {
    name: '1 Mês',
    price: '250,00',
    period: '/mês',
    savings: null,
    popular: false,
    features: [
      'Treino personalizado',
      'Suporte via WhatsApp',
      'Acesso ao app',
    ],
    cta: 'Começar Agora',
  },
  {
    name: '3 Meses',
    price: '600,00',
    period: '/total',
    savings: 'Economize R$ 150',
    popular: true,
    features: [
      'Treino personalizado',
      'Suporte via WhatsApp',
      'Acesso ao app',
      'Dieta nutricional',
      'Correção de exercícios',
    ],
    cta: 'Escolher Plano',
  },
  {
    name: '6 Meses',
    price: '900,00',
    period: '/total',
    savings: 'Economize R$ 600',
    popular: false,
    features: [
      'Treino personalizado',
      'Suporte via WhatsApp',
      'Acesso ao app',
      'Dieta nutricional',
      'Correção de exercícios',
      'Aula de poses',
      'Acompanhamento hormonal',
    ],
    cta: 'Transformar',
  },
];

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const handlePlanClick = (planName: string) => {
    const phoneNumber = '+5551986205200';
    const message = `Olá! Gostaria de contratar o plano de ${planName} da Consultoria Online.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section 
      id="planos"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black" />
      
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
        }}
      />

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
            CONSULTORIA <span className="text-gradient-gold">ONLINE</span>
          </h2>
          <p 
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Escolha o plano ideal para sua transformação
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div 
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{ transitionDelay: '600ms' }}
                >
                  <div className="flex items-center gap-1 bg-gold text-black px-4 py-1 rounded-full text-sm font-semibold shadow-gold">
                    <Sparkles className="w-4 h-4" />
                    MAIS POPULAR
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full bg-gradient-to-br from-dark-gray to-black border rounded-2xl p-6 sm:p-8 
                  transition-all duration-700
                  ${plan.popular 
                    ? 'border-gold shadow-gold-lg hover:shadow-gold-intense' 
                    : 'border-gold/20 hover:border-gold/50 hover:shadow-gold'
                  }
                  hover:-translate-y-2
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ 
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: isVisible ? `${300 + index * 150}ms` : '0ms'
                }}
              >
                {/* Plan Name */}
                <h3 className="font-display text-2xl text-white mb-4 text-center">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="text-center mb-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-gold text-lg">R$</span>
                    <span className="font-display text-5xl sm:text-6xl text-gradient-gold">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>

                {/* Savings */}
                {plan.savings && (
                  <div className="text-center mb-6">
                    <span className="inline-block bg-gold/10 text-gold text-sm px-3 py-1 rounded-full">
                      {plan.savings}
                    </span>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={feature}
                      className={`flex items-center gap-3 text-gray-300 transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ 
                        transitionDelay: isVisible ? `${500 + index * 150 + featureIndex * 80}ms` : '0ms'
                      }}
                    >
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full py-6 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gold text-black hover:bg-gold-light hover:scale-105 shadow-gold'
                      : 'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black'
                  }`}
                >
                  {plan.cta}
                </Button>

                {/* Shimmer Effect for Popular */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <p 
          className={`text-center text-gray-500 text-sm mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          Todos os planos incluem acesso completo à plataforma e suporte dedicado
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
}
