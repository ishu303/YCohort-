import { useEffect, useRef, useState, useCallback } from "react";

// Subject options per exam
const examSubjects: Record<string, string[]> = {
  JEE: ["Physics", "Chemistry", "Mathematics"],
  NEET: ["Physics", "Chemistry", "Biology"],
  UPSC: ["History", "Geography", "Polity", "Economy", "Environment", "Science & Tech"],
  CAT: ["Quantitative Aptitude", "Verbal Ability", "Logical Reasoning", "Data Interpretation"],
  NDA: ["Mathematics", "General Ability"],
};

const exams = ["JEE", "NEET", "UPSC", "CAT", "NDA"];

// Success checkmark SVG
function SuccessCheckmark() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-6">
      <circle cx="32" cy="32" r="30" stroke="#00D4AA" strokeWidth="2" fill="rgba(0,212,170,0.08)" />
      <path
        d="M20 32L28 40L44 24"
        stroke="#00D4AA"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="30"
        strokeDashoffset="0"
        className="animate-draw-check"
      />
    </svg>
  );
}

// Progress dots
function ProgressDots({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: isActive
                ? "#3B6BFF"
                : isCompleted
                ? "#00D4AA"
                : "rgba(255,255,255,0.15)",
            }}
          />
        );
      })}
    </div>
  );
}

