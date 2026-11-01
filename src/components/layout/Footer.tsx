import React from "react";
import Link from "next/link";
import { CagodLogo } from "@/components/illustrations/CagodLogo";
import { ShieldCheck, Heart, Award, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-brand-darksurface/90 border-t border-slate-200 dark:border-brand-darkborder pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Pledge Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-200 dark:border-brand-darkborder">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-ice dark:bg-brand-darkelevated flex items-center justify-center flex-shrink-0 text-brand-deep dark:text-brand-cyan">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-brand-navy dark:text-white">
                Verified Pet Guardians
              </h4>
              <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                Thoughtfully screened profiles ensuring authentic, responsible connections.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-ice dark:bg-brand-darkelevated flex items-center justify-center flex-shrink-0 text-brand-deep dark:text-brand-cyan">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-brand-navy dark:text-white">
                Ethical & Welfare First
              </h4>
              <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                Dedicated to genuine companionship, temperament compatibility, and animal health.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-ice dark:bg-brand-darkelevated flex items-center justify-center flex-shrink-0 text-brand-deep dark:text-brand-cyan">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-brand-navy dark:text-white">
                Private & Secure
              </h4>
              <p className="text-xs text-slate-500 dark:text-brand-darkmuted mt-0.5">
                Owner contact info stays strictly private until mutual interest is confirmed.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
          {/* Brand Info (2 columns) */}
          <div className="md:col-span-2 space-y-4">
            <CagodLogo size="lg" />
            <p className="text-sm text-slate-600 dark:text-brand-darkmuted leading-relaxed max-w-sm">
              Cagod Matrimony is the dedicated companion discovery and matrimony platform for cats and dogs.
              We unite responsible pet owners to celebrate joyful, healthy unions and meaningful playmates.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Custom SVG Social Links */}
              <a
                href="#social-instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder flex items-center justify-center text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-brand-cyan hover:border-brand-sky transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="#social-twitter"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full bg-white dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder flex items-center justify-center text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-brand-cyan hover:border-brand-sky transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="#social-facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white dark:bg-brand-darkelevated border border-slate-200 dark:border-brand-darkborder flex items-center justify-center text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-brand-cyan hover:border-brand-sky transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-brand-navy dark:text-brand-cyan">
              Explore Pets
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/explore?species=cat"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  Cats for Companionship
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?species=dog"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  Dogs for Companionship
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?featured=true"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  Featured Matches
                </Link>
              </li>
              <li>
                <Link
                  href="/create-profile"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  Register a Pet
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-brand-navy dark:text-brand-cyan">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  How Cagod Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#why-choose"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#success-stories"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  Owner Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Support */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-brand-navy dark:text-brand-cyan">
              Support & Ethics
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#about"
                  className="text-slate-600 dark:text-brand-darkmuted hover:text-brand-deep dark:hover:text-white transition-colors"
                >
                  About the Platform
                </Link>
              </li>
              <li>
                <span className="text-slate-500 dark:text-brand-darkmuted">
                  Pet Health Guidelines
                </span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-brand-darkmuted">
                  Responsible Matrimony Charter
                </span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-brand-darkmuted">
                  Privacy Policy & Safety
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-brand-darkborder flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-brand-darkmuted">
          <p>
            Copyright 2026 Cagod Matrimony. All rights reserved. Designed for loving pets and responsible pet parents.
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-brand-deep dark:text-brand-sky">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pet Companionship First</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

