import Navigation from "../components/Navigation";
import Hero from "../sections/Hero";
import Problem from "../sections/Problem";
import HowItWorks from "../sections/HowItWorks";
import WhyYCohort from "../sections/WhyYCohort";
import Waitlist from "../sections/Waitlist";
import Footer from "../sections/Footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh]" style={{ background: "#0A0E1A" }}>
      <Navigation />
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyYCohort />
      <Waitlist />
      <Footer />
    </div>
  );
}
