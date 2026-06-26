"use client";

import { useRef } from "react";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import VisualPreview from "@/components/VisualPreview";
import SocialProof from "@/components/SocialProof";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Hero onCtaClick={scrollToWaitlist} />
      <ValueProp />
      <VisualPreview />
      <SocialProof />
      <div ref={waitlistRef}>
        <WaitlistForm />
      </div>
      <Footer />
    </>
  );
}
