import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '+5551986205200';
  const message = 'Gostaria de uma consultoria';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-whatsapp rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-whatsapp-pulse group"
      aria-label="Contato WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white fill-white" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Fale comigo no WhatsApp
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rotate-45" />
      </span>
    </a>
  );
}
