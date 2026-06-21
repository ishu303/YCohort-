import { useEffect, useRef, useState } from "react";

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const anim = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full py-[100px] md:py-[140px] px-6 md:px-16"
      style={{ background: "#0A0E1A" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Left column - 55% */}
        <div className="w-full md:w-[55%]">
          <p
            className="font-body text-[12px] font-medium tracking-[2.5px] uppercase text-electric mb-4"
            style={anim(0)}
          >
            THE PROBLEM
          </p>
          <h2
            className="font-display text-[32px] md:text-[48px] font-semibold tracking-[-1.2px] leading-[1.1] text-text-primary"
            style={anim(100)}
          >
            Har aspirant ek chuppi mein jeeta hai
          </h2>
          <p
            className="font-body text-[16px] md:text-[18px] text-text-secondary leading-[1.65] max-w-[480px] mt-6"
            style={anim(200)}
          >
            Books, videos, aur to-do lists — sab hai. Lekin koi nahi jo aapse
            puche, &apos;Aaj kitna hua?&apos; Woh ek saathi jo aapke focus
            subjects ko samjhe, aur aapko unke strong subjects mein wapas le
            aaye.
          </p>
          <div
            className="mt-8 bg-ink-surface border border-white/[0.06] rounded-xl px-6 py-5 inline-block"
            style={anim(300)}
          >
            <p className="font-display text-[32px] font-bold text-mint"
              style={{ textShadow: "0 0 20px rgba(0,212,170,0.3)" }}
            >
              87%
            </p>
            <p className="font-mono text-[14px] text-mint mt-1">
              aspirants report studying alone decreases their consistency
            </p>
          </div>
        </div>

        {/* Right column - 45% */}
        <div className="w-full md:w-[45%]" style={anim(200)}>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/images/study-desk.jpg"
              alt="A student's study desk at night with books and a glowing phone"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
            {/* Vignette overlay */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, #0A0E1A 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
