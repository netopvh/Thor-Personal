import { ParticleBackground } from '@/components/ParticleBackground';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Pricing } from '@/sections/Pricing';
import { InPerson } from '@/sections/InPerson';
import { InstagramReels } from '@/sections/InstagramReels';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <Pricing />
        <InPerson />
        <InstagramReels />
        <Contact />
        <Footer />
      </main>
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
