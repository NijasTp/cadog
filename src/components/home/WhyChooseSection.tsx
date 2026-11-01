import React from "react";
import {
  Search,
  FileText,
  SlidersHorizontal,
  ShieldCheck,
  Heart,
  Scale,
  Sparkles,
} from "lucide-react";

export const WhyChooseSection: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Pet Discovery",
      description:
        "Filter and discover potential matches based on temperament, activity pace, and behavioral quirks rather than mere appearance.",
    },
    {
      icon: FileText,
      title: "Detailed Pet Profiles",
      description:
        "Every profile showcases medical summaries, vaccination badges, personality traits, and personal guardian stories.",
    },
    {
      icon: SlidersHorizontal,
      title: "Breed & Age Filters",
      description:
        "Easily calibrate searches by cat or dog species, verified breed lines, age stages (junior, prime, senior), and location radius.",
    },
    {
      icon: ShieldCheck,
      title: "Guardian Verification",
      description:
        "Owner profiles are checked for authenticity, ensuring a respectful environment for pet parents and animals alike.",
    },
    {
      icon: Heart,
      title: "Wishlist & Interest Suite",
      description:
        "Save favorites with one click, send bespoke notes, and track responses seamlessly from your personal dashboard.",
    },
    {
      icon: Scale,
      title: "Responsible Pet Matching",
      description:
        "Strict welfare principles encouraging ethical socialization, health screenings, and mutual owner respect.",
    },
  ];

  return (
    <section id="why-choose" className="py-20 bg-white dark:bg-brand-darknavy transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-ice dark:bg-brand-darksurface text-xs font-semibold text-brand-deep dark:text-brand-sky">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Advantages</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy dark:text-white tracking-tight">
            Why Choose Cagod?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-brand-darkmuted">
            Thoughtfully built tools tailored specifically to the unique dynamics of cat and dog
            relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group p-7 rounded-3xl bg-slate-50/70 dark:bg-brand-darksurface border border-slate-200/80 dark:border-brand-darkborder hover:border-brand-sky/60 dark:hover:border-brand-sky/40 transition-all duration-300 card-hover-effect"
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder flex items-center justify-center text-brand-deep dark:text-brand-cyan mb-5 shadow-xs group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-brand-darkmuted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

