import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { AiProductsSection } from '@/components/sections/ai-products-section';
import { FounderSection } from '@/components/sections/founder-section';
import { ProcessSection } from '@/components/sections/process-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ContactSection } from '@/components/sections/contact-section';
import { FloatingBackground } from '@/components/sections/floating-background';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] text-slate-900">
      <FloatingBackground />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AiProductsSection />
      <AboutSection />
      <FounderSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
