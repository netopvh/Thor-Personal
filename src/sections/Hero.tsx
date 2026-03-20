import { useEffect, useRef } from 'react';
import { ChevronDown, Star, Users } from 'lucide-react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const glintRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      const reducedTargets = [
        logoWrapRef.current,
        headlineRef.current,
        subheadlineRef.current,
        socialRef.current,
        ctaRef.current,
        scrollIndicatorRef.current,
      ].filter(Boolean) as Array<HTMLElement | SVGElement>;

      gsap.set(reducedTargets, { opacity: 1, clearProps: 'all' });
      if (logoImgRef.current) gsap.set(logoImgRef.current, { scale: 1 });
      if (glintRef.current) gsap.set(glintRef.current, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (!logoWrapRef.current) return;

      const targets = [
        logoWrapRef.current,
        headlineRef.current,
        subheadlineRef.current,
        socialRef.current,
        ctaRef.current,
        scrollIndicatorRef.current,
      ].filter(Boolean) as Array<HTMLElement | SVGElement>;

      tl.set(
        targets,
        { opacity: 0 }
      );
      if (logoWrapRef.current) {
        tl.set(logoWrapRef.current, { scale: 0.75 });
      }
      if (headlineRef.current) tl.set(headlineRef.current, { y: 30, opacity: 0 });
      if (subheadlineRef.current) tl.set(subheadlineRef.current, { y: 20, opacity: 0 });
      if (socialRef.current) tl.set(socialRef.current, { y: 20, opacity: 0 });
      if (ctaRef.current) tl.set(ctaRef.current, { y: 20, opacity: 0 });
      if (scrollIndicatorRef.current) tl.set(scrollIndicatorRef.current, { y: 20, opacity: 0 });

      // Entrada principal
      tl.to(logoWrapRef.current, { opacity: 1, scale: 1, duration: 0.9 }, 0.0);
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.25);
      tl.to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.35);
      tl.to(socialRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.5);
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.75 }, 0.65);
      tl.to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.85);

      // Blink + glint sincronizados
      // (Executa após logo aparecer)
      const blinkStart = 0.85;
      if (logoImgRef.current) {
        tl.to(
          logoImgRef.current,
          { opacity: 0.2, scale: 0.98, duration: 0.08, ease: 'power1.inOut' },
          blinkStart
        )
          .to(
            logoImgRef.current,
            { opacity: 1, scale: 1.0, duration: 0.12, ease: 'power2.out' },
            blinkStart + 0.08
          )
          .to(
            logoImgRef.current,
            { opacity: 0.25, scale: 0.99, duration: 0.08, ease: 'power1.inOut' },
            blinkStart + 0.2
          )
          .to(
            logoImgRef.current,
            { opacity: 1, scale: 1.0, duration: 0.12, ease: 'power2.out' },
            blinkStart + 0.28
          )
          .to(
            logoImgRef.current,
            { opacity: 0.25, scale: 0.99, duration: 0.08, ease: 'power1.inOut' },
            blinkStart + 0.4
          )
          .to(
            logoImgRef.current,
            { opacity: 1, scale: 1.0, duration: 0.15, ease: 'power2.out' },
            blinkStart + 0.48
          );
      }

      if (glintRef.current) {
        // “Luz” branca em blur passando pelo logo
        tl.set(glintRef.current, { opacity: 0, xPercent: -35 }, blinkStart + 0.01)
          .to(
            glintRef.current,
            { opacity: 0.95, xPercent: -10, duration: 0.12, ease: 'power2.out' },
            blinkStart + 0.01
          )
          .to(
            glintRef.current,
            { opacity: 0.2, xPercent: 18, duration: 0.18, ease: 'power2.inOut' },
            blinkStart + 0.13
          )
          .to(
            glintRef.current,
            { opacity: 0, xPercent: 40, duration: 0.22, ease: 'power2.in' },
            blinkStart + 0.28
          );
      }
    }, logoWrapRef.current ?? undefined);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

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
          <div ref={logoWrapRef} className="mb-8">
            <div className="relative overflow-hidden mx-auto w-[20rem] max-w-[90vw] sm:w-[24rem] md:w-[28rem] lg:w-[32rem] xl:w-[36rem]">
              {/* Luz branca desfocada (decorativa) */}
              <div
                aria-hidden
                ref={glintRef}
                className="hero-logo-glint"
              />

              <img
                ref={logoImgRef}
                src="/images/logo.png"
                alt="Thor Personal"
                className="mx-auto w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <h1 
              ref={headlineRef}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider"
            >
              <span className="text-gradient-gold">PERSONAL</span> TRAINER
            </h1>
          </div>

          {/* Subheadline */}
          <p ref={subheadlineRef} className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
            Transforme seu corpo com treinos personalizados e resultados de verdade
          </p>

          {/* Social Proof */}
          <div ref={socialRef} className="flex flex-wrap items-center justify-center gap-6 mb-10">
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
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
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
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
