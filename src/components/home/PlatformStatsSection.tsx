import React from "react";

export const PlatformStatsSection: React.FC = () => {
  const stats = [
    {
      value: "4,850+",
      label: "Registered Pets",
      subtext: "Beloved cats & dogs actively profiled",
    },
    {
      value: "2,310+",
      label: "Cats Registered",
      subtext: "From Persians to energetic tabbies",
    },
    {
      value: "2,540+",
      label: "Dogs Registered",
      subtext: "Gentle hounds, retrievers & companions",
    },
    {
      value: "1,420+",
      label: "Successful Connections",
      subtext: "Meaningful playdates & companion unions",
    },
  ];

  return (
    <section className="py-16 bg-brand-ice/50 dark:bg-brand-darksurface/50 border-y border-slate-200/80 dark:border-brand-darkborder transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-1.5">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-brand-sky tracking-tight">
                {stat.value}
              </span>
              <h3 className="font-heading font-bold text-sm sm:text-base text-brand-navy dark:text-white">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-brand-darkmuted hidden sm:block">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

