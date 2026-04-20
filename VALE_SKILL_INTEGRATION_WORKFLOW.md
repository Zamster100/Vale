# VALE MVP Build Workflow
## Complete Skill Integration Map

**Status:** Ready to Execute  
**Skills Integrated:** UI/UX Pro Max + Design Auditor + Testing MCP  
**Timeline:** 2-3 days build + 1 day QA

---

## WORKFLOW OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: PLANNING & DESIGN SYSTEM (You've Done This)           │
│ ├─ Brand Guidelines ✓                                           │
│ ├─ MVP Specification ✓                                          │
│ └─ Design Tokens ✓                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: BUILD WITH UI/UX PRO MAX (Day 1-2)                    │
│ ├─ Prompt 1: Project Setup + Design System Generation           │
│ │  └─ UI/UX Pro Max generates tailored design system            │
│ ├─ Prompt 2-4: Build Core Features                              │
│ │  └─ UI/UX Pro Max applies 67 UI styles intelligently          │
│ └─ Prompt 5-8: Complete Features + Polish                       │
│    └─ UI/UX Pro Max ensures consistency across all pages        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: AUDIT WITH DESIGN AUDITOR (After Each Major Build)    │
│ ├─ Screenshot audit after Prompt 2 (Search page)                │
│ ├─ Code audit after Prompt 3 (Admin portal)                     │
│ ├─ Component audit after Prompt 5 (Vault)                       │
│ └─ Full audit after Prompt 8 (Polish)                           │
│                                                                  │
│ Design Auditor checks:                                           │
│ • Typography hierarchy                                           │
│ • Color contrast (WCAG AA/AAA)                                  │
│ • Spacing consistency (8-point grid)                            │
│ • Accessibility (a11y) compliance                               │
│ • Form validation patterns                                      │
│ • Mobile responsiveness                                         │
│ └─ Gives score + priority fixes                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: TEST WITH WEBAPP TESTING MCP (After Audits Pass)      │
│ ├─ Functional testing (all user flows)                          │
│ ├─ Mobile responsiveness testing                                │
│ ├─ Accessibility testing (keyboard nav, screen reader)          │
│ ├─ Performance testing (lighthouse)                             │
│ ├─ Cross-browser testing                                        │
│ └─ Security testing (XSS, CSRF)                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 5: DEPLOY TO VERCEL                                       │
│ └─ Production MVP ready                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## SKILL INTEGRATION DETAILS

### SKILL 1: UI/UX PRO MAX
**GitHub:** nextlevelbuilder/ui-ux-pro-max-skill  
**Stars:** 30.6k  
**Installation:** npm install -g uipro-cli

#### What It Does
Generates complete design systems automatically based on your project type. It includes:
- **100+ Reasoning Rules** - Industry-specific design decisions
- **67 UI Styles** - Glassmorphism, Claymorphism, Minimalism, etc.
- **96 Color Palettes** - Pre-curated for different industries
- **57 Font Pairings** - Google Fonts optimized combinations
- **25 Chart Types** - For dashboards
- **99 UX Guidelines** - Best practices

#### When to Use in VALE Workflow
```
PHASE 2: BUILD PHASE (Starts before Prompt 1)

PRE-PROMPT 1 (Optional but recommended):
└─ Run: python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
         "funeral services marketplace transparent pricing" \
         --design-system -f markdown

This generates an AI-powered design system for VALE specifically,
which you can feed to Claude Code as additional context.

DURING PROMPT 1:
Add to your Claude Code message:

"Use UI/UX Pro Max to generate design system. Reference:
- Product: Funeral Services Marketplace (UK)
- Industry: Professional Services / Healthcare / Finance
- Must have: WCAG AA compliance, trust-building aesthetics
- Mood: Professional, calm, warm, premium
- Apply the VALE Brand Guidelines for colors/typography"

RESULT: Claude Code will:
✓ Generate industry-specific design system
✓ Apply 67 UI styles intelligently
✓ Ensure best practices for this sector
✓ Create accessible, professional interface
```

