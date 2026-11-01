import React from "react";
import { PetAvatar } from "@/components/illustrations/PetAvatar";
import { Quote, Sparkles, Heart } from "lucide-react";

export const SuccessStoriesSection: React.FC = () => {
  const stories = [
    {
      id: "story-1",
      pets: "Jasper & Daisy",
      speciesInfo: "Golden Retriever and Welsh Corgi",
      pet1Avatar: "dog-golden-retriever",
      pet2Avatar: "dog-corgi",
      owners: "Jonathan Hayes & Tyler Bennett",
      location: "Seattle & Austin",
      quote:
        "Jasper was energetic and needed a canine buddy who could keep up with his park enthusiasm without getting overwhelmed. Daisy matched his energy instantly. Their weekly weekend playdates are now the highlight of our schedules!",
      date: "Connected August 2026",
    },
    {
      id: "story-2",
      pets: "Barnaby & Luna",
      speciesInfo: "Two Serene White Persians",
      pet1Avatar: "cat-persian-white",
      pet2Avatar: "cat-persian-white",
      owners: "Eleanor Vance & Benjamin Ward",
      location: "Seattle & Minneapolis",
      quote:
        "Both Barnaby and Luna have tranquil, soft-spoken personalities. Finding a companion who did not invade Barnaby's personal space felt impossible until Cagod's temperament filters matched them. They now snooze side by side by the fireplace.",
      date: "Connected September 2026",
    },
    {
      id: "story-3",
      pets: "Cleo & Thorin",
      speciesInfo: "Siamese Royal & Gentle Maine Coon",
      pet1Avatar: "cat-siamese",
      pet2Avatar: "cat-maine-coon",
      owners: "Marcus Chen & Chloe Evans",
      location: "San Francisco & Denver",
      quote:
        "Cleo is inquisitive and talkative while Thorin is the quintessential gentle giant. We were nervous about how two distinct feline breeds would connect, but Cagod's owner communication tools allowed us to take things slowly and safely.",
      date: "Connected October 2026",
    },
  ];

  return (
    <section
      id="success-stories"
      className="py-20 bg-slate-50/60 dark:bg-brand-darksurface/30 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-ice dark:bg-brand-darksurface text-xs font-semibold text-brand-deep dark:text-brand-sky">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Heartwarming Unions</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy dark:text-white tracking-tight">
            Success Stories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-brand-darkmuted">
            Read how caring pet parents used Cagod to discover compatible companions, enriching the
            lives of their beloved pets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder rounded-3xl p-7 shadow-soft hover:shadow-card transition-all flex flex-col justify-between card-hover-effect"
            >
              <div className="space-y-5">
                {/* Pet Avatars Connection Pair */}
                <div className="flex items-center justify-center gap-3 py-2">
                  <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-brand-darkelevated p-1 border border-slate-200 dark:border-brand-darkborder shadow-xs">
                    <PetAvatar avatarId={story.pet1Avatar} className="w-full h-full" />
                  </div>

                  <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-500 shadow-xs">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>

                  <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-brand-darkelevated p-1 border border-slate-200 dark:border-brand-darkborder shadow-xs">
                    <PetAvatar avatarId={story.pet2Avatar} className="w-full h-full" />
                  </div>
                </div>

                {/* Pet Pair Heading */}
                <div className="text-center">
                  <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
                    {story.pets}
                  </h3>
                  <p className="text-xs text-brand-deep dark:text-brand-sky font-medium mt-0.5">
                    {story.speciesInfo}
                  </p>
                </div>

                {/* Quote */}
                <div className="relative pt-2">
                  <Quote className="w-6 h-6 text-slate-200 dark:text-brand-darkborder absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-brand-darkmuted leading-relaxed pl-3 italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Owner Info & Date Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-brand-darkborder flex items-center justify-between text-xs text-slate-500 dark:text-brand-darkmuted">
                <div>
                  <p className="font-semibold text-brand-navy dark:text-slate-200">{story.owners}</p>
                  <p className="text-[11px]">{story.location}</p>
                </div>
                <span className="text-[10px] uppercase font-medium tracking-wider text-brand-deep dark:text-brand-cyan">
                  {story.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

