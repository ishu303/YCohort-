export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] px-6 md:px-16 py-12" style={{ background: "#0A0E1A" }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="font-display text-[14px] font-bold tracking-[2px] text-text-muted">
            Y COHORT
          </span>
          <span className="font-body text-[14px] text-text-muted">2025</span>
        </div>

        {/* Center links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-body text-[14px] text-text-muted hover:text-text-primary transition-colors duration-300"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-body text-[14px] text-text-muted hover:text-text-primary transition-colors duration-300"
          >
            Terms
          </a>
          <a
            href="#"
            className="font-body text-[14px] text-text-muted hover:text-text-primary transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Right */}
        <p className="font-body text-[14px] text-text-muted italic">
          Made with focus, for focus
        </p>
      </div>
    </footer>
  );
}
