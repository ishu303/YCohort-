import { useEffect, useRef, useState } from "react";

const features = [
  "1:1 matching — koi group chat nahi",
  "Same exam, same city — relevance guaranteed",
  "Focus subjects, not weak subjects — respectful language",
  "No fake social proof — only real connections",
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle
        cx="10"
        cy="10"
        r="10"
        fill="rgba(0,212,170,0.15)"
      />
      <path
        d="M6 10L9 13L14 7"
        stroke="#00D4AA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhyYCohort() {
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

  return (
    <section
      id="why-y-cohort"
      ref={sectionRef}
      className="w-full py-[100px] md:py-[140px] px-6 md:px-16"
      style={{ background: "#0D1220" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Left - Image */}
        <div
          className="w-full md:w-1/2"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1) 200ms",
          }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/images/study-together.jpg"
              alt="Two students studying together on a video call"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, #0D1220 100%)",
              }}
            />
          </div>
        </div>

        {/* Right - Text */}
        <div className="w-full md:w-1/2">
          <p
            className="font-body text-[12px] font-medium tracking-[2.5px] uppercase text-electric mb-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            WHY Y COHORT
          </p>
          <h2
            className="font-display text-[32px] md:text-[48px] font-semibold tracking-[-1.2px] leading-[1.1] text-text-primary"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
            }}
          >
            Connection, not content
          </h2>
          <p
            className="font-body text-[16px] md:text-[18px] text-text-secondary leading-[1.65] mt-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1) 200ms",
            }}
          >
            Hazaar apps content de rahe hain. Lekin koi nahi de raha ek saathi.
            Y Cohort aapko us vyakti se jodta hai jiske saath aap ek dusre ki
            kami ko poora kar sakte hain. Yeh sirf padhai nahi — yeh ek
            relationship hai focused growth ka.
          </p>

          {/* Feature list */}
          <div
            className="mt-10 flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms",
            }}
          >
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-4">
                <CheckIcon />
                <p className="font-body text-[16px] text-text-primary">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
