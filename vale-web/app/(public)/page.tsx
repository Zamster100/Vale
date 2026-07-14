'use client';

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, ArrowRight, Search } from "lucide-react";
import HomeSearchBar from "@/components/HomeSearchBar";

/* ─────────────────────── DESIGN TOKENS ─────────────────────── */
const DM        = "var(--font-dm-sans), -apple-system, sans-serif";
const EASE      = [0.16, 1, 0.3, 1] as const;

const PURPLE    = "#4F34C4";
const DARK      = "#100B20";
const HERO_BG   = "#A898F4";
const BADGE_TXT = "#26126E";
const LAVENDER  = "#E3DFFF";
const PERIW     = "#CFC8FF";
const PUR_GRAY  = "#EAE7F2";
const CREAM     = "#FEF1C6";
const GOLD      = "#AC7E08";
const DRK_PUR   = "#342C46";
const STAR_C    = "#F5C541";
const BODY      = "#4A415E";
const MUTED     = "#9E96B2";
const STAT_LBL  = "#6B6280";
const BORDER    = "#D5D0E4";
const BG_OFF    = "#FDFCFE";
const DK_BDR    = "#1E172E";
const HOVER_LT  = "#F8F7FF";

/* ─────────────────────── SECTION DATA ──────────────────────── */

const WHY_VALE = [
  {
    icon: "/icons/ic1a.svg",
    title: "Real prices upfront",
    body: "Every provider publishes their full itemised price list. No hidden extras — exactly what the CMA requires.",
  },
  {
    icon: "/icons/ic3a.svg",
    title: "Independently verified",
    body: "Not every funeral director makes it onto Vale. They pass our checks before they can list.",
  },
  {
    icon: "/icons/ic4a.svg",
    title: "Verified family reviews",
    body: "Reviews linked to confirmed arrangements only. Real families, real experiences.",
  },
  {
    icon: "/icons/ic2a.svg",
    title: "Powerful search filters",
    body: "On a budget? Specific faith? Filter to funeral services that meet your unique needs.",
  },
];

const STATS = [
  { icon: "/icons/vp.svg",  value: "1,200+",  label: "Verified providers" },
  { icon: "/icons/afr.svg", value: "4.9 / 5", label: "Average family rating" },
  { icon: "/icons/asf.svg", value: "£1,895",  label: "Average saving found" },
  { icon: "/icons/ch.svg",  value: "0",        label: "Hidden charges, ever" },
];

const COSTS = [
  {
    label: "Direct cremation",
    price: "£1,995",
    tag: "Most affordable",
    desc: "Cremation only, no service, ashes returned to family",
    img: "/illustrations/direct2.png",
    bg: CREAM,
    color: GOLD,
    radius: "16px 80px 16px 16px",
  },
  {
    label: "Standard funeral",
    price: "£4,285",
    tag: "UK average",
    desc: "Funeral service, cremation or burial, basic coffin",
    img: "/illustrations/standard2.png",
    bg: LAVENDER,
    color: PURPLE,
    radius: "80px 16px 16px 16px",
  },
  {
    label: "Total cost of dying",
    price: "£9,797",
    tag: "Full picture",
    desc: "Includes probate, admin, wake, memorials, obituary",
    img: "/illustrations/total2.png",
    bg: PUR_GRAY,
    color: DRK_PUR,
    radius: "16px 16px 80px 16px",
  },
];

const SEARCH_CATS = [
  {
    label: "Direct Cremation",
    bg: LAVENDER,
    color: PURPLE,
    radius: "16px 80px 16px 16px",
    imgH: 220,
    img: "/illustrations/directcremation.png",
    searchHref: "/search?type=direct-cremation",
    infoHref: "/resources/direct-cremation",
    desc: "Simple, dignified cremation without a formal service. The most affordable option.",
    wide: true,
  },
  {
    label: "Direct Burial",
    bg: CREAM,
    color: GOLD,
    radius: "80px 16px 16px 16px",
    imgH: 180,
    img: "/illustrations/directburial.png",
    searchHref: "/search?type=direct-burial",
    infoHref: "/resources/direct-burial",
    desc: "Burial without a ceremony or viewing. A private, straightforward choice.",
    wide: false,
  },
  {
    label: "Traditional Cremation",
    bg: PUR_GRAY,
    color: DRK_PUR,
    radius: "16px 16px 80px 16px",
    imgH: 180,
    img: "/illustrations/traditionalcremation.png",
    searchHref: "/search?type=traditional-cremation",
    infoHref: "/resources/traditional-cremation",
    desc: "A full funeral service and farewell, followed by cremation.",
    wide: false,
  },
  {
    label: "Traditional Burial",
    bg: PERIW,
    color: PURPLE,
    radius: "16px 16px 16px 80px",
    imgH: 220,
    img: "/illustrations/traditionalburial.png",
    searchHref: "/search?type=traditional-burial",
    infoHref: "/resources/traditional-burial",
    desc: "Full funeral service with burial in a cemetery or churchyard.",
    wide: true,
  },
];

