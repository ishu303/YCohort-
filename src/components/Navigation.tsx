import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "How it works", target: "how-it-works" },
    { label: "Why Y Cohort", target: "why-y-cohort" },
    { label: "Join waitlist", target: "waitlist" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-[16px] border-b border-white/[0.06]"
          : "bg-ink/80 backdrop-blur-[16px]"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-[16px] font-bold tracking-[3px] text-text-primary"
        >
          Y COHORT
        </button>

        {/* Center nav links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="font-body text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA - desktop */}
        <button
          onClick={() => scrollTo("waitlist")}
          className="hidden md:block font-body text-[14px] font-semibold text-white bg-electric rounded-full px-7 py-3 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-400"
        >
          Get early access
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-ink/95 backdrop-blur-[16px] border-b border-white/[0.06] py-6 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="font-body text-[16px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("waitlist")}
            className="font-body text-[14px] font-semibold text-white bg-electric rounded-full px-7 py-3 mt-2 w-fit"
          >
            Get early access
          </button>
        </div>
      )}
    </nav>
  );
}
