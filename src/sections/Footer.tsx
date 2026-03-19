import { Instagram, Youtube } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Footer() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Planos', href: '#planos' },
    { label: 'Contato', href: '#contato' },
  ];

  const services = [
    { label: 'Consultoria Online', href: '#planos' },
    { label: 'Aulas Presenciais', href: '#presencial' },
    { label: 'Nutrição', href: '#servicos' },
    { label: 'Poses', href: '#servicos' },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/thor.personal' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@thor.personal' },
  ];

  return (
    <footer 
      ref={ref}
      className="relative py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px">
        <div 
          className={`h-full bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Logo & Tagline */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <img 
              src="/images/logo.png" 
              alt="Thor Personal"
              className="w-32 h-auto mb-4"
            />
            <p className="text-gray-500 text-sm">
              Transforme seu corpo. Liberte seu poder.
            </p>
          </div>

          {/* Quick Links */}
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-500 hover:text-gold transition-colors text-sm inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <h4 className="text-white font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.label}>
                  <a 
                    href={service.href}
                    className="text-gray-500 hover:text-gold transition-colors text-sm inline-block relative group"
                  >
                    {service.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="text-gray-500 text-sm mb-4">
              <p>WhatsApp: +55 51 98620-5200</p>
              <p>Email: contato@thorpersonal.com</p>
            </div>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-gray border border-gold/20 
                      flex items-center justify-center text-gray-500 
                      hover:border-gold/50 hover:text-gold transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className={`pt-8 border-t border-gold/10 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm text-center sm:text-left">
              © 2026 Thor Personal. Todos os direitos reservados - Solutions Code
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-gold transition-colors">
                Política de Privacidade
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-600 hover:text-gold transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Watermark */}
      <div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-[0.02]' : 'opacity-0'
        }`}
      >
        <img 
          src="/images/logo.png" 
          alt=""
          className="w-96 h-auto"
        />
      </div>
    </footer>
  );
}