const MEDIA_LOGOS = [
  { src: "/logos/ft.svg",        alt: "Financial Times",  w: 100 },
  { src: "/logos/guardian.svg",  alt: "The Guardian",     w: 110 },
  { src: "/logos/bbc-news.svg",  alt: "BBC News",         w: 90  },
  { src: "/logos/telegraph.svg", alt: "The Telegraph",    w: 110 },
];

const TESTIMONIALS = [
  {
    quote: "I was in the worst week of my life. Vale let me look at real prices at 2 am without calling anyone. I found a funeral director we could afford, close to home. I can't describe how much that mattered.",
    name: "Rachel T.",
    location: "Leeds",
    date: "March 2026",
    avatar: "R",
  },
  {
    quote: "We've used three funeral directors for family members in five years. Vale was the only time we actually understood what we were paying for — and why. The prices were exactly what we were quoted.",
    name: "David & Anne K.",
    location: "Bristol",
    date: "January 2026",
    avatar: "D",
  },
  {
    quote: "My father had written down exactly what he wanted. Vale's vault meant we had everything in one place when it mattered most. The advisor who called us was extraordinary.",
    name: "Marcus J.",
    location: "Edinburgh",
    date: "February 2026",
    avatar: "M",
  },
];

const RESOURCES = [
  { title: "What To Do When Someone Dies",                       tag: "Guide",     href: "/guides/what-to-do-when-someone-dies",      tagBg: LAVENDER, tagColor: PURPLE  },
  { title: "What to Do If You Cannot Afford a Funeral",          tag: "Guide",     href: "/guides/cannot-afford-a-funeral",            tagBg: CREAM,    tagColor: GOLD    },
  { title: "Understanding Funeral Costs",                        tag: "Guide",     href: "/guides/understanding-funeral-costs",        tagBg: LAVENDER, tagColor: PURPLE  },
  { title: "Understanding 'Next of Kin'",                        tag: "Explainer", href: "/guides/understanding-next-of-kin",          tagBg: PUR_GRAY, tagColor: DRK_PUR },
  { title: "Lasting Power of Attorney",                          tag: "Guide",     href: "/guides/lasting-power-of-attorney",          tagBg: LAVENDER, tagColor: PURPLE  },
  { title: "A Complete Guide to Planning a Meaningful Funeral",  tag: "Guide",     href: "/guides/planning-a-meaningful-funeral",      tagBg: LAVENDER, tagColor: PURPLE  },
];

