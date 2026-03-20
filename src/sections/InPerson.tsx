import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function InPerson() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section 
      id="presencial"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Diagonal Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <div 
              className={`inline-block mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <span className="text-gold text-sm font-semibold tracking-widest uppercase border border-gold/30 px-4 py-2 rounded-full">
                Aulas Presenciais
              </span>
            </div>

            {/* Headline */}
            <h2 
              className={`font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Treine com o <span className="text-gradient-gold">Thor</span>
            </h2>

            {/* Description */}
            <p 
              className={`text-gray-400 text-lg mb-8 max-w-lg transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              Aulas presenciais personalizadas para acelerar seus resultados com acompanhamento profissional de perto.
            </p>

            {/* Features */}
            <div 
              className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-sm">Palhoça, SC</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-gold" />
                <span className="text-sm">Horários Flexíveis</span>
              </div>
            </div>

            {/* Price */}
            <div 
              className={`mb-8 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
            >
              <span className="text-gray-400 text-sm block mb-1">A partir de</span>
              <div className="flex items-baseline gap-1">
                <span className="text-gold text-2xl">R$</span>
                <span className="font-display text-6xl sm:text-7xl text-gradient-gold">150,00</span>
                <span className="text-gray-400 text-lg">/aula</span>
              </div>
            </div>

            {/* CTA */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Button
                size="lg"
                className="bg-gold text-black font-semibold px-8 py-6 text-lg hover:bg-gold-light hover:scale-105 transition-all duration-300 shadow-gold group"
              >
                <a
                  href="https://client.mfitpersonal.com.br/out/signup-link/Mzc1NTg4"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Cadastre-se e seja meu aluno
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Note */}
            <p 
              className={`text-gray-500 text-sm mt-4 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              *Vagas limitadas
            </p>
          </div>

          {/* Image/Visual */}
          <div 
            className={`order-1 lg:order-2 relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl blur-2xl" />
              
              {/* Main Visual */}
              <div className="relative h-full bg-gradient-to-br from-dark-gray to-black border border-gold/20 rounded-3xl overflow-hidden">
                {/* Background photo */}
                <img
                  src="/images/profissional.jpeg"
                  alt="Profissional treinando"
                  className="absolute inset-0 w-full h-full object-cover opacity-65 saturate-150"
                />

                {/* Dark overlay para garantir legibilidade do conteúdo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Decorative Grid */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 215, 0, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 215, 0, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Center Content */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-8 pb-10 sm:pb-14">
                  <h3 className="font-display text-3xl text-white text-center mb-2">
                    AULAS PRESENCIAIS
                  </h3>
                  <p className="text-gold text-center text-sm">
                    Treinamento Personalizado
                  </p>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/10 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gold/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
}