#### What UI/UX Pro Max Generates
For VALE specifically, it would recommend:

```
PATTERN: Trust & Authority + Conversion-Optimized
   (Perfect for funeral services + family decision-making)

STYLE: Soft UI Evolution + Premium Feel
   (Respects the niche, doesn't look cheap or generic)

COLORS: Deep blues + warm golds + soft grays
   (Matches your brand guidelines automatically)

TYPOGRAPHY: Elegant serifs or refined sans-serif
   (Professional, trustworthy, human)

KEY EFFECTS:
   • Soft shadows (subtle depth)
   • Smooth transitions (200-300ms)
   • Gentle hover states (not jarring)

ANTI-PATTERNS TO AVOID:
   ❌ Bright neon colors
   ❌ Harsh animations
   ❌ Overly casual tone
   ❌ Morbid imagery
   ❌ Generic AI purple/pink gradients
```

#### Installation Steps
```
# Install CLI
npm install -g uipro-cli

# Initialize in your project
cd /path/to/your/vale-project
uipro init --ai claude

# Optional: Generate VALE-specific design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "funeral marketplace UK transparent pricing" \
  --design-system -f markdown -p "VALE"
```

---

### SKILL 2: DESIGN AUDITOR
**GitHub:** Ashutos1997/claude-design-auditor-skill  
**Stars:** 2  
**Installation:** Download .skill file from releases

#### What It Does
Audits designs against 17 professional categories:
1. Typography (hierarchy, contrast, sizing)
2. Color & Contrast (WCAG compliance)
3. Spacing & Layout (8-point grid)
4. Visual Hierarchy (clarity, emphasis)
5. Consistency (components, icons)
6. Accessibility (a11y, WCAG)
7. Forms & Inputs (labels, validation)
8. Motion & Animation (purpose, duration)
9. Dark Mode (elevation, saturation)
10. Responsive & Adaptive (breakpoints, touch)
11. Loading, Empty & Error States
12. Content & Microcopy (tone, labels)
13. Internationalization & RTL
14. Elevation & Shadows (depth hierarchy)
15. Iconography (families, sizing)
16. Navigation Patterns (tabs, breadcrumbs)
17. Design Tokens & Variables

**Returns:** Score out of 100 + Critical/Warning/Tip issues + Top 3 fixes

#### When to Use in VALE Workflow
```
PHASE 3: AUDIT PHASE (After each major build milestone)

CHECKPOINT 1 (After Prompt 2 - Search & Comparison):
"Audit my family search page for:
 - Typography hierarchy (H1, H2, body sizes)
 - Color contrast (especially gold on blue)
 - Spacing consistency (8-point grid)
 - Accessibility (WCAG AA minimum)
 - Mobile responsiveness (375px, 768px, 1024px)"

Design Auditor will check:
✓ Title hierarchy (32px > 24px > 16px)
✓ Text contrast ratios (should be 7:1+)
✓ Padding consistency (multiples of 8)
✓ Form field sizing (44px minimum touch)
✓ Color combo compliance

RESULT: Score (target 85+) + List of fixes

CHECKPOINT 2 (After Prompt 3 - FD Admin Portal):
"Audit the funeral director dashboard:
 - Form validation patterns
 - Real-time notification UX
 - Button state consistency
 - Accessibility compliance
 - Empty state design"

CHECKPOINT 3 (After Prompt 4 - Vault):
"Audit the pre-planning vault:
 - Multi-step form clarity
 - Progress indicators
 - File upload UX
 - Accessibility (keyboard navigation)
 - Mobile responsiveness"

CHECKPOINT 4 (After Prompt 8 - Final Polish):
"Full design audit on production-ready MVP:
 - All 17 categories
 - Target score: 90+
 - Critical: 0 issues
 - Warnings: < 5"
```