export default function Waitlist() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Form state
  const [step, setStep] = useState(0);
  const [exam, setExam] = useState("");
  const [focusSubjects, setFocusSubjects] = useState<string[]>([]);
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const toggleSubject = useCallback(
    (subject: string, list: string[], setList: (v: string[]) => void) => {
      if (list.includes(subject)) {
        setList(list.filter((s) => s !== subject));
      } else {
        setList([...list, subject]);
      }
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setError("");

    const payload = {
      exam,
      focusSubjects,
      strongSubjects,
      city,
      name,
      email,
      timestamp: new Date().toISOString(),
    };

    // eslint-disable-next-line no-console
    console.log("Form payload:", payload);

    try {
      // TODO: Replace with your Google Apps Script URL
      // const res = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error("Failed to submit");

      // Simulate success for now
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    } catch {
      setError("Kuch galat hua. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [exam, focusSubjects, strongSubjects, city, name, email]);

  const currentSubjects = exam ? examSubjects[exam] || [] : [];

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="w-full py-[100px] md:py-[140px] px-6 md:px-16"
      style={{ background: "#0A0E1A" }}
    >
      <div
        className="max-w-[680px] mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <p className="font-body text-[12px] font-medium tracking-[2.5px] uppercase text-electric text-center mb-4">
          JOIN THE WAITLIST
        </p>
        <h2 className="font-display text-[32px] md:text-[48px] font-semibold tracking-[-1.2px] leading-[1.1] text-text-primary text-center">
          Aapka Exam Twin intezaar kar raha hai
        </h2>
        <p className="font-body text-[16px] md:text-[18px] text-text-secondary text-center mt-4">
          Early access paane ke liye form bhariye. Jab matching khulega, aap
          sabse pehle honge.
        </p>

        {/* Form card */}
        <div
          className="mt-12 bg-ink-surface border border-white/[0.06] border-t-[3px] border-t-electric rounded-3xl p-8 md:p-12"
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8">
              <SuccessCheckmark />
              <h3 className="font-display text-[24px] font-semibold text-text-primary">
                Dhanyavaad!
              </h3>
              <p className="font-body text-[16px] text-text-secondary mt-3 leading-[1.65]">
                Aap waitlist mein shamil ho gaye hain. Jab matching shuru hoga,
                aapko sabse pehle batayenge.
              </p>
            </div>
          ) : (
            <>
              <ProgressDots currentStep={step} totalSteps={5} />

              {/* Step 1: Select Exam */}
              {step === 0 && (
                <div>
                  <h3 className="font-display text-[22px] md:text-[24px] font-semibold text-text-primary mb-6">
                    Aap kaunsa exam de rahe hain?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {exams.map((e) => (
                      <button
                        key={e}
                        onClick={() => setExam(e)}
                        className={`py-5 px-4 rounded-xl text-center font-body text-[15px] font-medium transition-all duration-300 border ${
                          exam === e
                            ? "border-electric bg-electric/10 text-text-primary"
                            : "border-white/[0.08] bg-white/[0.03] text-text-secondary hover:border-white/[0.15]"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => exam && setStep(1)}
                      disabled={!exam}
                      className="font-body text-[14px] font-semibold text-white bg-electric rounded-full px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Focus Subjects */}
              {step === 1 && (
                <div>
                  <h3 className="font-display text-[22px] md:text-[24px] font-semibold text-text-primary mb-2">
                    Aapke focus subjects kaunse hain?
                  </h3>
                  <p className="font-body text-[14px] text-text-muted mb-6">
                    Jin subjects mein aapko partner ki zaroorat hai — unhe
                    select kariye.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {currentSubjects.map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          toggleSubject(s, focusSubjects, setFocusSubjects)
                        }
                        className={`py-3 px-6 rounded-full font-body text-[14px] font-medium transition-all duration-300 border ${
                          focusSubjects.includes(s)
                            ? "border-electric bg-electric/10 text-text-primary"
                            : "border-white/[0.08] bg-white/[0.05] text-text-secondary hover:border-white/[0.15]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setStep(0)}
                      className="font-body text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() =>
                        focusSubjects.length > 0 && setStep(2)
                      }
                      disabled={focusSubjects.length === 0}
                      className="font-body text-[14px] font-semibold text-white bg-electric rounded-full px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Strong Subjects */}
              {step === 2 && (
                <div>
                  <h3 className="font-display text-[22px] md:text-[24px] font-semibold text-text-primary mb-2">
                    Aapke strong subjects kaunse hain?
                  </h3>
                  <p className="font-body text-[14px] text-text-muted mb-6">
                    Jin subjects mein aap apne partner ki help kar sakte hain —
                    unhe select kariye.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {currentSubjects.map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          toggleSubject(s, strongSubjects, setStrongSubjects)
                        }
                        className={`py-3 px-6 rounded-full font-body text-[14px] font-medium transition-all duration-300 border ${
                          strongSubjects.includes(s)
                            ? "border-electric bg-electric/10 text-text-primary"
                            : "border-white/[0.08] bg-white/[0.05] text-text-secondary hover:border-white/[0.15]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="font-body text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() =>
                        strongSubjects.length > 0 && setStep(3)
                      }
                      disabled={strongSubjects.length === 0}
                      className="font-body text-[14px] font-semibold text-white bg-electric rounded-full px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: City */}
              {step === 3 && (
                <div>
                  <h3 className="font-display text-[22px] md:text-[24px] font-semibold text-text-primary mb-6">
                    Aap kaunse city se hain?
                  </h3>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Aapka city yahan likhiye..."
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 font-body text-[16px] text-text-primary placeholder:text-text-muted outline-none focus:border-electric focus:shadow-[0_0_0_3px_rgba(59,107,255,0.15)] transition-all duration-300"
                  />
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="font-body text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => city.trim() && setStep(4)}
                      disabled={!city.trim()}
                      className="font-body text-[14px] font-semibold text-white bg-electric rounded-full px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Contact */}
              {step === 4 && (
                <div>
                  <h3 className="font-display text-[22px] md:text-[24px] font-semibold text-text-primary mb-6">
                    Aap tak pahunchne ke liye
                  </h3>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aapka naam"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 font-body text-[16px] text-text-primary placeholder:text-text-muted outline-none focus:border-electric focus:shadow-[0_0_0_3px_rgba(59,107,255,0.15)] transition-all duration-300"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Aapka email"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 font-body text-[16px] text-text-primary placeholder:text-text-muted outline-none focus:border-electric focus:shadow-[0_0_0_3px_rgba(59,107,255,0.15)] transition-all duration-300"
                    />
                  </div>
                  {error && (
                    <p className="font-body text-[14px] text-red-400 mt-3">
                      {error}
                    </p>
                  )}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setStep(3)}
                      className="font-body text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!name.trim() || !email.trim() || submitting}
                      className="font-body text-[16px] font-semibold text-white bg-electric rounded-full px-10 py-4 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow transition-all duration-300"
                    >
                      {submitting ? "Submitting..." : "Join the waitlist"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
