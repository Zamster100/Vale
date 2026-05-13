# Vale — Visual Rebrand Specification

**Scope:** Fonts, colours, typography, and the visual chrome needed to make the colour swap not look broken. Nothing else.
**Out of scope:** Copy rewrites, page restructuring, new pages, new sections, voice/tone changes. Every existing page keeps its current copy and structure — only its visual presentation changes.
**Audience:** Claude Code (or any coding agent) executing in the `vale-web` Next.js repo.

---

## 0. TL;DR

The site currently ships in a purple + apple green palette with Inter and Instrument Serif fonts. This is off-brand. Replace it with sage + ink + terracotta on cream, with Cormorant Garamond + Lora + DM Sans. Do not touch copy. Do not restructure pages. Do not add or remove sections.

Three phases:

| Phase | Scope | Files | Effort |
|---|---|---|---|
| 1 | Replace theme foundation | `app/globals.css`, `app/layout.tsx` | Drop-in, ~5 min |
| 2 | Site-wide colour & font sweep | All `.tsx` files | Mechanical, ~30–45 min |
| 3 | Logo lockup convention + minimum-viable component cleanup | `Navigation.tsx`, footer, any custom button/card components | ~30 min |

---

## 1. The brand at a glance

| | Current (wrong) | Target |
|---|---|---|
| Primary dark | Purple `#5D3A7A` | Ink `#1C1F2A` |
| Accent | Light purple `#8A5FAA` | Sage `#5E8B73` |
| Italic emphasis | Slate `#8FA0B0` | Terracotta `#A0745A` (in h1) / Sage `#5E8B73` (in h2) |
| Body text | Olive `#3F5E2C` | Warm brown `#5A4E44` |
| Primary CTA | Apple green `#5AAE55` | Ink `#1C1F2A` |
| Page background | Cream `#F5F1E8` | Cream `#F7F3EE` |
| Display font | Instrument Serif | Cormorant Garamond |
| Lead font | Inter | Lora italic |
| Body font | Inter | DM Sans |
| Wordmark | `VALE` (all caps) | `Vale.` (mixed case, sage full stop) |

---

## 2. Canonical design tokens

### 2.1 Colour palette

| Token | Hex | Used for |
|---|---|---|
| `--ink` | `#1C1F2A` | Primary dark — CTAs, h1/h2/h3 colour, dark backgrounds, logo wordmark, nav text on light. **Not pure black.** |
| `--sage` | `#5E8B73` | Brand accent — logo full stop, verified badges, focus rings, sage CTAs (provider side). |
| `--sage-light` | `#EAF2EE` | Pale sage backgrounds, badge fills. |
| `--gold` | `#C4975A` | Secondary accent — Assured badges, premium markers. |
| `--gold-light` | `#FDF6EC` | Pale gold backgrounds. |
| `--terracotta` | `#A0745A` | Italic-emphasis colour in h1 display headlines. Only used in headings. |
| `--cream` | `#F7F3EE` | Page background. Never pure white on `<body>`. |
| `--warm` | `#FAF8F4` | Alternate section background. |
| `--mist` | `#E8E2D8` | All borders. |
| `--stone` | `#8B7E70` | Card labels, supporting metadata. |
| `--vale-text` | `#3A3228` | Lead paragraphs, headline-adjacent text. |
| `--vale-muted` | `#7A6E64` | Captions, secondary text. |
| `--vale-body` | `#5A4E44` | Default body paragraph colour. Warm brown, not grey. |

### 2.2 Typography

Three Google Fonts, each with a distinct job. No substitutions.

**Cormorant Garamond** — display only. Weights 300, 400, 500, 600 (including italics). Used for h1/h2/h3, the wordmark, large numeric displays. Default weight 300 (light). Never use 700+.

**Lora** — italic body / lead paragraphs. Weights 400, 500 with italic variants. Used for lead paragraphs and pull-quote text. Baseline: 18px, line-height 1.75.

**DM Sans** — body, UI, buttons, navigation. Weights 300, 400, 500, 600. Body default weight is 300 — this is intentional.

### 2.3 shadcn / Tailwind v4 semantic mapping

