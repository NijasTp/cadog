"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  HeartHandshake,
  Sparkles,
  User,
  PlusCircle,
  HelpCircle,
  Home,
} from "lucide-react";
import { CagodLogo } from "@/components/illustrations/CagodLogo";
import { useTheme } from "@/context/ThemeContext";
import { getCurrentUser } from "@/lib/storage";
import { Owner } from "@/types";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [currentUser, setCurrentUserState] = useState<Owner | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setCurrentUserState(getCurrentUser());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleStorageChange = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail?.key === "cagod_current_user_v1") {
        setCurrentUserState(getCurrentUser());
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("cagod_storage_change", handleStorageChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cagod_storage_change", handleStorageChange);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore Pets", href: "/explore", icon: Compass },
    { label: "How It Works", href: "/#how-it-works", icon: HeartHandshake },
    { label: "Success Stories", href: "/#success-stories", icon: Sparkles },
    { label: "About", href: "/#about", icon: HelpCircle },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-brand-darknavy/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-brand-darkborder py-3"
          : "bg-white/80 dark:bg-brand-darknavy/80 backdrop-blur-sm border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <CagodLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                    active
                      ? "text-brand-deep dark:text-brand-cyan bg-brand-ice dark:bg-brand-darksurface font-semibold"
                      : "text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-brand-darksurface/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-600 dark:text-brand-darkmuted hover:text-brand-navy dark:hover:text-brand-cyan hover:bg-slate-100 dark:hover:bg-brand-darksurface transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sky"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-brand-sky" />
              ) : (
                <Moon className="w-5 h-5 text-brand-navy" />
              )}
            </button>

            {/* Authenticated / Guest State */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/create-profile"
                  className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-brand-deep dark:text-brand-cyan border border-brand-sky/40 hover:bg-brand-ice dark:hover:bg-brand-darksurface transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Register Pet</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-brand-deep hover:bg-brand-navy transition-all shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-brand-navy dark:text-brand-darktext hover:text-brand-deep transition-colors"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-brand-deep hover:bg-brand-navy dark:hover:bg-brand-deep/80 transition-all shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Register Your Pet</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle & Theme Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-brand-darkmuted hover:bg-slate-100 dark:hover:bg-brand-darksurface"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-brand-sky" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-brand-darktext hover:bg-slate-100 dark:hover:bg-brand-darksurface"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-100 dark:border-brand-darkborder animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                      active
                        ? "text-brand-deep dark:text-brand-cyan bg-brand-ice dark:bg-brand-darksurface font-semibold"
                        : "text-slate-600 dark:text-brand-darkmuted hover:bg-slate-50 dark:hover:bg-brand-darksurface/60"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-100 dark:border-brand-darkborder flex flex-col gap-2 px-2">
                {currentUser ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-brand-deep hover:bg-brand-navy"
                    >
                      <User className="w-4 h-4" />
                      <span>My Dashboard</span>
                    </Link>
                    <Link
                      href="/create-profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-brand-deep dark:text-brand-cyan border border-brand-sky/40 hover:bg-brand-ice dark:hover:bg-brand-darksurface"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Register Pet</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full py-2.5 rounded-lg font-semibold text-sm text-slate-700 dark:text-white bg-slate-100 dark:bg-brand-darksurface"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-brand-deep hover:bg-brand-navy"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Register Your Pet</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

