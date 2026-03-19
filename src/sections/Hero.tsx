import { useEffect, useState } from 'react';
import { ChevronDown, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black z-0" />
      
      {/* Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          
          {/* Logo */}
          <div 
            className={`mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
          >
            <div className="relative overflow-hidden mx-auto w-[20rem] max-w-[90vw] sm:w-[24rem] md:w-[28rem] lg:w-[32rem] xl:w-[36rem]">
              {/* Luz branca desfocada (decorativa) */}
              <div
                aria-hidden
                className={`hero-logo-glint ${isLoaded ? 'animate-hero-logo-glint' : ''}`}
              />

              <img
                src="/images/logo.png"
                alt="Thor Personal"
                className={`mx-auto w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500 ${
                  isLoaded ? 'animate-hero-logo-blink' : ''
                }`}
              />
            </div>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <h1 
              className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <span className="text-gradient-gold">PERSONAL</span> TRAINER
            </h1>
          </div>

          {/* Subheadline */}
          <p 
            className={`text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-8 transition-all duration-600 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Transforme seu corpo com treinos personalizados e resultados de verdade
          </p>

          {/* Social Proof */}
          <div 
            className={`flex flex-wrap items-center justify-center gap-6 mb-10 transition-all duration-500 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-gold/20">
              <Users className="w-5 h-5 text-gold" />
              <span className="text-sm text-gray-300">+500 alunos transformados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-gold/20">
              <Star className="w-5 h-5 text-gold fill-gold" />
              <span className="text-sm text-gray-300">4.9 avaliação</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-900 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button 
              size="lg"
              onClick={scrollToServices}
              className="bg-gold text-black font-semibold px-8 py-6 text-lg hover:bg-gold-light hover:scale-105 transition-all duration-300 shadow-gold hover:shadow-gold-lg"
            >
              Começar Agora
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={scrollToPricing}
              className="border-2 border-gold text-gold font-semibold px-8 py-6 text-lg hover:bg-gold hover:text-black transition-all duration-300"
            >
              Ver Planos
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 delay-1100 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button 
          onClick={scrollToServices}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-gold transition-colors"
        >
          <span className="text-sm">Role para baixo</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
}