#### Installation Steps
```
1. Go to: https://github.com/Ashutos1997/claude-design-auditor-skill/releases
2. Download: design-auditor.skill (latest version)
3. Go to: claude.ai → Customize → Skills
4. Click: Upload skill
5. Select: design-auditor.skill
6. Done: Skill active in your chats
```

#### How to Use in Claude
```
Simply upload a screenshot or paste code:

"Check this screenshot for design issues"
> Paste screenshot of search page
> Design Auditor runs full audit

"Audit my React component for WCAG compliance"
> Paste your button/form component code
> Design Auditor checks accessibility

"Does this meet professional design standards?"
> Describe your design or paste code
> Design Auditor gives detailed feedback
```

---

### SKILL 3: WEBAPP TESTING MCP (Optional, for Phase 4)
**Source:** mcpmarket.com  
**Type:** MCP (Model Context Protocol)

#### What It Does
Automated testing for:
- Functional testing (user flows work)
- Responsive design (all breakpoints)
- Accessibility (a11y compliance)
- Performance (Lighthouse score)
- Cross-browser compatibility
- Security (XSS, CSRF protection)

#### When to Use in VALE Workflow
```
PHASE 4: TESTING PHASE (After Design Auditor gives green light)

STEP 1: Launch to Vercel (after design audit score > 85)
Deploy your MVP to production

STEP 2: Run Webapp Testing Suite
"Test the VALE MVP for:
 - All user flows (search → request → FD response)
 - Mobile responsiveness (375px to 1440px)
 - Keyboard navigation (tab, enter, escape)
 - Screen reader compatibility
 - Form validation
 - Error handling
 - Performance (Lighthouse target: 80+)"

RESULT:
✓ Full test report
✓ Issues by severity
✓ Performance metrics
✓ Accessibility score
✓ Recommendations
```

#### Installation & Usage
```
# Test locally before deploying
cd your-vale-project
npx @testing-library/react-hooks@latest

# Or use in Claude chat:
"Run full test suite on my Vercel deployment:
 https://vale.vercel.app"
```

---

## STEP-BY-STEP EXECUTION PLAN

### PRE-BUILD (Day 0 - 30 mins)
```
1. Install UI/UX Pro Max CLI
   npm install -g uipro-cli

2. Initialize in project
   cd /path/to/vale-project
   uipro init --ai claude

3. (Optional) Generate VALE-specific design system
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
     "funeral marketplace UK transparency" \
     --design-system -f markdown -p "VALE"

4. Install Design Auditor skill in Claude
   Download from GitHub releases → Upload to claude.ai

5. Prepare both spec documents
   - VALE_MVP_SPECIFICATION.md ✓
   - VALE_BRAND_GUIDELINES.md ✓
```

### PHASE 2: BUILD (Day 1-2)

#### Prompt 1: Setup + Search Feature
```
You: [Paste MVP Spec + Brand Guidelines]

"Using the VALE specifications and brand guidelines, build the 
family search and price comparison feature with these instructions:

Use UI/UX Pro Max to:
- Generate design system for funeral services marketplace
- Apply professional, trust-building aesthetic
- Ensure WCAG AA accessibility
- Reference the VALE brand colors (Deep Blue #1a3a52, Gold #d4a574)

Build:
1. /search page with postcode input
2. Map view with funeral director pins
3. List view with prices, ratings
4. /funeral-directors/[id] profile page

Make it look premium and professional, not generic."
```

**Output:** Family search interface

#### Run Design Audit (5 mins)
```
Claude: [Take screenshot of your /search page]

You: "Audit this screenshot for:
- Typography hierarchy
- Color contrast (WCAG AA minimum)
- Spacing consistency
- Mobile responsiveness
- Accessibility"

Design Auditor Output:
Score: 78/100
🔴 Critical: Fix gold text contrast on blue
🟡 Warning: Button padding not 8pt grid
✅ Good: Clear visual hierarchy
```

