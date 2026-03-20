import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { formatPhone } from '@/utils/phoneMask';

export function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'telefone' ? formatPhone(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data: { ok?: boolean; error?: string } = {};

      if (text.trim()) {
        try {
          data = JSON.parse(text) as { ok?: boolean; error?: string };
        } catch {
          throw new Error('Falha ao enviar mensagem. Tente novamente.');
        }
      }

      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.error || 'Falha ao enviar mensagem.');
      }

      setSubmitted(true);

      // Reset after showing success
      window.setTimeout(() => {
        setSubmitted(false);
        setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
      }, 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao enviar mensagem. Tente novamente.';
      setSubmitError(message);
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+55 51 98620-5200',
      href: 'https://wa.me/+5551986205200',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'thorpersonaloficial@gmail.com',
      href: 'mailto:thorpersonaloficial@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Palhoça, SC',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/thor.personal',
      color: 'hover:text-instagram',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://youtube.com/@thor.personal',
      color: 'hover:text-youtube',
    },
  ];

  return (
    <section 
      id="contato"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black" />
      
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
            VAMOS <span className="text-gradient-gold">CONVERSAR</span>
          </h2>
          <p 
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Entre em contato e comece sua transformação hoje
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            {/* Info Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-4 p-4 bg-dark-gray border border-gold/20 rounded-xl 
                      hover:border-gold/50 hover:bg-dark-gray/80 transition-all duration-500 group
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ 
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms'
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center 
                      group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm block">{item.label}</span>
                      <span className="text-white group-hover:text-gold transition-colors">{item.value}</span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div 
              className={`transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-white font-semibold mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg bg-dark-gray border border-gold/20 
                        flex items-center justify-center text-gray-400 
                        hover:border-gold/50 hover:scale-110 transition-all duration-300
                        ${social.color}
                        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                      style={{ 
                        transitionDelay: isVisible ? `${700 + index * 100}ms` : '0ms',
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                      }}
                      aria-label={social.label}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <form onSubmit={handleSubmit} className="bg-dark-gray border border-gold/20 rounded-2xl p-6 sm:p-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="text-gray-400 text-sm block mb-2">Nome</label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="bg-black border-gold/20 text-white placeholder:text-gray-600 
                      focus:border-gold focus:ring-gold/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-gray-400 text-sm block mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="bg-black border-gold/20 text-white placeholder:text-gray-600 
                      focus:border-gold focus:ring-gold/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="text-gray-400 text-sm block mb-2">Telefone</label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    required
                    maxLength={15}
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(51) 99999-9999"
                    className="bg-black border-gold/20 text-white placeholder:text-gray-600 
                      focus:border-gold focus:ring-gold/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="text-gray-400 text-sm block mb-2">Mensagem</label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Como posso ajudar você?"
                    rows={4}
                    className="bg-black border-gold/20 text-white placeholder:text-gray-600 
                      focus:border-gold focus:ring-gold/20 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-6 font-semibold transition-all duration-300 ${
                    submitted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gold text-black hover:bg-gold-light hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center gap-2">
                      Mensagem enviada!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Enviar Mensagem
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </Button>

                {submitError && (
                  <p className="text-red-400 text-sm text-center" role="alert">
                    {submitError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
}