| shadcn token | Vale value |
|---|---|
| `--background` | `#F7F3EE` (cream) |
| `--foreground` | `#3A3228` |
| `--card` | `#FFFFFF` |
| `--card-foreground` | `#1C1F2A` (ink) |
| `--primary` | `#1C1F2A` (ink — CTAs) |
| `--primary-foreground` | `#FFFFFF` |
| `--secondary` | `#FAF8F4` (warm) |
| `--secondary-foreground` | `#7A6E64` |
| `--muted` | `#E8E2D8` (mist) |
| `--muted-foreground` | `#7A6E64` |
| `--accent` | `#5E8B73` (sage) |
| `--accent-foreground` | `#FFFFFF` |
| `--border` | `#E8E2D8` (mist) |
| `--input` | `#E8E2D8` |
| `--ring` | `#5E8B73` (sage focus ring) |

---

## 3. Phase 1 — Theme foundation (drop-in)

Replace these two files verbatim. After this phase, the body background, default text colour, and font loading are correct site-wide — but inline-styled components still render in old colours until Phase 2.

### 3.1 `app/globals.css` — replace entire file

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-dm-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-cormorant);
  --font-display: var(--font-cormorant);
  --font-lead: var(--font-lora);

  /* Vale brand colours */
  --color-ink: #1C1F2A;
  --color-sage: #5E8B73;
  --color-sage-light: #EAF2EE;
  --color-gold: #C4975A;
  --color-gold-light: #FDF6EC;
  --color-terracotta: #A0745A;
  --color-cream: #F7F3EE;
  --color-warm: #FAF8F4;
  --color-mist: #E8E2D8;
  --color-stone: #8B7E70;
  --color-vale-text: #3A3228;
  --color-vale-muted: #7A6E64;
  --color-vale-body: #5A4E44;

  /* shadcn semantic tokens */
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: #F7F3EE;
  --foreground: #3A3228;
  --card: #FFFFFF;
  --card-foreground: #1C1F2A;
  --popover: #FFFFFF;
  --popover-foreground: #1C1F2A;
  --primary: #1C1F2A;
  --primary-foreground: #FFFFFF;
  --secondary: #FAF8F4;
  --secondary-foreground: #7A6E64;
  --muted: #E8E2D8;
  --muted-foreground: #7A6E64;
  --accent: #5E8B73;
  --accent-foreground: #FFFFFF;
  --destructive: #dc2626;
  --border: #E8E2D8;
  --input: #E8E2D8;
  --ring: #5E8B73;
  --radius: 0.5rem;
  --chart-1: #5E8B73;
  --chart-2: #C4975A;
  --chart-3: #A0745A;
  --chart-4: #8B7E70;
  --chart-5: #1C1F2A;
  --sidebar: #FAF8F4;
  --sidebar-foreground: #3A3228;
  --sidebar-primary: #1C1F2A;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #EAF2EE;
  --sidebar-accent-foreground: #5E8B73;
  --sidebar-border: #E8E2D8;
  --sidebar-ring: #5E8B73;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background;
    font-family: var(--font-dm-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 16px;
    line-height: 1.75;
    font-weight: 300;
    color: #5A4E44;
  }
  h1 {
    font-family: var(--font-cormorant), Georgia, serif;
    font-size: clamp(36px, 4.5vw, 58px);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: #1C1F2A;
    margin-bottom: 20px;
  }
  h1 em {
    font-style: italic;
    color: #A0745A;
    font-weight: 300;
  }
  h2 {
    font-family: var(--font-cormorant), Georgia, serif;
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 400;
    line-height: 1.2;
    color: #1C1F2A;
    margin-bottom: 16px;
  }
  h2 em {
    font-style: italic;
    color: #5E8B73;
    font-weight: 400;
  }
  h3 {
    font-family: var(--font-cormorant), Georgia, serif;
    font-size: 26px;
    font-weight: 500;
    line-height: 1.3;
    color: #1C1F2A;
    margin-bottom: 12px;
  }
}