**Action:** Ask Claude Code to fix flagged issues

#### Prompt 2: Admin Portal + Fix Audit Issues
```
You: [After audit fixes] 

"Now build the funeral director admin portal:

1. /admin/signup with email/password
2. /admin/onboard form (business details + prices)
3. /admin/dashboard with quote request feed
4. Real-time metrics

Apply the same UI/UX Pro Max design system.
Fix the issues from the Design Auditor report:
- Increase button padding to 12px 24px
- Use only gold for highlights, not primary text
- Ensure all interactive elements 44px minimum"
```

**Output:** FD admin fully working

#### Run Design Audit (5 mins)
```
You: "Audit the admin dashboard for:
- Form validation patterns
- Real-time notification UX
- Button state consistency
- Accessibility
- Mobile responsiveness"

Target: Score 85+
```

#### Prompt 3: Vault Feature
```
You: "Build the pre-planning vault:

1. /vault/start - Multi-step form (5 steps)
2. /vault/view - Dashboard of saved plan
3. /vault/share/[token] - Shareable read-only link
4. File upload for documents

Use UI/UX Pro Max principles:
- Step progress indicator
- Clear form labels
- Accessible file upload
- Responsive on mobile"
```

**Output:** Vault working end-to-end

#### Run Design Audit (5 mins)
```
You: "Audit the vault form:
- Multi-step form clarity
- Progress indicator visibility
- File upload UX
- Accessibility (keyboard nav)
- Mobile responsiveness"

Target: Score 85+
```

#### Prompts 4-8: Complete Build
Continue building remaining features with same pattern:
- Build feature
- Run Design Audit
- Fix issues
- Move to next

### PHASE 3: FINAL AUDIT (Day 2 End)

```
You: "Run COMPLETE design audit on entire MVP:

Check all 17 categories:
1. Typography
2. Color & Contrast
3. Spacing & Layout
4. Visual Hierarchy
5. Consistency
6. Accessibility
7. Forms & Inputs
8. Motion & Animation
9. Dark Mode (optional)
10. Responsive & Adaptive
11. Loading/Empty/Error States
12. Content & Microcopy
13. Internationalization
14. Elevation & Shadows
15. Iconography
16. Navigation Patterns
17. Design Tokens

Target Score: 90+ (Critical: 0, Warnings: <5)"

Design Auditor Output:
✓ Overall Score: 92/100
✓ 0 Critical Issues
✓ 3 Minor Warnings
✓ Top fixes: [if any]
```

### PHASE 4: TESTING (Day 3)

```
You: "Deploy to Vercel, then run full test suite:

Functional Tests:
- Cold family flow (search → compare → request → confirmation)
- FD flow (signup → add prices → see requests → mark contacted)
- Vault flow (create → save → share → view)

Responsive Tests:
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)

Accessibility Tests:
- Keyboard navigation (tab, enter, escape)
- Screen reader (VoiceOver, NVDA)
- Focus states visible
- Touch targets 44px+
- Color contrast WCAG AA

Performance Tests:
- Lighthouse: 80+ score
- First Contentful Paint: < 1.5s
- Mobile load: < 3s

Security Tests:
- No console errors
- Form validation server-side
- XSS protection
- CSRF tokens"

Webapp Testing Output:
✓ All flows working
✓ Responsive 375px-1440px
✓ Accessibility: WCAG AA
✓ Performance: 88 Lighthouse
✓ No security issues
```

### PHASE 5: READY FOR SALES (Day 3 End)

```
✓ Beautiful, professional MVP
✓ Design audit score: 90+
✓ All tests passing
✓ WCAG AA accessible
✓ Mobile-responsive
✓ Ready to show funeral directors
```

---

## WHAT EACH SKILL DOES IN VALE CONTEXT

