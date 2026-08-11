import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ContactSection } from '@/components/sections/contact-section';
import { FloatingBackground } from '@/components/sections/floating-background';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <FloatingBackground />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