@keyframes fade-rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes question-enter {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@layer utilities {
  .animate-fade-rise          { animation: fade-rise 0.8s ease-out both; }
  .animate-fade-rise-delay    { animation: fade-rise 0.8s 0.2s ease-out both; }
  .animate-fade-rise-delay-2  { animation: fade-rise 0.8s 0.4s ease-out both; }
  .animate-question-enter     { animation: question-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
}
```

### 3.2 `app/layout.tsx` — replace entire file

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vale",
  description:
    "Compare verified funeral directors near you with transparent pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lora.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
```

### 3.3 Phase 1 verification

- Page background is `#F7F3EE` cream.
- DevTools → Network → Fonts shows Cormorant Garamond, Lora, and DM Sans loading.
- No console errors about missing font variables.
- Tailwind utilities (`bg-primary`, `text-foreground`) now resolve to the new colours.

Inline-styled components will still look wrong. Expected. Continue to Phase 2.

---

## 4. Phase 2 — Site-wide colour & font sweep

The codebase has hex values hardcoded inside `style={{ ... }}` blocks across components and pages. Replace them programmatically with the mappings below. Do not change any copy strings or page structure — colour and font references only.

### 4.1 Hex replacements

| Find | Replace with | Notes |
|---|---|---|
| `#5D3A7A` | `#1C1F2A` | Heading colour, logo. Purple → ink. |
| `#8A5FAA` | `#5E8B73` | Accents, dots, badges. Light purple → sage. |
| `#8FA0B0` | `#7A6E64` | Muted text. Slate → vale-muted. **Exception:** when inside `<em>` within an `<h1>`, use `#A0745A` (terracotta) — though the base CSS now handles this automatically via `h1 em`, so an inline override is no longer needed. Remove those inline overrides where you find them. |
| `#3F5E2C` | `#5A4E44` | Body copy. Olive → vale-body warm brown. |
| `#5AAE55` | `#1C1F2A` | Primary CTAs. Apple green → ink. |
| `#F5F1E8` | `#F7F3EE` | Page background. Slight tonal shift to match canonical cream. |
| `#C5D2DC` | `#EAF2EE` | Pale accent fills. Slate-blue → sage-light. |
| `rgba(143,160,176, X)` | `rgba(232,226,216, X)` | Borders. Slate rgb → mist rgb. |
| `rgba(197,210,220, X)` | `rgba(234,242,238, X)` | Pale fills. Slate-blue rgb → sage-light rgb. |
| `rgba(93,58,122, X)` | `rgba(28,31,42, X)` | Any rgba derived from purple → ink rgb. |
| `border: "0.5px solid rgba(143,160,176,0.3)"` and similar | `border: "1px solid #E8E2D8"` | Standardise half-pixel borders to 1px mist. |

**Important:** double-check context. Neutral values like `rgba(0,0,0,0.04)` for subtle shadows are fine — leave those alone. Only replace values that derive from the wrong brand palette above.

### 4.2 Font reference replacements

| Find | Replace with |
|---|---|
| `var(--font-inter)` | `var(--font-dm-sans)` |
| `var(--font-instrument-serif)` | `var(--font-cormorant)` |
| `"Inter"` (in font-family declarations) | `"DM Sans"` |
| `Inter,` (in font-family stacks) | `var(--font-dm-sans), ` |
| `import { Inter, ... } from "next/font/google"` | Remove (fonts now loaded centrally in `app/layout.tsx`) |
| `import { Instrument_Serif, ... } from "next/font/google"` | Remove |

### 4.3 Minimum-viable inline cleanup

While doing the sweep, normalise these visual patterns wherever you find them. These adjustments are necessary to make the colour swap not look broken — they are not new design directions, just removing visual residue of the old system.

- **All-caps `VALE` wordmark in nav/footer** → replace with the mixed-case "Vale**.**" lockup per section 5. This is the one branded element that needs a hand-touch.
- **`fontWeight: 700` or `font-bold` on h1/h2/h3 elements** → change to `fontWeight: 300` (h1) or `400` (h2) or `500` (h3). Cormorant Garamond is designed to be light in display use; rendering it bold makes it look like a different font.
- **`borderRadius` values larger than `12px` on cards, buttons, modal frames** → cap at `12px` (`rounded-xl`). Anything bigger is leftover from the previous design language.
- **Pill-shaped primary buttons (`rounded-full`)** → change to `rounded` or `rounded-md` (4–6px). Provider-side CTAs and family CTAs both use the same shape; only the colour differs.
- **Heavy drop shadows (`shadow-2xl`, `shadow-xl`) on cards or modals** → replace with `shadow-sm` for static state, or this hover treatment: `box-shadow: 0 8px 32px rgba(0,0,0,0.07)` with `transition: box-shadow 0.2s`.

Do not change anything else about layout, spacing, copy, or component structure. Even if a component looks awkward, leave the structure alone — the colour swap alone is the goal here.

### 4.4 Phase 2 verification

- Click through `/`, `/search`, `/vault/login`, `/admin/signup`, `/funeral-directors/[any-id]`. Zero purple visible anywhere.
- Primary CTAs render in ink (dark) on cream backgrounds.
- All headings render in Cormorant Garamond.
- Body copy renders in DM Sans light weight.
- Nothing renders in Inter or Instrument Serif (check via DevTools → Computed → font-family).

---

## 5. Phase 3 — Logo lockup

The brand wordmark changes from `VALE` (all-caps) to `Vale.` (mixed-case with sage full stop). Apply everywhere the wordmark appears: navigation, footer, page headers, email signatures, favicon if regenerated.

### 5.1 The lockup

```tsx
<span
  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#1C1F2A" }}
  className="text-2xl tracking-wide"
>
  Vale<span style={{ color: "#5E8B73" }}>.</span>
</span>
```

Two specific things:
- Mixed case: capital V, lowercase ale.
- The full stop is `#5E8B73` (sage), not the same colour as the rest of the wordmark. This is the brand's signature visual element.

### 5.2 Where to apply

Search the codebase for the string `VALE` (all-caps) in JSX. Each occurrence is either:

1. **The wordmark** (in `Navigation.tsx`, the footer in `app/(public)/layout.tsx`, possibly in `lib/email.ts` email templates) → replace with the lockup above.
2. **Body copy that mistakenly says "VALE"** (e.g. "VALE is a marketplace…") → replace with sentence case "Vale".

Do not change copy beyond the wordmark substitution.

### 5.3 Phase 3 verification

- Navigation logo renders as "Vale." with a green full stop, in Cormorant Garamond.
- Footer wordmark renders the same way.
- No instance of "VALE" in all-caps remains anywhere in user-facing code.

---

## 6. Anti-patterns — must not appear in shipped code

Search for and eliminate. If any of these appear after the sweep, the rebrand isn't complete.

- Hex values: `#5D3A7A`, `#8A5FAA`, `#8FA0B0`, `#3F5E2C`, `#5AAE55`, `#F5F1E8`, `#C5D2DC`, `#1a3a52`, `#d4a574` (the last two are from the deprecated `VALE_BRAND_GUIDELINES.md` palette).
- Any reference to `Inter` or `Instrument_Serif` outside `package-lock.json` (which is auto-managed and can stay).
- The string `VALE` in all-caps in user-facing JSX.
- Pure black `#000` or pure white `#fff` set on `<body>` or page-level wrappers.
- Pill-shaped (`rounded-full`) primary CTAs.
- Apple-green or kelly-green CTAs anywhere.

---

## 7. Verification checklist

After all three phases, the following must be true:

**Visual**
- [ ] Page background is `#F7F3EE` cream on every route.
- [ ] No purple, light purple, slate-blue, olive, or apple-green renders anywhere.
- [ ] Logo reads "Vale**.**" (mixed case, sage full stop) in nav and footer.
- [ ] All h1/h2/h3 render in Cormorant Garamond.
- [ ] All body copy renders in DM Sans weight 300.
- [ ] Primary CTAs are ink (`#1C1F2A`) with white text and 4–6px radius.
- [ ] All `<em>` inside `<h1>` renders in terracotta `#A0745A`.

**Functional**
- [ ] `npm run dev` starts without errors.
- [ ] `npm run build` completes without errors.
- [ ] Cormorant Garamond, Lora, and DM Sans all visible in DevTools → Network → Fonts.
- [ ] No console warnings about missing CSS variables.
- [ ] Every existing route still functions: search, vault login, admin signup, quote modal, review submission.

**Scope discipline**
- [ ] No page copy has been changed.
- [ ] No new pages have been added.
- [ ] No existing pages have been restructured.
- [ ] No components have been added or removed (only restyled).

If any item in the scope discipline section fails, the agent has gone out of scope. Roll back and try again with tighter constraints.

---

## 8. Phasing summary

Work through phases in order. After each, summarise what changed and pause before continuing. Do not skip Phase 1 — Phase 2 depends on the tokens it establishes.

| Phase | Scope | Files | Effort |
|---|---|---|---|
| 1 | Theme foundation | `globals.css`, `layout.tsx` | Drop-in, ~5 min |
| 2 | Inline colour & font sweep | All `.tsx` files | ~30–45 min |
| 3 | Logo lockup + minimum-viable cleanup | Nav, footer, email templates | ~30 min |
| 4 | Verify | All routes | Visual + functional, ~30 min |

If ambiguity arises that this spec doesn't resolve, ask before guessing. Default to: when in doubt, don't change it.