### UI/UX Pro Max for VALE
```
Industry Rules Applied:
✓ Professional Services category
✓ Trust-building aesthetic
✓ Soft UI Evolution style
✓ Deep blue + gold palette
✓ Serene, calm animations
✓ WCAG AA accessibility built-in

Prevents:
❌ Generic AI aesthetics
❌ Neon colors (unprofessional)
❌ Harsh animations (disrespectful)
❌ Casual tone (wrong for niche)
❌ Poor accessibility (illegal)

Ensures:
✓ Industry-appropriate design
✓ Trust-building visual language
✓ Consistent design system
✓ Professional polish
✓ Accessible to all users
```

### Design Auditor for VALE
```
Catches Common Mistakes:
❌ Text contrast too low (unreadable)
❌ Buttons too small (can't click on mobile)
❌ Inconsistent spacing (looks amateur)
❌ Missing form labels (inaccessible)
❌ No focus states (keyboard users locked out)

Ensures:
✓ 7:1 text contrast (exceeds WCAG AA)
✓ 44px minimum touch targets
✓ 8-point grid spacing
✓ All forms labeled + validated
✓ Keyboard navigation works
✓ Screen readers supported

Score Targets:
- 80+: Launch ready (acceptable)
- 85+: Professional (good)
- 90+: Premium (excellent)
```

### Webapp Testing for VALE
```
Validates Real-World Usage:
✓ Actual user flows work end-to-end
✓ Mobile doesn't break
✓ Keyboard users can navigate
✓ Screen reader users understand it
✓ Performance acceptable
✓ No security vulnerabilities

Results in:
✓ Confidence it works in real world
✓ No "works on my computer" problems
✓ Ready for production
✓ Funeral directors can actually use it
```

---

## QUICK REFERENCE: WHEN TO USE EACH SKILL

| When | Skill | Action |
|------|-------|--------|
| **Day 1 Morning** | UI/UX Pro Max | Generate design system |
| **After Prompt 2** | Design Auditor | Audit search page |
| **After Prompt 3** | Design Auditor | Audit admin portal |
| **After Prompt 4** | Design Auditor | Audit vault |
| **After Prompt 8** | Design Auditor | Full audit (target 90+) |
| **Day 3 Morning** | Deploy to Vercel | Push MVP to production |
| **Day 3 Afternoon** | Webapp Testing | Run full test suite |
| **Day 3 Evening** | Ready | Launch to funeral directors |

---

## EXPECTED OUTCOMES

### Design Quality
- **With UI/UX Pro Max:** Professional, industry-appropriate design
- **Without:** Generic, could look any other startup

### Accessibility
- **With Design Auditor:** WCAG AA compliant, 90+ score
- **Without:** Contrast fails, forms broken, keyboard navigation broken

### Functionality
- **With Webapp Testing:** All flows proven to work
- **Without:** "It works for me" but breaks for others

### Time Saved
- **UI/UX Pro Max:** Eliminates guessing, generates system → 2-3 hours saved
- **Design Auditor:** Catches 95% of issues early → 2-3 hours saved
- **Webapp Testing:** Automated testing → 3-4 hours saved
- **Total:** 7-10 hours saved vs. manual QA

---

## SUMMARY

**The Workflow:**
1. Build with UI/UX Pro Max (intelligent design system)
2. Audit with Design Auditor (catch issues early)
3. Fix + iterate
4. Deploy
5. Test with Webapp Testing (validate everything)
6. Launch

**Result:** Professional, accessible, tested MVP that looks premium and works flawlessly.

**Timeline:** 3 days build + audit + test = production-ready VALE

**Next Steps:**
1. Install UI/UX Pro Max CLI
2. Install Design Auditor skill
3. Prepare your two spec documents
4. Open Claude Code
5. Run Prompt 1 with the workflow instructions
6. Start building!

---

**You're ready. Let's build something beautiful.** 🚀
