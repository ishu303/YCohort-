import { useEffect, useRef, useState } from "react";

// SVG Icons
function ExamIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-8"
    >
      <rect
        x="10"
        y="6"
        width="28"
        height="36"
        rx="3"
        stroke="#3B6BFF"
        strokeWidth="1.5"
      />
      <path d="M16 16H32" stroke="#3B6BFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 22H28" stroke="#3B6BFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 28H24" stroke="#3B6BFF" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M30 30L33 33L39 27"
        stroke="#3B6BFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VennIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-8"
    >
      <circle
        cx="19"
        cy="24"
        r="12"
        stroke="#3B6BFF"
        strokeWidth="1.5"
        fill="rgba(59,107,255,0.06)"
      />
      <circle
        cx="29"
        cy="24"
        r="12"
        stroke="#3B6BFF"
        strokeWidth="1.5"
        fill="rgba(59,107,255,0.1)"
      />
    </svg>
  );
}

function PartnerIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-8"
    >
      <circle cx="16" cy="14" r="5" stroke="#3B6BFF" strokeWidth="1.5" />
      <circle cx="32" cy="14" r="5" stroke="#3B6BFF" strokeWidth="1.5" />
      <path
        d="M8 38C8 31.3726 11.5817 26 16 26"
        stroke="#3B6BFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M40 38C40 31.3726 36.4183 26 32 26"
        stroke="#3B6BFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="24"
        cy="24"
        r="4"
        fill="rgba(59,107,255,0.2)"
        stroke="#3B6BFF"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const steps = [
  {
    number: "01",
    title: "Bataiye aapka exam",
    body: "JEE, NEET, UPSC, CAT, NDA — jo bhi aapka lakshya, wohi aapka filter. Platform automatically pairs you with someone preparing for the same exam.",
    icon: <ExamIcon />,
  },
  {
    number: "02",
    title: "Share your subjects",
    body: "Aapke focus subjects aur strong subjects bataiye. Aapka Exam Twin woh hoga jiske strong subjects aapke focus subjects ho — aur vice versa. Dono ek dusre se seekhe.",
    icon: <VennIcon />,
  },
  {
    number: "03",
    title: "Mil jaaye, padh jaaye",
    body: "Matching ke baad, aapka Exam Twin same city mein, same goal ke saath. Ab ek schedule, ek rhythm, ek dusre ka support — aur ek clear focus.",
    icon: <PartnerIcon />,
  },
];

export default function HowItWorks() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="w-full py-[100px] md:py-[140px] px-6 md:px-16"
      style={{ background: "#0A0E1A" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Intro */}
        <div className="text-center mb-16 md:mb-20">
          <p
            className="font-body text-[12px] font-medium tracking-[2.5px] uppercase text-electric mb-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="font-display text-[32px] md:text-[48px] font-semibold tracking-[-1.2px] leading-[1.1] text-text-primary"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
            }}
          >
            Simple, serious, saaf
          </h2>
          <p
            className="font-body text-[16px] md:text-[18px] text-text-secondary mt-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1) 200ms",
            }}
          >
            Teen steps. Ek clear process. Bas.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group bg-ink-surface border border-white/[0.06] rounded-[20px] p-10 md:p-12 hover:border-electric/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(60px)",
                transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${
                  150 * i
                }ms`,
              }}
            >
              <p className="font-mono text-[14px] text-electric mb-5">
                {step.number}
              </p>
              <h3 className="font-display text-[24px] md:text-[28px] font-semibold tracking-[-0.5px] text-text-primary leading-[1.3]">
                {step.title}
              </h3>
              <p className="font-body text-[16px] text-text-secondary leading-[1.65] mt-4">
                {step.body}
              </p>
              {step.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
