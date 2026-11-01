import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { FeaturedProfilesSection } from "@/components/home/FeaturedProfilesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { SuccessStoriesSection } from "@/components/home/SuccessStoriesSection";
import { PlatformStatsSection } from "@/components/home/PlatformStatsSection";
import { NewsletterCTASection } from "@/components/home/NewsletterCTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-brand-darknavy text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <FeaturedProfilesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <SuccessStoriesSection />
      <PlatformStatsSection />
      <NewsletterCTASection />
      <Footer />
    </main>
  );
}
