# VALE MVP Specification
## The UK's Funeral Services Marketplace
**Build Timeline:** 2-3 days  
**Status:** Ready for Claude Code  
**Last Updated:** April 2026

---

## TABLE OF CONTENTS
1. [Project Overview](#project-overview)
2. [Design System](#design-system)
3. [Tech Stack](#tech-stack)
4. [Database Schema](#database-schema)
5. [Features & Implementation](#features--implementation)
6. [User Flows](#user-flows)
7. [Build Phases](#build-phases)
8. [API Endpoints](#api-endpoints)
9. [Prompts for Claude Code](#prompts-for-claude-code)
10. [Testing Checklist](#testing-checklist)

---

## PROJECT OVERVIEW

### Mission
VALE is a transparent funeral services marketplace that connects grieving families with verified funeral directors, enabling real-time price comparison and informed decision-making at life's most vulnerable moment.

### Core Value Propositions

**For Families:**
- See real, comparable prices upfront (no hidden fees)
- Compare multiple providers side-by-side
- Read verified reviews from real families
- Plan ahead with the Vault (secure wishes document)
- Get a 5x conversion improvement at point of need

**For Funeral Directors:**
- Free to list, commission-only model (3.5% standard, 2% Assured)
- Real-time dashboard showing leads and conversions
- Verified reviews build reputation
- Price benchmarking against competitors
- Network effect: more families = more leads

### Target MVP Users
- **Phase 1:** Funeral directors in London, Manchester, Birmingham
- **Phase 1:** Families searching for funeral services (high intent)
- **Stretch:** Pre-planners aged 55+ (building vault registry)

---

## DESIGN SYSTEM

### Color Palette

```
Primary: Deep Slate Blue
  - Hex: #1a3a52
  - RGB: 26, 58, 82
  - Usage: Main headers, CTAs, navigation
  - Rationale: Trust, stability, professionalism (like healthcare/legal)

Secondary: Warm Gray
  - Hex: #6b7280
  - RGB: 107, 114, 128
  - Usage: Secondary text, borders, dividers
  - Rationale: Calm, neutral, respectful

Accent: Soft Gold
  - Hex: #d4a574
  - RGB: 212, 165, 116
  - Usage: Highlights, badges, "Assured" status, hover states
  - Rationale: Dignity, quality, premium feel (luxury funeral homes use gold)

Background Light:
  - Hex: #f9fafb
  - RGB: 249, 250, 251
  - Usage: Page backgrounds, card backgrounds
  - Rationale: Clean, modern, reduces eye strain

Text Primary: Near Black
  - Hex: #111827
  - RGB: 17, 24, 39
  - Usage: Body text, primary content
  - Rationale: High contrast, accessible

Text Secondary: Medium Gray
  - Hex: #6b7280
  - RGB: 107, 114, 128
  - Usage: Secondary text, metadata, timestamps
  - Rationale: Visual hierarchy without harsh contrast

Error / Attention:
  - Hex: #dc2626
  - RGB: 220, 38, 38
  - Usage: Errors, warnings, urgent alerts

Success:
  - Hex: #059669
  - RGB: 5, 150, 105
  - Usage: Confirmation, successful actions
```

### Typography

**Font Family:** Inter (default Next.js web font)
```css
/* Headings: Bold, large, clear */
h1 {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: #1a3a52;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1a3a52;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

/* Body: Clean, readable, comfortable */
body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #111827;
}

/* Small text: Secondary info */
small, .text-sm {
  font-size: 14px;
  color: #6b7280;
}
```

### Component Style Guidelines

**Buttons:**
- Primary Button: Deep Blue (#1a3a52) text on Light Gray (#f9fafb), border, 4px border-radius
- Primary Button Hover: Deep Blue background, white text
- Secondary Button: Warm Gray (#6b7280) text, light gray background
- Accent Button: Gold (#d4a574) background, text color #1a3a52

**Cards:**
- White background (#ffffff)
- Subtle border: 1px solid #e5e7eb
- Box shadow: 0 1px 3px rgba(0,0,0,0.1)
- Border-radius: 6px
- Padding: 24px default, 16px compact

**Inputs:**
- Border: 1px solid #d1d5db (light gray)
- Background: White
- Focus state: 2px solid #d4a574 (gold)
- Border-radius: 4px
- Padding: 12px 16px

**Badge:**
- Gold background (#d4a574)
- Dark text (#1a3a52)
- Border-radius: 4px
- Padding: 4px 12px
- Font-size: 12px
- Font-weight: 600
- Text: "Assured" or "Verified"

**Comparison Table:**
- Header row: Deep blue (#1a3a52) background, white text
- Alternating row colors: White and very light gray (#f3f4f6)
- Price cells: Highlighted with subtle gold tint (#faf6f1)
- Borders: 1px solid #e5e7eb

---

## TECH STACK

### Frontend
```
Framework: Next.js 14+ (app router)
UI Components: Shadcn/ui (pre-built, polished components)
Styling: Tailwind CSS (utility-first, matches our palette)
State Management: Zustand (lightweight, simpler than Redux)
Maps: Leaflet + React-Leaflet (free, open-source)
Forms: React Hook Form + Zod (validation)
HTTP Client: Axios or fetch
Icons: Lucide React (matches shadcn aesthetic)
Animation: Framer Motion (optional, subtle transitions)
```

### Backend
```
Database: Supabase (PostgreSQL, built-in auth, realtime)
  Alternative: Firebase (simpler, no backend code needed)
File Storage: Supabase Storage
Authentication: Supabase Auth (email/password + Google OAuth)
Emails: Resend API (send from vale.co.uk domain)
Scheduling: None yet (can use Vercel Cron later)
```

### Hosting & Deployment
```
Frontend Hosting: Vercel (free tier, auto-deploy from GitHub)
Database: Supabase Cloud (free tier, 500MB)
Domain: vale.co.uk (registered with Namecheap or similar)
DNS: Point to Vercel
SSL: Automatic (Vercel + Supabase both provide)
```

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key (backend only)
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=optional (for advanced mapping)
NODE_ENV=production|development
```

---

## DATABASE SCHEMA

### Table: Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  user_type ENUM ('family', 'funeral_director', 'admin'),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);
```

### Table: Funeral Directors (FD Business Profiles)
```sql
CREATE TABLE funeral_directors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  address TEXT NOT NULL,
  postcode TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  assured_subscription BOOLEAN DEFAULT FALSE,
  assured_expires_at TIMESTAMP,
  average_rating DECIMAL(3, 2) DEFAULT NULL,
  review_count INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table: Price Lists
```sql
CREATE TABLE price_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funeral_director_id UUID NOT NULL REFERENCES funeral_directors(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  service_type ENUM ('cremation', 'burial', 'direct_cremation', 'repatriation', 'other'),
  price_pounds INTEGER NOT NULL,
  description TEXT,
  includes TEXT[], -- array of included items
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_price_lists_funeral_director_id ON price_lists(funeral_director_id);
```

### Table: Quote Requests
```sql
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  funeral_director_id UUID NOT NULL REFERENCES funeral_directors(id) ON DELETE CASCADE,
  family_name TEXT NOT NULL,
  family_email TEXT NOT NULL,
  family_phone TEXT,
  service_type TEXT,
  location_postcode TEXT,
  message TEXT,
  status ENUM ('pending', 'contacted', 'booked', 'declined') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  contacted_at TIMESTAMP,
  booked_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_quote_requests_funeral_director_id ON quote_requests(funeral_director_id);
CREATE INDEX idx_quote_requests_family_user_id ON quote_requests(family_user_id);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
```

### Table: Vaults (Pre-Planning)
```sql
CREATE TABLE vaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT,
  date_of_birth DATE,
  
  -- Wishes
  service_type ENUM ('cremation', 'burial', 'direct_cremation'),
  service_size ENUM ('small_intimate', 'medium_30', 'large_100', 'very_large_200'),
  religious_preference TEXT,
  
  -- Service Details
  music_selections TEXT[], -- JSON array of song titles/artists
  readings TEXT[], -- poems, scriptures, etc
  flowers_preference TEXT,
  guest_dietary_restrictions TEXT,
  
  -- Financial Info
  insurance_policy_number TEXT,
  insurance_provider TEXT,
  bank_account_reference TEXT,
  will_location TEXT,
  solicitor_name TEXT,
  solicitor_phone TEXT,
  
  -- Documents
  will_document_url TEXT,
  advance_care_plan_url TEXT,
  power_of_attorney_url TEXT,
  
  -- Sharing
  shared_with_family TEXT[], -- array of email addresses
  share_token TEXT UNIQUE, -- for public sharing
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_vaults_user_id ON vaults(user_id);
CREATE INDEX idx_vaults_share_token ON vaults(share_token);
```

### Table: Reviews & Ratings
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funeral_director_id UUID NOT NULL REFERENCES funeral_directors(id) ON DELETE CASCADE,
  quote_request_id UUID REFERENCES quote_requests(id) ON DELETE SET NULL,
  family_name TEXT NOT NULL,
  family_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  verified BOOLEAN DEFAULT TRUE, -- only families who actually booked can review
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_reviews_funeral_director_id ON reviews(funeral_director_id);
```

### Table: Analytics (Aggregated Data)
```sql
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funeral_director_id UUID REFERENCES funeral_directors(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value INTEGER DEFAULT 0,
  metric_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- For tracking: profile_views, quote_requests, conversions, etc
CREATE INDEX idx_analytics_funeral_director_id ON analytics(funeral_director_id);
CREATE INDEX idx_analytics_metric_date ON analytics(metric_date);
```

---

## FEATURES & IMPLEMENTATION

### FEATURE 1: Family Search & Price Comparison

#### What Users See
- Landing page with search bar: "Find a funeral director near you"
- Input: Postcode + Service Type (Cremation / Burial / Direct Cremation)
- Results: Map view + List view showing providers within 20km
- Click provider → Full profile with prices, reviews, contact

#### Technical Implementation

**Page: `/search`**
```
GET /api/funeral-directors?postcode=SW1A1AA&service_type=cremation&radius=20
Returns: Array of FDs with average prices for that service

GET /api/funeral-directors/[id]
Returns: Full FD profile + all price lists + reviews
```

**Features:**
- Real-time map with pins (Leaflet)
- Sortable list (by price, rating, distance)
- Quick price filter ($1000-$2000, etc)
- "Request Quote" button (no login required initially)
- "Save for Later" (requires login)

**Database Queries:**
```sql
-- Find funeral directors near postcode
SELECT fd.*, 
  AVG(pl.price_pounds) as avg_price,
  fd.average_rating,
  COUNT(r.id) as review_count
FROM funeral_directors fd
LEFT JOIN price_lists pl ON fd.id = pl.funeral_director_id
LEFT JOIN reviews r ON fd.id = r.funeral_director_id
WHERE ST_Distance_Sphere(
  ST_Point(fd.longitude, fd.latitude),
  ST_Point($longitude, $latitude)
) <= $radius
GROUP BY fd.id
ORDER BY avg_price ASC;
```

**Hardcoded Data (for MVP launch):**
```json
{
  "funeral_directors": [
    {
      "id": "fd_001",
      "business_name": "Smith & Sons Funerals",
      "address": "123 High Street, London SW1A 1AA",
      "postcode": "SW1A1AA",
      "phone": "020 7946 0958",
      "latitude": 51.5035,
      "longitude": -0.1275,
      "average_rating": 4.8,
      "review_count": 24,
      "prices": [
        {
          "service_name": "Simple Attended Funeral",
          "service_type": "cremation",
          "price_pounds": 3200,
          "includes": ["Coffin", "Transport", "Cremation", "Service"]
        },
        {
          "service_name": "Direct Cremation",
          "service_type": "direct_cremation",
          "price_pounds": 895,
          "includes": ["Cremation only"]
        }
      ]
    },
    // ... 9 more realistic examples
  ]
}
```

---

### FEATURE 2: Funeral Director Admin Portal

#### What FD Users See
1. **Signup/Login Page** (`/admin/login`)
   - Email + password
   - "Sign up as a funeral director"
   - "Forgot password" link

2. **Onboarding Flow** (`/admin/onboard`)
   - Business details: Name, address, postcode, phone
   - Services offered: Checkboxes (Cremation, Burial, Direct Cremation, Repatriation, Other)
   - Add price list: Simple form or CSV upload
   - Verification: Terms of service, NAFD/SAIF confirmation

3. **Dashboard** (`/admin/dashboard`)
   - Key metrics: Profile views (today/week/month)
   - Quote requests feed (real-time): Shows family name, service type, date
   - Conversion rate: % of views → requests → bookings
   - Benchmark: Compare your avg price to others in your area
   - "Manage Prices" button
   - "Switch to Assured" button (upgrade subscription)

#### Technical Implementation

**Pages:**
```
/admin/login          -- Email/password auth
/admin/signup         -- Registration
/admin/dashboard      -- Main dashboard
/admin/prices         -- Edit/add prices
/admin/settings       -- Account settings
/admin/upgrade        -- Upgrade to Assured subscription
```

**Real-time Features:**
- Supabase realtime subscription: When a quote request comes in, FD's dashboard updates instantly (no refresh)
- Email notification: Also send email via Resend API (fallback if they're not looking at dashboard)

**Dashboard Calculations:**
```sql
-- Profile Views
SELECT COUNT(*) FROM analytics 
WHERE funeral_director_id = $id 
AND metric_name = 'profile_view' 
AND metric_date >= NOW() - INTERVAL '7 days';

-- Quote Requests
SELECT * FROM quote_requests 
WHERE funeral_director_id = $id 
ORDER BY created_at DESC 
LIMIT 20;

-- Conversion Rate
SELECT 
  (COUNT(CASE WHEN status = 'booked' THEN 1 END)::float 
   / COUNT(*)::float) * 100 as conversion_rate
FROM quote_requests 
WHERE funeral_director_id = $id;

-- Benchmark Comparison
SELECT 
  AVG(price_pounds) as category_avg,
  MIN(price_pounds) as cheapest,
  MAX(price_pounds) as most_expensive
FROM price_lists 
WHERE service_type = $service_type 
AND funeral_director_id IN (
  SELECT id FROM funeral_directors 
  WHERE postcode ILIKE $postcode_prefix || '%'
);
```

---

### FEATURE 3: The Vault (Pre-Planning)

#### What Users See
1. **Vault Start** (`/vault/start`)
   - Multi-step form (5 steps total)
   - Progress bar showing completion
   - Can save and come back later

2. **Step 1: Your Wishes**
   - Full name
   - Date of birth
   - Service type: Radio buttons (Cremation / Burial / Direct Cremation)
   - Service size: Radio buttons (Intimate / Small group / Medium gathering / Large ceremony)
   - Religious preference: Dropdown + text field

3. **Step 2: Service Details**
   - Music selections: Add/remove songs
   - Readings: Bible verses, poems, personal readings
   - Flowers: Text field (what you'd like)
   - Guest considerations: Dietary restrictions, accessibility needs

4. **Step 3: Financial Info**
   - Insurance provider + policy number
   - Bank account reference (for cost coverage)
   - Will location
   - Solicitor name + phone

5. **Step 4: Documents**
   - Upload will (PDF)
   - Upload advance care plan
   - Upload power of attorney
   - Drag-and-drop file uploads

6. **Step 5: Review & Share**
   - Summary of all saved info
   - "Share with family" button
   - Creates unique shareable link
   - Send link via email to family members

#### Dashboard View (`/vault/view`)
- Displays all saved information
- "Edit" button for each section
- "Share" button
- "Download as PDF" button
- "When you need us" section (shows recommended providers based on preferences)

#### Shareable Link View (`/vault/share/[share_token]`)
- Read-only view of someone's plan
- No edits allowed (family can't mess with it)
- Clean, printable layout
- "Contact a funeral director" button

#### Technical Implementation

**Supabase Storage:**
- Uploaded files stored in `vaults/` bucket
- Files: `[user_id]_[document_type]_[timestamp].pdf`

**Email Sharing:**
```
To: sibling@email.com
Subject: [Name] has shared their funeral plan with you

Hi [Sibling],
[Name] has created a funeral plan and wants you to have access.
View it here: https://vale.co.uk/vault/share/abc123def456

This will help the family if [Name] needs to arrange their funeral.
```
```

---

### FEATURE 4: Quote Request System (End-to-End)

#### Family Side (Request Quote)
1. Family searches → finds FD they like → clicks "Request Quote"
2. Modal pops up: "Get a quote from Smith & Sons"
3. Simple form:
   - Your name (required)
   - Your email (required)
   - Your phone (optional)
   - Service type (dropdown)
   - Message: "Tell them about your needs..." (optional)
4. Click "Send Quote Request"
5. Family gets email: "We've sent your request to Smith & Sons. They'll be in touch within 24 hours."

#### FD Side (Receive & Respond)
1. Real-time dashboard update: "New quote request from Sarah"
2. FD sees:
   - Family name, email, phone
   - Service type they're interested in
   - Message (if provided)
   - Link to call/email them
3. FD clicks "Mark as Contacted" → timestamp recorded
4. FD responds however they want (phone, email, etc)
5. Status updates: Pending → Contacted → Booked → Complete

#### Database Changes
```sql
INSERT INTO quote_requests (
  family_name, family_email, family_phone, 
  service_type, funeral_director_id, message, status
) VALUES (
  'Sarah Jones', 'sarah@email.com', '07700900123',
  'cremation', 'fd_001', 'We need something affordable', 'pending'
);

INSERT INTO analytics (funeral_director_id, metric_name, metric_value)
VALUES ('fd_001', 'quote_request', 1)
ON CONFLICT (funeral_director_id, metric_name, metric_date)
DO UPDATE SET metric_value = metric_value + 1;
```

#### Email Sent to FD (via Resend)
```
To: fd@smithsons.co.uk
Subject: 🔔 New quote request from Sarah Jones

Smith & Sons has received a new quote request!

Customer Details:
- Name: Sarah Jones
- Email: sarah@email.com
- Phone: 07700900123
- Service: Simple Cremation
- Message: "We need something affordable"

Quick Actions:
[Call Sarah] [Email Sarah] [Mark as Contacted]

View in dashboard: https://vale.co.uk/admin/dashboard
```

#### Family Confirmation Email
```
To: sarah@email.com
Subject: ✓ Your quote request has been sent

Hi Sarah,

We've sent your request to Smith & Sons Funerals.
They typically respond within 24 hours.

Your request details:
- Service: Simple Cremation
- FD: Smith & Sons, London
- Reference: QR-20260416-001

If you'd like to contact them directly:
Phone: 020 7946 0958
Email: info@smithsons.co.uk

View your saved plan: https://vale.co.uk/vault/view
```

---

### FEATURE 5: FD Dashboard Analytics

#### Key Metrics Displayed
1. **This Week:**
   - Profile views: "47 families viewed your profile"
   - Quote requests: "3 new requests"
   - Conversion rate: "67% of requests → contacted"

2. **Benchmark:**
   - Your avg price vs. area average: "You're £200 below average (good!)"
   - Rating: "4.8/5 (24 reviews)" vs area avg "4.2/5"

3. **Trends:**
   - Graph: Profile views over last 30 days (line chart)
   - Graph: Quote requests over last 30 days
   - Most popular service: "Direct cremation (45% of requests)"

4. **Call to Action:**
   - "Upgrade to Assured for 10x more visibility" (if not subscribed)
   - "You're just 2 reviews away from a gold badge"

#### Technical Implementation
```sql
-- Real-time metrics calculated on dashboard load:

SELECT 
  COUNT(CASE WHEN metric_date >= CURRENT_DATE - 7 THEN 1 END) as views_this_week,
  COUNT(CASE WHEN metric_date >= CURRENT_DATE THEN 1 END) as views_today
FROM analytics 
WHERE funeral_director_id = $id AND metric_name = 'profile_view';

SELECT 
  COUNT(CASE WHEN status = 'contacted' THEN 1 END)::float / COUNT(*)::float * 100 
  as conversion_rate
FROM quote_requests 
WHERE funeral_director_id = $id AND created_at >= CURRENT_DATE - 7;
```

---

### FEATURE 6: Funeral Price Intelligence Index

#### Public-Facing Page (`/price-index`)
Shows:
- "Average simple funeral cost in London: £4,287"
- "Cheapest in your search: £2,800"
- "Most expensive: £6,200"
- Breakdown by service type (Cremation avg £2,100, Burial avg £5,200, Direct £895)
- Regional comparison (London vs Manchester vs Birmingham, etc)
- Trends: "Prices up 3% year-on-year"

#### Technical Implementation
```sql
-- Price statistics
SELECT 
  postcode_region,
  service_type,
  COUNT(*) as count,
  AVG(price_pounds) as avg_price,
  MIN(price_pounds) as min_price,
  MAX(price_pounds) as max_price,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price_pounds) as median
FROM price_lists pl
JOIN funeral_directors fd ON pl.funeral_director_id = fd.id
GROUP BY postcode_region, service_type;
```

#### PR Angle
- Annual "Funeral Price Index Report"
- Press release: "UK funeral costs up 3% YoY, transparency saves families £500+"
- Newsworthy hook = get press coverage (free marketing)

---

### FEATURE 7: Reviews & Ratings

#### How Reviews Work
1. FD completes a quote request → marks as "Booked"
2. System records booking date + family email
3. After 7 days, family gets email: "How was your experience with Smith & Sons?"
4. Family clicks link → 1-5 star rating + optional comment
5. Review appears on FD's profile (only if they actually booked)

#### Display on FD Profile
```
⭐⭐⭐⭐⭐ 4.8/5 (24 reviews)

Recent reviews:
- "Professional, compassionate, and affordable" - Janet M. (5 stars)
- "They made a difficult time easier" - David & Carol (5 stars)
- "Good service, prices were competitive" - Anonymous (4 stars)

[View all reviews]
```

#### Database
```sql
INSERT INTO reviews (
  funeral_director_id, quote_request_id, 
  family_name, rating, review_text, verified
) VALUES ($fd_id, $request_id, 'Sarah Jones', 5, 'Excellent service', true);

-- Update FD average rating
UPDATE funeral_directors 
SET average_rating = (
  SELECT AVG(rating) FROM reviews 
  WHERE funeral_director_id = $id
),
review_count = (
  SELECT COUNT(*) FROM reviews 
  WHERE funeral_director_id = $id
)
WHERE id = $id;
```

---

### FEATURE 8: Pre-Planning Conversion Funnel

#### How It Works
1. **Warm Lead Creation:**
   - Vault users are registered in system with preferences already known
   - When death occurs, family tells VALE (simple form: "I need to arrange a funeral")
   - System pulls up saved plan automatically

2. **Smart Provider Matching:**
   - User's preferences (cremation, small service, budget) are matched to providers
   - Shows top 3 providers that fit their needs exactly
   - Removes decision paralysis

3. **One-Click Booking:**
   - Family clicks "Get quotes" → quote requests sent to pre-filtered providers
   - No searching, no comparison → everything already decided

#### Implementation
```javascript
// When family accesses vault at point of need:
const vault = await getVault(userId);
const matchedProviders = await findProviders({
  service_type: vault.service_type,
  location_postcode: vault.postcode,
  budget: estimateBudget(vault.service_type), // approx cost
  religion: vault.religious_preference
});

// Show 3 matched providers with "Request Quote" pre-filled
```

---

## USER FLOWS

### Flow 1: Family Discovers & Compares (Cold Traffic)
```
1. Family Googles: "Funeral directors near me London"
2. Lands on: vale.co.uk/search
3. Enters postcode: "SW1A 1AA"
4. Sees: 8 providers near them, prices side-by-side
5. Clicks provider: Reads 5-star reviews
6. Clicks "Request Quote": Modal, fills name/email/message
7. Confirmation: "Smith & Sons will contact you"
8. FD receives notification: "New quote request"
9. FD calls family, arranges funeral
10. Family rates experience: 5 stars on VALE
```

### Flow 2: Family Pre-Plans (Warm Lead)
```
1. Family member (age 60) visits vale.co.uk
2. Clicks "Plan Ahead" → directed to /vault/start
3. Fills multi-step form: Wants cremation, no religious service, loves jazz
4. Uploads will + insurance docs
5. Shares vault with siblings via link
6. 5 years later: That family member passes away
7. Sibling calls VALE: "My [parent] has a plan with you"
8. VALE pulls up saved plan automatically
9. Shows 3 matching providers: "Based on their wishes"
10. Sibling requests quotes
11. FD responds, arranges funeral
12. Done: Zero decision paralysis, 5x faster booking
```

### Flow 3: Funeral Director Onboards
```
1. FD visits vale.co.uk/admin/signup
2. Enters: Business name, address, phone
3. Adds prices: Cremation £3200, Direct £895, Burial £5200
4. Confirms: "I'm verified with NAFD"
5. Goes live instantly: Starts getting profile views
6. Week 1: Receives 2 quote requests
7. FD contacts families, books both
8. Sees dashboard: "2/2 quote requests → booked (100%!)"
9. Updates pricing (prices went up)
10. Considers Assured upgrade: "Pay £79/month, get 2% commission instead of 3.5%"
```

---

## BUILD PHASES

### PHASE 1 (Day 1 Morning - 4 hours): Search & Price Comparison
**Deliverable:** Family can search for funeral directors and compare prices

**Build Steps:**
1. Set up Next.js project, Tailwind, Shadcn components
2. Create hardcoded funeral director data (10 providers in London/Manchester/Birmingham)
3. Build `/search` page with postcode input
4. Build map view (Leaflet + React-Leaflet)
5. Build list view with prices, ratings, filters
6. Build `/funeral-directors/[id]` profile page with full price list
7. Add "Request Quote" button (frontend only, no backend yet)

**Don't worry about:**
- Database (hardcoded data is fine)
- Authentication (add later)
- Emails (log to console for now)
- Payment (not in MVP)

---

### PHASE 2 (Day 1 Afternoon - 4 hours): FD Admin Portal
**Deliverable:** Funeral directors can sign up, add prices, see dashboard

**Build Steps:**
1. Set up Supabase project (or Firebase)
2. Create auth: Signup/Login pages
3. Build `/admin/onboard` form: Business details + price entry
4. Build `/admin/dashboard` with hardcoded metrics
5. Create quote request form (integrate with Phase 1 search)
6. Log quote requests to database
7. Build quote request feed on FD dashboard

**Don't worry about:**
- Real-time updates (can add Supabase realtime later)
- Emails (log to console)
- Complex analytics (basic counters only)

---

### PHASE 3 (Day 2 Morning - 3 hours): The Vault
**Deliverable:** Families can create & save pre-planning documents

**Build Steps:**
1. Create `/vault/start` multi-step form (5 steps)
2. Store vault data in database
3. Create `/vault/view` dashboard showing saved plan
4. Create `/vault/share/[token]` shareable read-only link
5. Add file upload (documents to Supabase Storage)
6. Add "Share with family" button + email generation (log to console)

**Don't worry about:**
- Vault matching logic (can add Phase 4)
- Complex document management (basic PDF upload is enough)

---

### PHASE 4 (Day 2 Afternoon - 3 hours): Polish & Integration
**Deliverable:** End-to-end flow works; app is presentable

**Build Steps:**
1. Add real Resend API for emails (replace console logs)
2. Implement real-time dashboard updates (Supabase realtime)
3. Add reviews page (display hardcoded reviews first)
4. Add price intelligence dashboard (`/price-index`)
5. Polish UI: Colors, spacing, typography (follow design system)
6. Add mobile responsiveness (Tailwind mobile classes)
7. Fix bugs, test end-to-end flows

**Test flows:**
- Cold search → Request quote → FD receives → FD responds
- Family pre-plans → Creates vault → Shares with sibling
- FD signs up → Adds prices → Sees quote requests → Marks booked

---

## API ENDPOINTS

### Authentication Endpoints
```
POST /api/auth/signup
  Body: { email, password, full_name, user_type }
  Returns: { user_id, token }

POST /api/auth/login
  Body: { email, password }
  Returns: { user_id, token, user_type }

POST /api/auth/logout
  Returns: { success: true }
```

### Funeral Director Endpoints
```
GET /api/funeral-directors?postcode=SW1A1AA&service_type=cremation&radius=20
  Returns: [{ id, name, address, phone, avg_price, rating, review_count }]

GET /api/funeral-directors/[id]
  Returns: { fd_profile, price_lists, reviews, average_rating }

POST /api/funeral-directors (requires auth)
  Body: { business_name, address, postcode, phone, email }
  Returns: { funeral_director_id }

PUT /api/funeral-directors/[id] (requires auth)
  Body: { any_fields_to_update }
  Returns: { updated }

GET /api/funeral-directors/[id]/dashboard (requires auth)
  Returns: { profile_views, quote_requests, conversion_rate, benchmarks }
```

### Price List Endpoints
```
POST /api/price-lists (requires auth)
  Body: { funeral_director_id, service_name, service_type, price_pounds, includes[] }
  Returns: { price_list_id }

PUT /api/price-lists/[id] (requires auth)
  Body: { any_fields }
  Returns: { updated }

GET /api/price-lists?funeral_director_id=fd_001
  Returns: [{ service_name, service_type, price_pounds }]
```

### Quote Request Endpoints
```
POST /api/quote-requests
  Body: { family_name, family_email, family_phone, funeral_director_id, service_type, message }
  Returns: { quote_request_id, confirmation_sent: true }

GET /api/quote-requests (requires auth, FD only)
  Returns: [{ id, family_name, family_email, service_type, created_at, status }]

PUT /api/quote-requests/[id]/status (requires auth)
  Body: { status: 'contacted'|'booked'|'declined' }
  Returns: { updated }
```

### Vault Endpoints
```
POST /api/vaults (requires auth)
  Body: { full_name, service_type, service_size, music[], readings[], ...all fields }
  Returns: { vault_id }

GET /api/vaults (requires auth)
  Returns: { full_vault_data }

PUT /api/vaults/[id] (requires auth)
  Body: { any_fields }
  Returns: { updated }

POST /api/vaults/[id]/share
  Body: { share_with_emails: ['sibling@email.com'] }
  Returns: { share_token, share_link }

GET /api/vaults/share/[token]
  Returns: { vault_data } (read-only)

POST /api/vaults/[id]/upload
  File: PDF file
  Returns: { document_url }
```

### Reviews Endpoints
```
GET /api/reviews?funeral_director_id=fd_001
  Returns: [{ rating, review_text, family_name, created_at }]

POST /api/reviews (requires auth, families only)
  Body: { funeral_director_id, quote_request_id, rating, review_text }
  Returns: { review_id }
```

### Analytics Endpoints
```
GET /api/analytics/price-index?service_type=cremation&postcode=SW
  Returns: { avg_price, min_price, max_price, median_price }

GET /api/analytics/funeral-director/[id]
  Returns: { views_this_week, quote_requests_this_week, conversion_rate, benchmarks }
```

---

## PROMPTS FOR CLAUDE CODE

Use these prompts in order. Claude Code will build each piece incrementally.

### PROMPT 1: Project Setup & Layout
```
Create a Next.js 14 app with the following structure:

Tech Stack:
- Next.js 14 (app router)
- Tailwind CSS (with color palette: Deep Slate Blue #1a3a52, Warm Gray #6b7280, Soft Gold #d4a574)
- Shadcn/ui components
- Zustand for state management

Project Structure:
/app
  /layout.tsx (main layout with navigation)
  /page.tsx (landing page)
  /(auth)
    /login/page.tsx
    /signup/page.tsx
  /(search)
    /search/page.tsx
    /funeral-directors/[id]/page.tsx
  /(admin)
    /admin/login/page.tsx
    /admin/dashboard/page.tsx
    /admin/prices/page.tsx
  /(vault)
    /vault/start/page.tsx
    /vault/view/page.tsx
    /vault/share/[token]/page.tsx
  /api
    /auth/*.ts
    /funeral-directors/*.ts
    /quote-requests/*.ts
    /vaults/*.ts
    /reviews/*.ts
/components
  /ui (shadcn components)
  /nav/Navigation.tsx
  /search/SearchBar.tsx
  /search/FDList.tsx
  /search/Map.tsx
  /admin/Dashboard.tsx
  /admin/QuoteRequestFeed.tsx
  /vault/VaultForm.tsx
/lib
  /api.ts (axios client)
  /store.ts (Zustand store)
  /colors.ts (design system)
/public
  /images

Create the main layout with:
- Navigation bar (VALE logo, search, admin login link)
- Footer
- Responsive design (mobile-first)
- Color scheme following the design system

Include a landing page that shows:
- Hero section: "Compare funeral prices. Choose with confidence."
- Value propositions for families and FDs
- Search bar for quick access
- "Plan Ahead" CTA for vault
- Footer with links

Don't create any database yet, just UI scaffolding.
```

### PROMPT 2: Family Search & Price Comparison
```
Build the family search experience for /search and funeral director profiles.

Step 1: Create /search/page.tsx
- SearchBar component: Input postcode + dropdown for service type
- On submit, filter hardcoded FD data by postcode proximity
- Display results in two views: Map and List
- Map shows pins for each FD
- List shows: FD name, address, avg price, rating, distance
- Sortable by: Price (low-high, high-low), Rating, Distance

Step 2: Create components/search/Map.tsx
- Use Leaflet + React-Leaflet
- Display pins for funeral directors
- Click pin → show FD name + avg price popup
- Center map on searched postcode

Step 3: Create components/search/FDList.tsx
- Display FDs in list format
- Show: Name, address, avg price, rating (stars), distance
- Filter buttons: Service type, price range
- Click row → navigate to /funeral-directors/[id]

Step 4: Create /funeral-directors/[id]/page.tsx (profile page)
- FD name, address, phone, website
- Map showing their location
- All price lists in a nice comparison table:
  | Service | Price | Includes |
  | Cremation | £3200 | Transport, Coffin, Cremation |
  | Direct Cremation | £895 | Cremation only |
- Average rating and review previews
- "Request Quote" button → Modal form

Step 5: Hardcoded data
Add at lib/data.ts:
```json
{
  "funeral_directors": [
    {
      "id": "fd_001",
      "name": "Smith & Sons",
      "address": "123 High St, London SW1A 1AA",
      "postcode": "SW1A1AA",
      "phone": "020 1234 5678",
      "latitude": 51.5035,
      "longitude": -0.1275,
      "rating": 4.8,
      "reviews": 24,
      "prices": [
        {"service": "Simple Funeral", "type": "cremation", "price": 3200},
        {"service": "Direct Cremation", "type": "direct", "price": 895}
      ]
    },
    // ... 9 more providers
  ]
}
```

Make all components responsive and use the Shadcn Button, Card, and Table components.
```

### PROMPT 3: Funeral Director Admin Portal
```
Build the FD admin experience: signup, onboarding, and dashboard.

Step 1: Create /admin/login/page.tsx and /admin/signup/page.tsx
- Simple email/password forms
- Use Supabase Auth (or Firebase Auth)
- On signup, create user in 'users' table with user_type='funeral_director'
- Redirect to /admin/onboard on first signup

Step 2: Create /admin/onboard/page.tsx
- Multi-step form:
  Step 1: Business Name, Address, Postcode, Phone, Email
  Step 2: Services offered (checkboxes)
  Step 3: Add price list (form or CSV upload)
  Step 4: Confirmation (NAFD membership requirement text)
- On submit, create 'funeral_directors' record
- Redirect to /admin/dashboard

Step 3: Create /admin/dashboard/page.tsx
- Display for authenticated FD only
- Show key metrics:
  * Profile Views This Week: "47"
  * Quote Requests (unread): "3"
  * Conversion Rate: "67%"
  * Top Service: "Cremation (60%)"
- Quote Request Feed:
  * Real-time list of incoming requests
  * Each request shows: Family name, email, phone, service type, time
  * Actions: "Call", "Email", "Mark Contacted", "Mark Booked"
- Benchmark section:
  * Your avg price vs. area average
  * Your rating vs. area average
- Charts: Profile views over last 30 days (line chart)

Step 4: Create /admin/prices/page.tsx
- Edit existing prices
- Add new price list item
- Delete prices
- Show current price list in table

Step 5: Hardcoded Quote Requests
At lib/data.ts, add:
```javascript
export const mockQuoteRequests = [
  {
    "id": "qr_001",
    "family_name": "Sarah Jones",
    "family_email": "sarah@email.com",
    "family_phone": "07700900123",
    "service_type": "cremation",
    "message": "Need something affordable",
    "created_at": "2 hours ago",
    "status": "pending"
  },
  // ... 3-4 more
];
```

Use Shadcn Chart component for graphs. Use Supabase or mock data for now.
```

### PROMPT 4: Quote Request System
```
Build the quote request flow: Family requesting, FD receiving, status tracking.

Step 1: Modify /funeral-directors/[id]/page.tsx
- Add "Request Quote" button
- On click, show modal with form:
  * Your Name (required)
  * Your Email (required)
  * Your Phone (optional)
  * Service Type (dropdown, pre-filled based on search)
  * Message: "Tell them about your needs" (optional)
  * Submit button
- On submit:
  * Save to quote_requests table in Supabase
  * Send email to FD (via Resend or log to console for now)
  * Send confirmation email to family
  * Show confirmation modal: "Thank you! They'll contact you within 24 hours"

Step 2: Create /api/quote-requests/route.ts
- POST endpoint to create quote request
- Body: { family_name, family_email, family_phone, funeral_director_id, service_type, message }
- Save to Supabase quote_requests table
- Return confirmation

Step 3: Update /admin/dashboard/page.tsx
- Pull quote_requests from Supabase where funeral_director_id = current user
- Sort by created_at DESC
- Show in real-time feed
- Add buttons: "Call", "Email", "Mark as Contacted", "Mark as Booked"

Step 4: Create /api/quote-requests/[id]/status/route.ts
- PUT endpoint to update status
- Body: { status: 'contacted'|'booked'|'declined' }
- Update quote_requests table
- Return updated record

Step 5: Email templates
- Send email to FD when quote request arrives:
  "New quote request from Sarah Jones. Service: Cremation. View in dashboard."
- Send email to family when quote request is confirmed:
  "Your request has been sent to Smith & Sons. They'll contact you soon."

Use Resend API if possible, else log to console.
```

### PROMPT 5: The Vault (Pre-Planning)
```
Build the vault: multi-step form for families to pre-plan.

Step 1: Create /vault/start/page.tsx
- 5-step wizard with progress bar at top
- Data persists to localStorage as user fills it out
- Can save and come back later

  Step 1: Your Basics
  - Full name (text)
  - Date of birth (date picker)
  - Postcode (text)
  
  Step 2: Your Wishes
  - Service type: Radio (Cremation / Burial / Direct Cremation)
  - Service size: Radio (Intimate / Small / Medium / Large)
  - Religious preference: Dropdown + text
  
  Step 3: Service Details
  - Music selections: Add/remove songs (text fields)
  - Readings: Add/remove readings (text areas)
  - Flowers: Text field
  - Guest considerations: Text area
  
  Step 4: Financial & Legal
  - Insurance provider (dropdown)
  - Insurance policy number (text)
  - Bank account ref (text)
  - Will location (text)
  - Solicitor name (text)
  - Solicitor phone (text)
  
  Step 5: Documents
  - File upload inputs for: Will, Advance Care Plan, Power of Attorney
  - Upload to Supabase Storage
  - Show uploaded files with delete option
  - Review summary of all data
  - Button: "Save My Plan"

Step 2: Create /vault/view/page.tsx
- Requires authentication
- Display all saved vault data in nice sections
- Each section has "Edit" button
- Shows file uploads with view/download links
- "Share with Family" button
- "Download as PDF" button (optional, for MVP can skip)

Step 3: Create /api/vaults/route.ts
- POST: Create new vault (requires auth)
- GET: Retrieve user's vault (requires auth)
- PUT: Update vault

Step 4: Create shareable link logic
- Generate unique token: share_token = nanoid(12)
- Create route: /vault/share/[token]/page.tsx
- This page shows READ-ONLY version of vault
- No login required to view shared link
- Clean, printable layout

Step 5: Create /api/vaults/share/route.ts
- Generates unique share token
- Sends email to family members with link (via Resend)

Use Supabase Storage for file uploads.
Use Shadcn Form component for multi-step form.
```

### PROMPT 6: FD Analytics & Price Intelligence
```
Build analytics dashboard and pricing intelligence features.

Step 1: Create /api/analytics/route.ts
- GET endpoint that returns:
  * Profile views for a specific FD (today, week, month)
  * Quote requests for specific FD
  * Conversion rate: (booked requests / total requests) * 100
  * Benchmark data: average prices in the area

Step 2: Update /admin/dashboard/page.tsx analytics section
- Add charts:
  * Profile Views (last 30 days): Line chart using Shadcn
  * Quote Requests (last 30 days): Bar chart
- Add comparison metrics:
  * "Your avg price: £3200 vs area avg: £3450 (Good!)"
  * "Your rating: 4.8 vs area avg: 4.2 (Excellent!)"

Step 3: Create /price-index/page.tsx (public page)
- Show aggregate pricing data (anonymized)
- Display:
  * "Average funeral cost in London: £4,287"
  * Service breakdown: Cremation avg, Burial avg, Direct avg
  * Price range: Min, Max, Median
  * Trends: "Prices up 3% vs last year"
- Use charts to visualize
- Make newsworthy: "Annual Funeral Price Index"

Step 4: Create /api/analytics/price-index/route.ts
- GET endpoint that calculates and returns price statistics
- Group by: Postcode region, service type
- Returns: Average, min, max, median prices

Use Recharts (or Shadcn Chart component) for visualizations.
```

### PROMPT 7: Reviews & Rating System
```
Build reviews and ratings for funeral directors.

Step 1: Create /reviews/[fd_id]/page.tsx
- Display all reviews for a specific FD
- Show: Star rating, review text, family name, date
- Aggregate: "4.8/5 from 24 reviews"
- Recent reviews at top
- Filter option: By rating (5-star, 4-star, etc)

Step 2: Create /api/reviews/route.ts
- POST: Submit review (requires auth, only families who booked can review)
- GET: Get reviews for specific FD
- Body for POST: { funeral_director_id, quote_request_id, rating (1-5), review_text }

Step 3: Create review request automation
- After a quote request is marked as "booked", wait 7 days
- Send email to family: "How was your experience with [FD name]?"
- Email includes link to review form
- Reviews appear on FD profile once submitted

Step 4: Add reviews preview to FD profile
- Show top 3-5 recent reviews on /funeral-directors/[id]
- Star rating summary
- Link to "View all reviews"

Use Shadcn Rating component (or simple star icons).
```

### PROMPT 8: Polish, Emails & Integration
```
Final polish and integration step.

Step 1: Implement real email sending
- Set up Resend API
- Replace all console.log() email calls with real Resend sends
- Email templates:
  * FD receives quote request
  * Family confirms quote request sent
  * FD reviews request for review
  * Share vault with family members

Step 2: Add Supabase real-time subscriptions
- FD dashboard updates in real-time when new quote request arrives
- No page refresh needed
- Use: supabase.from('quote_requests').on('*', ...).subscribe()

Step 3: UI Polish
- Review all pages against design system
- Colors: Deep blue (#1a3a52), warm gray (#6b7280), gold (#d4a574)
- Spacing: Consistent padding/margins
- Typography: Inter font, proper sizing
- Hover states: Subtle transitions
- Mobile responsiveness: Test on mobile device

Step 4: Navigation fixes
- Header: Logo links to /
- Nav items: Search, Plan Ahead, Admin Login, Profile (if logged in)
- Footer: Links, privacy, contact
- Breadcrumbs on internal pages

Step 5: End-to-end testing
- Test cold family flow: Search → Compare → Request → Confirmation
- Test FD flow: Signup → Add prices → Dashboard → See requests
- Test vault flow: Create → Save → Share → View
- Test mobile on real phone

Step 6: Bug fixes and edge cases
- Error handling: Show user-friendly errors
- Loading states: Show spinners during API calls
- Empty states: Nice messages when no data
- Validation: Form validation with helpful error messages

Deploy to Vercel.
```

---

## TESTING CHECKLIST

### Functional Testing

**Family Search Flow:**
- [ ] Search with valid postcode → Shows results
- [ ] Filter by service type → Results update
- [ ] Click provider → Profile loads with prices
- [ ] Prices display correctly (formatted with £)
- [ ] Map shows pins in correct locations
- [ ] Click "Request Quote" → Modal opens
- [ ] Fill form and submit → Confirmation shows
- [ ] FD receives email notification

**FD Admin Flow:**
- [ ] Signup with email/password → Creates account
- [ ] Onboard: Enter business info → Saves
- [ ] Add prices → Appear in dashboard
- [ ] Receive quote request → Appears in feed (real-time)
- [ ] Click "Mark as Contacted" → Status updates
- [ ] Click "Mark as Booked" → Status updates
- [ ] Dashboard metrics update correctly

**Vault Flow:**
- [ ] Create vault → 5 steps complete
- [ ] Save data → Persists when revisit
- [ ] Upload documents → Files save to storage
- [ ] Share with family → Share link generates
- [ ] Shared link → Read-only view works
- [ ] Family member can view shared vault

**Reviews:**
- [ ] Submit review → Appears on FD profile
- [ ] Only booked families can review
- [ ] Star rating updates FD average

### UI/UX Testing

- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] Colors match design system
- [ ] Typography is consistent
- [ ] Buttons have hover/active states
- [ ] Forms have proper validation messages
- [ ] Loading spinners show during API calls
- [ ] Error messages are helpful and clear
- [ ] No console errors

### Performance

- [ ] Search results load < 1s
- [ ] Profile pages load < 2s
- [ ] Dashboard loads < 2s
- [ ] Images optimized (use next/image)
- [ ] No unnecessary re-renders

### Security

- [ ] Auth tokens stored securely (httpOnly cookies)
- [ ] FD can only see their own dashboard
- [ ] Families can only see own vault
- [ ] API endpoints validate auth
- [ ] No sensitive data in URLs

---

## SUCCESS METRICS (After Launch)

**What to measure to know if MVP is working:**

1. **Supply-side traction:**
   - 30+ funeral directors signed up in Week 1
   - 20+ actively listing prices
   - 10+ quote requests in first week

2. **Demand-side traction:**
   - 1,000+ families searching in first month
   - 100+ quote requests from search traffic
   - 30%+ of searches convert to requests

3. **Engagement:**
   - 100+ vault registrations in first month
   - 40%+ of vault users convert when they need funeral

4. **Conversion (End-to-End):**
   - FDs respond to 80%+ of quote requests
   - 60%+ of contacted families → booked funeral
   - At least one 5-star review visible on platform

5. **Retention:**
   - FDs return to dashboard 3+ times per week
   - Families update vault quarterly
   - 20+ reviews accumulated

---

## DEPLOYMENT CHECKLIST

- [ ] Environment variables set in Vercel
- [ ] Supabase tables created and indexes added
- [ ] Resend API key configured
- [ ] Domain (vale.co.uk) pointing to Vercel
- [ ] SSL certificate active
- [ ] Database backups enabled
- [ ] Error monitoring set up (Sentry or similar)
- [ ] Analytics tracking added (Google Analytics)
- [ ] Robots.txt and sitemap configured
- [ ] Privacy policy and terms added
- [ ] Tested on real mobile devices

---

## NEXT STEPS AFTER MVP SHIPS

- [ ] Call 50 funeral directors, onboard 20 manually
- [ ] Get first reviews from real families
- [ ] Iterate pricing/messaging based on feedback
- [ ] Add Assured subscription ($79/month)
- [ ] Expand to 5 cities
- [ ] Implement payment processing (Stripe)
- [ ] Build analytics dashboard for team
- [ ] Plan Series A fundraise

---

**Status: Ready to Build**
Hand this document to Claude Code and start shipping.
