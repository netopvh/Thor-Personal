import { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

const reels = [
  'https://www.instagram.com/reel/DVwxiBOjNyt/',
  'https://www.instagram.com/reel/DUOzEDzEqyX/',
  'https://www.instagram.com/reel/DWAlEQojAya/',
  'https://www.instagram.com/reel/DV3ulkOjC4t/',
];

const ensureInstagramEmbedScript = () => {
  const existing = document.getElementById('instagram-embed-script');
  if (existing) return;

  const script = document.createElement('script');
  script.id = 'instagram-embed-script';
  script.async = true;
  script.src = '//www.instagram.com/embed.js';
  document.body.appendChild(script);
};

export function InstagramReels() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });
  const processedRef = useRef(false);

  useEffect(() => {
    ensureInstagramEmbedScript();

    const mq = window.matchMedia('(max-width: 767px)');

    const setIframePointerEvents = () => {
      const iframes = document.querySelectorAll<HTMLIFrameElement>(
        '.instagram-reels-embed-wrap iframe'
      );

      if (iframes.length === 0) return;

      if (mq.matches) {
        iframes.forEach((iframe) => {
          iframe.style.pointerEvents = 'none';
        });
      } else {
        iframes.forEach((iframe) => {
          iframe.style.pointerEvents = '';
        });
      }
    };

    // embed.js carrega assíncrono; no carrossel, tentamos algumas vezes
    // até o instgrm Embeds processar.
    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      const process = window.instgrm?.Embeds?.process;
      if (process && !processedRef.current) {
        processedRef.current = true;
        process();
      }

      if (attempts >= 20) {
        window.clearInterval(interval);
      }
    }, 150);

    // Garante que o pointer-events só é desabilitado depois do iframe existir,
    // evitando quebras no render do embed.
    const pointerPoll = window.setInterval(() => {
      const iframes = document.querySelectorAll<HTMLIFrameElement>(
        '.instagram-reels-embed-wrap iframe'
      );

      if (iframes.length > 0) {
        setIframePointerEvents();
        window.clearInterval(pointerPoll);
      }
    }, 150);

    // Ajusta caso o usuário rotacione a tela.
    const onMqChange = () => setIframePointerEvents();
    mq.addEventListener?.('change', onMqChange);

    return () => {
      window.clearInterval(interval);
      window.clearInterval(pointerPoll);
      mq.removeEventListener?.('change', onMqChange);
    };
  }, []);

  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black" />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            Acompanhe minhas redes sociais
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Conheça a rotina e venha fazer parte da minha equipe.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{ loop: true, dragFree: true }}
            className="px-2 sm:px-6 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
          >
            <CarouselContent className="touch-pan-y">
              {reels.map((url) => (
                <CarouselItem
                  key={url}
                  className="flex items-center justify-center basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <div className="instagram-reels-embed-wrap w-full max-w-[540px] mx-auto overflow-hidden rounded-3xl border border-gold/20 bg-black/40 shadow-gold/10 h-[520px] sm:h-[560px] md:h-[600px]">
                    <blockquote
                      className="instagram-media"
                      data-instgrm-hide-caption="true"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                      style={{ margin: 0, padding: 0 }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="outline"
              size="icon"
              className="-left-1 sm:-left-2 bg-black/40 border-gold/20 hover:bg-gold/10 text-gold"
            />
            <CarouselNext
              variant="outline"
              size="icon"
              className="-right-1 sm:-right-2 bg-black/40 border-gold/20 hover:bg-gold/10 text-gold"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

