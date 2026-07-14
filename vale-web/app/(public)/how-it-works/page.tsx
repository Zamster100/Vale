"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Search by location & needs",
    body: "Enter your town or postcode and tell us the kind of service you're looking for. Vale surfaces verified funeral directors near you — quietly, with no account and no pressure to decide anything yet.",
  },
  {
    number: "02",
    title: "Compare verified prices & services",
    body: "See real pricing side by side — the services on offer, the accreditations held, and reviews left by families who actually arranged a funeral. Everything in one calm view, so you can weigh your options in your own time.",
  },
  {
    number: "03",
    title: "Contact directors directly",
    body: "When you're ready, reach out straight to the funeral director. No middleman, no call centre, no hidden fees. Vale never marks up a price — what you're quoted is what they charge.",
  },
];

const reasons = [
  {
    icon: "/icons/vp.svg",
    title: "Verified directors only",
    body: "Every funeral director passes our checks before they can list. No anonymous profiles, no unvetted names.",
  },
  {
    icon: "/icons/asf.svg",
    title: "Transparent pricing",
    body: "Full, itemised price lists shown upfront — exactly what the CMA asks for, and what families deserve.",
  },
  {
    icon: "/icons/afr.svg",
    title: "Genuine reviews",
    body: "Reviews are tied to confirmed arrangements, so what you read comes from real families, not strangers.",
  },
  {
    icon: "/icons/ch.svg",
    title: "No hidden fees, no markup",
    body: "Vale is free for families. We never inflate a price or take a cut of what a director quotes you.",
  },
];

export default function HowItWorksPage() {
  const reduce = useReducedMotion();

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduce ? 0 : 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
    };
  }

  const reasonsRef = useRef<HTMLElement>(null);
  const reasonsInView = useInView(reasonsRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Hero + the three core steps — one compact above-the-fold block ── */}
      <section
        className="relative overflow-hidden bg-[#F8F7FF] pt-16 md:pt-24 pb-16 md:pb-24"
        aria-label="How Vale works"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, #F8F7FF 0%, #FDFCFE 100%)" }}
        />
        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-[1.7rem]">
          {/* Hero text */}
          <div className="max-w-3xl">
            <motion.p
              className="mb-6 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-[13px] font-[600] text-[#26126E] border border-[#E3DFFF] tracking-[0.07em] uppercase"
              {...fadeUp(0)}
            >
              How Vale works
            </motion.p>
            <motion.h1
              className="text-balance text-[40px] sm:text-[52px] lg:text-[60px] font-[900] leading-[1.05] tracking-[-0.03em] text-[#100B20] mb-6"
              {...fadeUp(0.1)}
            >
              A calmer way to arrange a funeral
            </motion.h1>
            <motion.p
              className="max-w-2xl text-[16px] sm:text-[18px] font-[400] leading-[1.6] text-[#4A415E]"
              {...fadeUp(0.2)}
            >
              Vale helps families find and compare verified funeral directors near them, with
              transparent pricing and no hidden fees. Take your time, see real costs side by side,
              and reach out directly when you&apos;re ready — there&apos;s no pressure and nothing
              to sign up for.
            </motion.p>
          </div>

          {/* The three core steps — directly beneath the hero copy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-12 md:mt-16">
            {steps.map(({ number, title, body }, i) => (
              <motion.div
                key={number}
                className="flex flex-col"
                {...fadeUp(0.3 + i * 0.09)}
              >
                <div className="text-[44px] md:text-[52px] font-[900] leading-[1] tracking-[-0.02em] text-[#B5AAFC] mb-3">
                  {number}
                </div>
                <h2 className="text-[20px] md:text-[22px] font-[700] leading-[1.25] text-[#100B20] mb-3">
                  {title}
                </h2>
                <p className="text-[15px] font-[400] leading-[1.65] text-[#4A415E]">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why families choose Vale ── */}
      <section
        ref={reasonsRef}
        className="bg-[#F4F2F8] py-20 md:py-28"
        aria-labelledby="reasons-heading"
      >
        <div className="max-w-[1366px] mx-auto px-4 sm:px-[1.7rem]">
          <div className="max-w-3xl mb-14">
            <motion.p
              className="text-[14px] font-[600] tracking-[0.02em] text-[#4F34C4] mb-4"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
            >
              Why families choose Vale
            </motion.p>
            <motion.h2
              id="reasons-heading"
              className="text-[24px] md:text-[30px] lg:text-[34px] font-[900] leading-[1.18] tracking-[-0.02em] text-[#100B20]"
              style={{ textWrap: "balance" } as React.CSSProperties}
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.07, ease: EASE }}
            >
              Planning a funeral is one of the hardest things you&apos;ll do. We think finding the
              right person to help shouldn&apos;t be.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {reasons.map(({ icon, title, body }, i) => (
              <motion.div
                key={title}
                className="flex flex-col rounded-2xl bg-white p-6 md:p-7 border border-[#EAE7F2] shadow-[0_12px_32px_rgba(16,11,32,0.05)]"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: EASE }}
              >
                <Image
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                  className="flex-shrink-0 mb-5"
                  aria-hidden="true"
                />
                <h3 className="text-[16px] md:text-[17px] font-[700] leading-[1.3] text-[#100B20] mb-2">
                  {title}
                </h3>
                <p className="text-[14px] font-[400] leading-[1.6] text-[#4A415E]">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA — dark band ── */}
      <section className="bg-[#100B20] py-20 md:py-24" aria-labelledby="cta-heading">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-[1.7rem]">
          <div className="max-w-2xl">
            <p className="text-[13px] font-[600] tracking-[0.07em] uppercase mb-5 text-[#9889F5]">
              Ready when you are
            </p>
            <h2
              id="cta-heading"
              className="text-[30px] md:text-[42px] font-[900] leading-[1.1] tracking-[-0.025em] text-white mb-5"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Find a funeral director near you
            </h2>
            <p className="text-[16px] md:text-[18px] font-[400] leading-[1.6] text-[#9889F5] mb-8">
              Search verified directors in your area, compare real prices, and reach out directly
              — all at your own pace, with no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-xl text-[15px] font-[700] transition-[background-color] duration-200 ease-out hover:bg-[#D6A314] group"
                style={{ backgroundColor: "#F5C541", color: "#100B20" }}
              >
                Start your search
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-xl border text-[15px] font-[600] transition-colors duration-200 ease-out hover:border-[#9889F5] hover:bg-white/5 hover:text-white"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#CFC8FF" }}
              >
                See typical costs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
