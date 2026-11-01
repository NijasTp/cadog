"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCurrentUser, setCurrentUser } from "@/lib/storage";
import { Owner } from "@/types";
import {
  LayoutDashboard,
  PawPrint,
  Heart,
  HeartHandshake,
  Settings,
  PlusCircle,
  LogOut,
  ShieldCheck,
  Compass,
  User,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUserState] = useState<Owner | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUserState(user);

    const handleStorage = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail?.key === "cagod_current_user_v1") {
        setCurrentUserState(getCurrentUser());
      }
    };

    window.addEventListener("cagod_storage_change", handleStorage);
    return () => window.removeEventListener("cagod_storage_change", handleStorage);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Pets", href: "/dashboard/my-pets", icon: PawPrint },
    { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { label: "Interests", href: "/dashboard/interests", icon: HeartHandshake },
    { label: "Account Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-brand-darknavy text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= DESKTOP SIDEBAR (3 cols) ================= */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Guardian Profile Snapshot */}
            <div className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-6 shadow-soft text-center space-y-4">
              <div className="relative inline-block mx-auto">
                <div className="w-20 h-20 rounded-full bg-brand-ice dark:bg-brand-darkelevated border-2 border-brand-sky/40 flex items-center justify-center text-brand-deep dark:text-brand-cyan shadow-xs mx-auto">
                  <User className="w-10 h-10" />
                </div>
                <span
                  className="absolute bottom-0 right-0 p-1 bg-white dark:bg-brand-darksurface rounded-full border border-slate-200 dark:border-brand-darkborder text-brand-deep dark:text-brand-cyan shadow-xs"
                  title="Verified Pet Guardian"
                >
                  <ShieldCheck className="w-4 h-4 fill-brand-cyan/20" />
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-brand-navy dark:text-white">
                  {currentUser?.fullName || "Pet Guardian"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                  {currentUser?.email || "guardian@cagod.com"}
                </p>
                <p className="text-[11px] text-brand-deep dark:text-brand-sky font-medium mt-1">
                  Member since {currentUser?.joinedDate || "October 2026"}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-brand-darkborder">
                <Link
                  href="/create-profile"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Register New Pet</span>
                </Link>
              </div>
            </div>

            {/* Sidebar Navigation Links */}
            <nav className="bg-white dark:bg-brand-darksurface border border-slate-200/90 dark:border-brand-darkborder rounded-3xl p-3 shadow-soft space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      active
                        ? "bg-brand-ice dark:bg-brand-darkelevated text-brand-deep dark:text-brand-cyan font-extrabold shadow-2xs"
                        : "text-slate-600 dark:text-brand-darkmuted hover:bg-slate-50 dark:hover:bg-brand-darkelevated/60 hover:text-brand-navy dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-brand-darkborder space-y-1">
                <Link
                  href="/explore"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 dark:text-brand-darkmuted hover:bg-slate-50 dark:hover:bg-brand-darkelevated/60"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Companions</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* ================= MAIN DASHBOARD BODY (9 cols) ================= */}
          <main className="lg:col-span-9 space-y-6">
            {/* Mobile Navigation Bar */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      active
                        ? "bg-brand-deep text-white shadow-xs"
                        : "bg-white dark:bg-brand-darksurface border border-slate-200 dark:border-brand-darkborder text-slate-600 dark:text-brand-darkmuted"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