/* ─────────────────────── PAGE ───────────────────────────────── */
export default function Home() {
  const reduce = useReducedMotion();

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduce ? 0 : 20 },
      whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
      viewport: { once: true, margin: "-80px" },
    };
  }

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <div style={{ fontFamily: DM, background: "#ffffff", color: DARK }}>

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: HERO_BG, paddingTop: "64px", paddingBottom: "144px" }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-7 flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold border"
            style={{
              background: "rgba(255,255,255,0.30)",
              backdropFilter: "blur(8px)",
              borderColor: "rgba(255,255,255,0.40)",
              color: BADGE_TXT,
            }}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
          >
            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            UK&apos;s verified funeral marketplace
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="text-balance max-w-3xl mb-5"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: DARK,
            }}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.1, ease: EASE } }}
          >
            Find a verified funeral director{" "}
            <span style={{ color: BADGE_TXT }}>near you</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="max-w-xl mb-10"
            style={{ fontSize: "clamp(16px,1.5vw,18px)", fontWeight: 400, lineHeight: 1.6, color: DRK_PUR }}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.2, ease: EASE } }}
          >
            Compare real prices from 1,200+ verified providers across the UK.
            No account needed. No pressure. No hidden fees.
          </motion.p>

          {/* Search */}
          <motion.div
            className="w-full max-w-[560px]"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.3, ease: EASE } }}
          >
            <div
              className="flex items-center gap-2 rounded-xl p-2 border"
              style={{
                background: "#ffffff",
                borderColor: BORDER,
                boxShadow: "0 8px 32px rgba(16,11,32,0.14)",
              }}
            >
              <Search className="ml-2 flex-shrink-0 w-4 h-4" style={{ color: MUTED }} aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <HomeSearchBar />
              </div>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.42, ease: EASE } }}
          >
            {[
              { icon: <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />, label: "Prices shown upfront" },
              { icon: <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />, label: "1,200+ verified providers" },
              { icon: <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />, label: "Free family advisor" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium border"
                style={{
                  background: "rgba(255,255,255,0.40)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(255,255,255,0.50)",
                  color: BADGE_TXT,
                }}
              >
                {icon}
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero background terrain */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[150%]"
          viewBox="0 -350 2806 1504"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
          style={{ zIndex: 0 }}
        >
          <path d="M0 0H2806V515.505V518.541V651.193V654.45V805.758V809.213V1148.39V1504H0V1138.6V813.386V810.337V541.98V538.624V0Z" fill="#A898F4"/>
          <path d="M0 0H2806V515.505C2780.57 510.335 2756.49 509.377 2730.92 509.025C2642.18 507.802 2566.81 538.774 2488.76 577.124C2466.9 587.866 2443.29 601.693 2421.74 611.906C2404.97 609.404 2372.39 609.099 2355.31 608.972C2268.02 608.323 2186.51 618.163 2102.83 643.807C2060 656.933 2029.72 672.02 1989.91 687.682C1987.25 688.373 1987.15 688.577 1984.88 689.979C1968.6 699.14 1956.5 696.446 1938.57 700.023C1925 702.731 1910.44 705.668 1897.04 708.97C1875.9 714.293 1855.01 720.554 1834.43 727.733C1824.5 731.185 1802.06 741.103 1792.75 739.578C1790.98 738.387 1785.23 738.207 1782.86 738.047C1765.68 738.574 1742.46 734.417 1724.2 734.203C1623.03 733.019 1524.23 750.775 1426.24 774.428C1417.34 776.577 1386.12 775.871 1375.35 775.763C1334.55 775.595 1293.78 773.314 1253.22 768.93C1127.26 754.342 1028.3 719.953 909.649 676.432C835.596 649.61 762.677 622.619 684.539 610.156C588.081 594.772 494.665 602.28 399.27 618.679C272.648 563.302 137.778 539.758 0 538.624V0Z" fill="#A898F4"/>
          <path d="M2421.74 611.906C2443.29 601.693 2466.9 587.866 2488.76 577.124C2566.81 538.774 2642.18 507.802 2730.92 509.025C2756.49 509.377 2780.57 510.335 2806 515.505V518.541V651.193V654.45V805.758V809.213C2683.3 792.703 2539.4 793.558 2418.72 822.791C2251.59 863.272 2094.12 945.611 1929.56 997.055C1808.77 1035.01 1682.96 1054.58 1556.35 1055.09C1304.68 1057.65 1103.28 1007.29 869.61 917.636C713.662 857.804 546.528 786.57 379.639 771.589C252.163 760.145 123.013 781.365 0 813.386V810.337V541.98V538.624C137.778 539.758 272.648 563.302 399.27 618.679C494.665 602.28 588.081 594.772 684.539 610.156C762.677 622.619 835.596 649.61 909.649 676.432C1028.3 719.953 1127.26 754.342 1253.22 768.93C1293.78 773.314 1334.55 775.595 1375.35 775.763C1386.12 775.871 1417.34 776.577 1426.24 774.428C1524.23 750.775 1623.03 733.019 1724.2 734.203C1742.46 734.417 1765.68 738.574 1782.86 738.047C1785.23 738.207 1790.98 738.387 1792.75 739.578C1802.06 741.103 1824.5 731.185 1834.43 727.733C1855.01 720.554 1875.9 714.293 1897.04 708.97C1910.44 705.668 1925 702.731 1938.57 700.023C1956.5 696.446 1968.6 699.14 1984.88 689.979C1987.15 688.577 1987.25 688.373 1989.91 687.682C2029.72 672.02 2060 656.933 2102.83 643.807C2186.51 618.163 2268.02 608.323 2355.31 608.972C2372.39 609.099 2404.97 609.404 2421.74 611.906Z" fill="#F4F0FF"/>
          <path d="M2807.5 807.436L2805.83 807.249C2649.99 789.783 2499.92 791.887 2349.33 839.793C2268.92 865.376 2190.8 897.415 2112.27 928.538C2033.77 959.652 1954.88 989.843 1873.03 1011.67C1644.42 1072.63 1399.68 1062.5 1170.39 1011.53L1170.3 1008.63C1205.81 998.329 1240.92 986.751 1275.59 973.913C1345.03 948.158 1421.05 916.109 1491.66 894.282C1534.64 880.999 1578.52 870.762 1622.95 863.651C1683.31 854.003 1746.2 851.033 1807.13 849.62H1807.14C1889.32 848.428 1967.35 848.56 2047.77 830.11C2112.85 815.181 2173.25 788.586 2233.27 760.719C2293.26 732.87 2352.9 703.735 2416.28 683.878C2542.81 644.241 2675.08 640.471 2806.14 652.957L2807.5 653.086V807.436Z" fill="#BFAFF9" stroke="#F4F0FF" strokeWidth="3"/>
          <path d="M0.0205078 540.48C128.456 542.22 254.944 561.743 374.274 610.423C440.097 637.276 503.742 668.376 568 697.466C632.292 726.572 697.262 753.697 765.901 772.698C827.839 789.843 888.546 795.239 949.541 797.755C1010.48 800.27 1071.84 799.908 1134.77 805.568C1238.51 814.896 1342.46 863.125 1433.7 911.274L1436.71 912.864L1433.51 914.013C1342.32 946.699 1258.06 983.12 1164.35 1009.88L1163.96 1009.99L1163.57 1009.89C1050.58 981.122 957.957 949.56 849.145 907.94C725.495 860.644 583.001 801.914 452.739 779.588H452.737C405.841 771.476 358.37 767.125 310.78 766.577V766.576C217.692 766.009 90.5221 785.902 0.414062 811.779L-1.5 812.329V540.459L0.0205078 540.48Z" fill="#BFAFF9" stroke="#F4F0FF" strokeWidth="3"/>
          <path d="M2807.5 652.87L2805.83 652.684C2681.26 638.769 2551.56 645.577 2430.41 679.39C2397.69 688.524 2346.15 709.535 2317.41 720.275H2317.41C2316.84 720.489 2315.97 720.574 2315.08 720.621C2314.11 720.671 2312.87 720.686 2311.42 720.668C2308.5 720.634 2304.63 720.474 2300.12 720.222C2291.1 719.718 2279.48 718.838 2267.71 717.824C2255.95 716.809 2244.04 715.658 2234.45 714.611C2224.91 713.57 2217.54 712.618 2214.96 711.989L2213.32 711.587L2213.92 710.003L2214.54 708.353L2214.85 707.509L2215.74 707.393C2218.67 707.011 2224.6 705.175 2232.24 702.447C2239.82 699.74 2248.92 696.214 2258.08 692.538C2276.41 685.184 2294.94 677.249 2301.98 674.112C2346.17 654.401 2386.81 632.602 2426.19 611.5C2465.56 590.406 2503.66 570.003 2542.7 553.142C2620.83 519.399 2702.73 499.818 2806.25 517.061L2807.5 517.27V652.87Z" fill="#BFAFF9" stroke="#F4F0FF" strokeWidth="3"/>
          <path d="M1707.52 735.291L1711.11 735.323C1723.83 735.488 1736.55 736.067 1749.24 737.061H1749.24C1759.78 737.865 1770.57 738.899 1782 738.899H1782.05L1782.1 738.903C1784.42 739.059 1788.66 739.495 1791.41 740.553L1798.08 741.887L1794.17 743.842C1793.23 744.315 1792.96 744.498 1792.78 744.617C1792.45 744.838 1792.21 744.982 1791.48 745.282C1752.35 761.19 1714.88 779.285 1677.57 797.731C1640.27 816.17 1603.13 834.969 1564.75 852.244L1564.74 852.249C1518.46 872.644 1470.96 890.132 1422.51 904.607L1421.91 904.785L1421.36 904.486C1367.13 874.885 1310.39 850.139 1251.8 830.535L1247.15 828.977L1251.88 827.667C1266.17 823.713 1280.6 818.378 1294.97 813.973C1392.22 784.187 1491.15 756.688 1592.39 743.862C1628.89 739.238 1670.28 735.111 1707.52 735.291Z" fill="#BFAFF9" stroke="#F4F0FF" strokeWidth="3"/>
          <path d="M2034.6 670.046C2154.57 619.528 2288.06 602.756 2417.41 612.851L2422.54 613.251L2417.99 615.67C2359.92 646.547 2301.84 677.445 2239.52 699.459L2236.55 700.501C2234.69 701.148 2232.13 702.117 2229.2 703.215C2226.27 704.309 2222.99 705.523 2219.73 706.643C2216.48 707.761 2213.21 708.793 2210.32 709.521C2207.47 710.237 2204.82 710.699 2202.87 710.576C2180.54 709.175 2158.13 706.35 2135.76 703.372C2113.38 700.393 2091.07 697.262 2068.88 695.234H2068.88C2057.2 694.138 2045.47 693.567 2033.72 693.521C2031.37 693.535 2019.5 694.185 2007.94 694.758C2002.18 695.044 1996.51 695.309 1992.19 695.463C1990.03 695.54 1988.2 695.589 1986.85 695.599C1986.18 695.604 1985.61 695.6 1985.18 695.582C1984.97 695.573 1984.76 695.56 1984.59 695.541C1984.48 695.529 1984.18 695.497 1983.9 695.374L1982.26 694.657L1983.25 693.167C1983.68 692.526 1984.16 692.054 1984.57 691.693C1984.76 691.519 1984.96 691.357 1985.11 691.235C1985.26 691.103 1985.37 691.014 1985.44 690.94L1985.61 690.768L1985.83 690.658C1986.84 690.154 1987.92 689.613 1989.53 689.077L1989.55 689.068L1989.58 689.061L1992.11 688.316C2006.49 682.732 2020.25 676.088 2034.6 670.046Z" fill="#BFAFF9" stroke="#F4F0FF" strokeWidth="3"/>
          <path d="M548.707 603.899C616.351 601.386 684.008 608.551 749.625 625.177H749.625C794.808 636.546 836.988 652.191 880.631 667.566C963.393 696.723 1045.53 728.962 1130.84 749.14L1134.91 750.092L1134.91 750.093C1196.47 764.46 1259.22 773.152 1322.37 776.06L1322.38 776.061C1337.42 776.854 1352.48 777.264 1367.54 777.292H1370.56C1375 777.319 1381.28 777.236 1387.3 777.304C1393.34 777.372 1399.37 777.591 1403.52 778.248L1403.53 778.25L1403.54 778.251L1404.63 778.433L1409.39 779.233L1405.01 781.272C1403.47 781.99 1400.65 782.949 1397.26 784.003C1393.83 785.067 1389.72 786.256 1385.56 787.431C1377.19 789.791 1368.64 792.077 1364.63 793.241C1328.41 803.758 1293.45 813.954 1257.7 826.06L1257.68 826.068L1257.66 826.075L1247.66 829.127L1247.21 829.263L1246.77 829.123C1212.07 818.172 1176.44 810.371 1140.34 805.815V805.814C1086.52 799.335 1037.48 800.385 983.724 799.113V799.114C934.15 798.38 884.684 794.265 835.67 786.796L835.659 786.794C708.718 766.446 603.821 713.129 488.621 660.356C460.694 647.563 431.539 633.729 403.246 622.225L398.212 620.179L403.583 619.353C455.978 611.301 495.5 606.084 548.701 603.899H548.707Z" fill="#BFAFF9" stroke="#F4F0FF" strokeWidth="3"/>
          <path d="M2012.7 693.96C2062.39 692.658 2098.11 698.869 2146.98 704.706C2201.35 711.201 2257.96 718.38 2312.4 720.711L2312.96 723.577C2197.66 775.509 2094.33 832.876 1964.1 843.674C1915.63 847.693 1866.6 848.262 1817.7 849.221C1768.79 850.181 1720 851.532 1671.92 857.102L1671.89 857.105L1671.87 857.107C1591.96 863.348 1512.78 886.524 1437.19 912.438L1436.57 912.649L1435.99 912.342L1424.51 906.222L1421.14 904.426L1424.84 903.449C1441.29 899.091 1460.54 892.31 1476.85 886.667C1573.02 853.397 1653.34 808.095 1736.58 769.584C1819.77 731.099 1905.69 699.507 2012.66 693.961L2012.68 693.96H2012.7Z" fill="#BFAFF9" stroke="#F4F0FF" strokeWidth="3"/>
          <path d="M0 1138.6C156.796 1194.55 317.561 1238.67 480.946 1270.61C797.326 1334.08 1119.35 1365.1 1442.03 1363.21C1587.18 1363.8 1732.29 1357.53 1876.85 1344.44C2061.86 1327.3 2245.53 1297.96 2426.67 1256.6C2555.33 1228.78 2682.04 1192.64 2806 1148.39V1504H0V1138.6Z" fill="#FDFCFE"/>
        </svg>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. WHY VALE — white cards overlapping the hero
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-7">
        <motion.div
          className="-mt-20 md:-mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {WHY_VALE.map(({ icon, title, body }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="group relative flex flex-col items-center text-center gap-4 rounded-xl bg-white p-6 border cursor-default"
              style={{
                borderColor: PUR_GRAY,
                boxShadow: "0 12px 32px rgba(16,11,32,0.06)",
              }}
            >
              <div className="w-10 h-10 flex items-center justify-center mx-auto">
                <Image src={icon} alt="" aria-hidden="true" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <h3
                  className="mb-1.5"
                  style={{ fontSize: "15px", fontWeight: 700, lineHeight: 1.3, color: DARK }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "13px", fontWeight: 400, lineHeight: 1.6, color: BODY }}>{body}</p>
              </div>
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: PURPLE }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. PRICING + STATS
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: BG_OFF }}>
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7">

          {/* Section header */}
          <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14" {...fadeUp(0)}>
            <div className="max-w-lg">
              <h2
                className="mb-3"
                style={{ fontSize: "clamp(24px,2.5vw,32px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em", color: DARK }}
              >
                What does a funeral actually cost?
              </h2>
              <p style={{ fontSize: "clamp(15px,1.2vw,18px)", fontWeight: 400, lineHeight: 1.6, color: BODY }}>
                UK averages updated quarterly —{" "}
                <span style={{ color: PURPLE, fontWeight: 600 }}>Vale Funeral Price Index 2026.</span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-[14px] font-semibold transition-colors duration-150 group hover:opacity-75"
                style={{ color: PURPLE }}
              >
                Full cost guide
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Pricing cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {COSTS.map(({ label, price, tag, desc, img, bg, color, radius }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="group relative bg-white rounded-2xl border overflow-hidden flex flex-col"
                style={{ borderColor: BORDER }}
              >
                {/* Illustration area */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: radius,
                    background: bg,
                    height: "200px",
                    margin: "14px 14px 0",
                    width: "calc(100% - 28px)",
                  }}
                >
                  <Image
                    src={img}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Card content */}
                <div className="flex flex-col flex-1 p-6 pt-5">
                  <span
                    className="inline-flex self-start items-center text-[11px] font-semibold tracking-[0.06em] uppercase mb-4 px-3 py-1 rounded-full"
                    style={{ background: bg, color }}
                  >
                    {tag}
                  </span>
                  <div
                    style={{
                      fontSize: "clamp(36px,3vw,44px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: DARK,
                      marginBottom: "8px",
                    }}
                  >
                    {price}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>{label}</div>
                  <p style={{ fontSize: "13px", color: BODY, lineHeight: 1.55 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="mb-16 text-xs" style={{ color: MUTED }}>
            * UK averages, Vale Funeral Price Index Q1 2026. Regional prices vary significantly.
          </p>

          {/* Stats strip */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x"
            style={{ ["--tw-divide-opacity" as string]: 1 } as React.CSSProperties}
          >
            {STATS.map(({ icon, value, label }) => (
              <div key={label} className="md:px-10 first:md:pl-0 last:md:pr-0">
                <div className="flex items-center gap-4">
                  <Image src={icon} alt="" aria-hidden="true" width={48} height={48} className="flex-shrink-0" />
                  <div>
                    <div
                      style={{
                        fontSize: "clamp(30px,3vw,44px)",
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        color: DARK,
                        marginBottom: "4px",
                      }}
                    >
                      {value}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: STAT_LBL }}>{label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. SEARCH BY CATEGORY
      ══════════════════════════════════════════════════════ */}
      <section className="pb-20 md:pb-28" style={{ background: BG_OFF }}>
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7">

          {/* Header */}
          <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14" {...fadeUp(0)}>
            <div className="max-w-lg">
              <h2
                id="category-grid-heading"
                className="mb-3"
                style={{ fontSize: "clamp(24px,2.5vw,32px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em", color: DARK }}
              >
                Search by category
              </h2>
              <p style={{ fontSize: "clamp(15px,1.2vw,18px)", fontWeight: 400, lineHeight: 1.6, color: BODY }}>
                Not sure where to start? Choose the type of funeral that best fits your needs.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-[14px] font-semibold transition-colors duration-150 group hover:opacity-75"
                style={{ color: PURPLE }}
              >
                Browse all types
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Category cards — 3-col grid, alternating wide card */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {SEARCH_CATS.map(({ label, bg, color, radius, imgH, img, desc, searchHref, infoHref, wide }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className={`group relative bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${wide ? "md:col-span-2" : ""}`}
                style={{ borderColor: BORDER }}
              >
                {/* Illustration area */}
                <div
                  className="relative w-full overflow-hidden flex items-center justify-center"
                  style={{
                    borderRadius: radius,
                    background: bg,
                    height: `${imgH}px`,
                    margin: "14px 14px 0",
                    width: "calc(100% - 28px)",
                  }}
                >
                  <Image src={img} alt={label} fill className="object-cover" />
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6 pt-5">
                  <h3
                    className="mb-2"
                    style={{ fontSize: "17px", fontWeight: 700, lineHeight: 1.25, color: DARK }}
                  >
                    {label}
                  </h3>
                  <p className="flex-1 mb-5" style={{ fontSize: "14px", color: BODY, lineHeight: 1.6 }}>{desc}</p>
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={infoHref}
                      className="text-[13px] font-semibold transition-colors duration-150 hover:underline"
                      style={{ color }}
                      aria-label={`What is ${label.toLowerCase()}?`}
                    >
                      What is {label.toLowerCase()}?
                    </Link>
                    <Link
                      href={searchHref}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150 flex-shrink-0"
                      style={{ background: bg, color }}
                      aria-label={`Search ${label}`}
                    >
                      <ArrowRight className="w-[15px] h-[15px]" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. AS FEATURED IN
      ══════════════════════════════════════════════════════ */}
      <section className="py-10 px-4" style={{ background: "#ffffff", borderTop: `1px solid ${PUR_GRAY}`, borderBottom: `1px solid ${PUR_GRAY}` }}>
        <motion.div className="max-w-[1366px] mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12" {...fadeUp(0)}>
          <span
            style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}
          >
            As featured in
          </span>
          {MEDIA_LOGOS.map(({ src, alt, w }) => (
            <Image
              key={alt}
              src={src}
              alt={alt}
              width={w}
              height={32}
              className="opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-200 object-contain"
            />
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32 overflow-hidden" aria-labelledby="testimonials-heading">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7">

          {/* Header — centred */}
          <motion.div className="text-center max-w-xl mx-auto mb-16 md:mb-20" {...fadeUp(0)}>
            <h2
              id="testimonials-heading"
              className="mb-4"
              style={{
                fontSize: "clamp(24px,3vw,36px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: DARK,
              }}
            >
              Trusted at life&apos;s hardest moments
            </h2>
            <p style={{ fontSize: "clamp(15px,1.2vw,16px)", fontWeight: 400, lineHeight: 1.65, color: BODY }}>
              Real families, real experiences — every review linked to a confirmed arrangement.
            </p>
          </motion.div>

          {/* Staggered cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TESTIMONIALS.map(({ quote, name, location, date, avatar }, i) => (
              <motion.figure
                key={name}
                variants={staggerItem}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  i === 1 ? "md:mt-12" : i === 2 ? "md:mt-6" : ""
                }`}
                style={{ background: BG_OFF, borderColor: BORDER }}
              >
                {/* Decorative large opening quote */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-8 text-[72px] font-black leading-[1] select-none pointer-events-none"
                  style={{ color: LAVENDER, fontFamily: "Georgia, serif" }}
                >
                  &ldquo;
                </span>

                {/* Quote */}
                <blockquote className="relative z-10 mb-8">
                  <p
                    style={{
                      fontSize: "clamp(14px,1.1vw,16px)",
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: DRK_PUR,
                      maxWidth: "52ch",
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <figcaption className="mt-auto flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold"
                    style={{ background: LAVENDER, color: PURPLE }}
                    aria-hidden="true"
                  >
                    {avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: DARK, lineHeight: 1.3 }}>{name}</div>
                    <div style={{ fontSize: "12px", fontWeight: 400, color: STAT_LBL, lineHeight: 1.4 }}>{location} · {date}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. ADVISOR
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-4 sm:px-7"
        style={{ background: "#ffffff", borderBottom: `1px solid ${PUR_GRAY}` }}
      >
        <div className="max-w-[1366px] mx-auto">
          <motion.div
            className="grid md:grid-cols-2 rounded-2xl border overflow-hidden"
            style={{ borderColor: BORDER }}
            {...fadeUp(0)}
          >
            {/* Illustration panel */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "80px 24px 24px 24px",
                background: CREAM,
                minHeight: "340px",
                margin: "14px 0 14px 14px",
              }}
            >
              <Image
                src="/illustrations/care.png"
                alt="Vale care advisors"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Copy */}
            <div className="p-10 flex flex-col justify-between">
              <div>
                <p
                  className="mb-4"
                  style={{ fontSize: "14px", fontWeight: 600, color: PURPLE }}
                >
                  Free family advisor service
                </p>
                <h3
                  className="mb-4"
                  style={{
                    fontSize: "clamp(20px,2vw,26px)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: DARK,
                  }}
                >
                  Not ready to search yet?
                </h3>
                <p
                  className="mb-8"
                  style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.65, color: BODY, maxWidth: "46ch" }}
                >
                  Our care advisors are available every day. No pressure, no sales.
                  Just honest guidance when you need it most.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg text-[14px] font-bold transition-colors duration-150"
                  style={{ background: PURPLE, color: "#ffffff" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#3B229D"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = PURPLE; }}
                >
                  Speak to an advisor
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg border text-[14px] font-semibold transition-colors duration-150"
                  style={{ borderColor: BORDER, color: DRK_PUR }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = PUR_GRAY;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#B5AAFC";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = BORDER;
                  }}
                >
                  Read cost guide
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. GUIDES — list format
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-24 md:py-28"
        style={{ background: BG_OFF, borderTop: `1px solid ${PUR_GRAY}` }}
      >
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7">

          {/* Header */}
          <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14" {...fadeUp(0)}>
            <div>
              <h2
                className="mb-3"
                style={{ fontSize: "clamp(24px,2.5vw,32px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em", color: DARK }}
              >
                Guides &amp; resources
              </h2>
              <p style={{ fontSize: "clamp(15px,1.2vw,18px)", fontWeight: 400, lineHeight: 1.6, color: BODY }}>
                Practical, compassionate guides written by our family advisors.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-[14px] font-semibold transition-colors duration-150 group hover:opacity-75"
                style={{ color: PURPLE }}
              >
                View all guides
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* 2-column list */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {RESOURCES.map(({ title, tag, href, tagBg, tagColor }) => (
              <motion.div key={title} variants={staggerItem} className="group border-t first:border-t" style={{ borderColor: BORDER }}>
                <Link
                  href={href}
                  className="flex items-start justify-between gap-4 py-5 -mx-3 px-3 rounded-lg transition-colors duration-150"
                  style={{ ["--tw-bg-opacity" as string]: 1 } as React.CSSProperties}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = HOVER_LT; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className="flex-shrink-0 mt-0.5 inline-block text-[10px] font-semibold tracking-[0.05em] uppercase px-2 py-0.5 rounded-full"
                      style={{ background: tagBg, color: tagColor }}
                    >
                      {tag}
                    </span>
                    <span
                      className="text-[15px] font-medium leading-[1.4] group-hover:text-[#4F34C4] transition-colors duration-150"
                      style={{ color: DARK }}
                    >
                      {title}
                    </span>
                  </div>
                  <ArrowRight
                    className="flex-shrink-0 mt-0.5 w-4 h-4 group-hover:translate-x-0.5 transition-all duration-150"
                    style={{ color: MUTED }}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. FOR FUNERAL DIRECTORS
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-28" style={{ background: DARK }}>
        <div className="relative max-w-[1366px] mx-auto px-4 sm:px-7">

          {/* Header */}
          <motion.div className="max-w-2xl mb-14" {...fadeUp(0)}>
            <p
              className="mb-5 text-[13px] font-semibold uppercase tracking-[0.07em]"
              style={{ color: MUTED }}
            >
              For funeral directors
            </p>
            <h2
              style={{
                fontSize: "clamp(28px,3vw,40px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              Join the UK&apos;s most trusted network of directors.
            </h2>
            <p style={{ fontSize: "clamp(15px,1.2vw,18px)", fontWeight: 400, lineHeight: 1.6, color: MUTED }}>
              Join 1,200+ funeral directors on Vale. Families arrive informed, prices agreed,
              ready to enquire — not just browsing.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 mb-12 md:divide-x"
            style={{ borderColor: DK_BDR }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { stat: "Free",  label: "to list",           desc: "No setup fee. Pay per verified enquiry." },
              { stat: "4.2×",  label: "more enquiries",    desc: "For Vale Assured providers vs standard." },
              { stat: "£0",    label: "CMA tools",          desc: "Free itemised price display and compliance." },
              { stat: "Live",  label: "dashboard",          desc: "Track views, enquiries, and reviews." },
            ].map(({ stat, label, desc }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="py-6 md:px-10 first:md:pl-0 last:md:pr-0 border-t md:border-t-0"
                style={{ borderColor: DK_BDR }}
              >
                <div
                  style={{
                    fontSize: "clamp(28px,3vw,36px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    color: STAR_C,
                    marginBottom: "4px",
                  }}
                >
                  {stat}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "6px" }}>{label}</div>
                <div style={{ fontSize: "12px", fontWeight: 400, lineHeight: 1.5, color: MUTED }}>{desc}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.1)}>
            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-2.5 rounded-lg text-[14px] font-bold transition-colors duration-200 group"
              style={{ background: STAR_C, color: DARK }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#D6A314"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = STAR_C; }}
            >
              List your business
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center justify-center min-h-[44px] px-7 py-2.5 rounded-lg border text-[14px] font-semibold transition-colors duration-200"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: LAVENDER }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#9889F5";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = LAVENDER;
              }}
            >
              Book a demo
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  );
}
