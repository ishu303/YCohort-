import { useEffect, useRef, useState } from "react";
import ElectricWave from "../components/ElectricWave";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const anim = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
      style={{ background: "#0A0E1A" }}
    >
      <ElectricWave />

      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[900px] mx-auto pt-[72px]"
      >
        {/* Overline */}
        <p
          className="font-body text-[12px] font-medium tracking-[2.5px] uppercase text-electric mb-6"
          style={anim(0)}
        >
          INDIA&apos;S FIRST EXAM TWIN PLATFORM
        </p>

        {/* Main headline */}
        <h1
          className="font-display text-[40px] md:text-[56px] lg:text-[72px] font-bold tracking-[-2px] leading-[1.05] text-text-primary"
          style={anim(200)}
        >
          <span className="block">Aapka Exam Twin</span>
          <span className="block mt-2">
            Bas{" "}
            <span className="relative inline-block">
              <span>Ek</span>
              <span
                className="absolute bottom-1 left-0 h-[2px] bg-electric"
                style={{
                  width: loaded ? "100%" : "0%",
                  transition: "width 1.2s ease-out 800ms",
                  boxShadow: "0 0 20px rgba(59,107,255,0.5)",
                }}
              />
            </span>{" "}
            Click Door Hai
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-[16px] md:text-[20px] font-normal text-text-secondary max-w-[560px] leading-[1.65] mt-7"
          style={anim(400)}
        >
          Ek platform, ek purpose — aapka saathi, aapki preparation. Y Cohort
          aapko usse jodta hai jo aapki kami ko poora kare.
        </p>

        {/* CTA */}
        <div style={anim(600)}>
          <button
            onClick={scrollToWaitlist}
            className="mt-11 font-body text-[16px] font-semibold text-white bg-electric rounded-full px-11 py-4 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-400"
          >
            Join the waitlist
          </button>
        </div>

        {/* Trust microcopy */}
        <p
          className="font-body text-[13px] text-text-muted mt-4"
          style={anim(750)}
        >
          No spam. Bas matching ke liye.
        </p>
      </div>
    </section>
  );
}
