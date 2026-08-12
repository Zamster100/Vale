# Guides section — image plan

Every guide currently uses a flat color placeholder `<div>` instead of a real
image — both on the `/guides` index cards (16:9) and each guide's own hero
banner (`components/blog/BlogLayout.tsx`, full-width x ~260px tall, a wide
panoramic crop).

**Style direction:** avoid literal/heavy imagery (coffins, headstones, crying
faces, hospital scenes). Lean into the calm, dignified, symbolic register —
soft natural light, hands, paper/pen, nature, quiet domestic warmth. No
visible faces keeps it universal.

**Specs:** generate at 16:9 (works directly for the index card). For the
individual guide hero banner, either generate wider (21:9) for extra crop
room, or just crop the same 16:9 image. Keep a consistent color grade/warmth
across all 11 so the section reads as one set, not 11 random stock photos.

## The 11 guides

| # | Guide | Slug | Category | Image concept |
|---|-------|------|----------|----------------|
| 1 | What to Do If You Cannot Afford a Funeral | `cannot-afford-a-funeral` | Guide | Warm close-up of hands filling out a form/application at a kitchen table, soft window light, a cup of tea nearby — supportive, practical, not desperate |
| 2 | A Complete Guide to Planning a Meaningful Funeral | `planning-a-meaningful-funeral` | Guide | Soft-focus arrangement of white/cream flowers on a wooden table with candlelight, gentle morning light — reflective, not somber |
| 3 | Crafting Funeral Invitations: Guidance and Wording Examples | `crafting-funeral-invitations` | Guide | Close-up of a fountain pen writing on cream stationery, an envelope and pressed flower beside it — tactile, personal, editorial |
| 4 | Understanding Funeral Costs: A Guide to Budgeting and Planning | `understanding-funeral-costs` | Guide | Overhead shot of a calculator, receipts, and a notebook with a soft pastel desk mat — clean, organized, non-stressful |
| 5 | What To Do When Someone Dies | `what-to-do-when-someone-dies` | Guide | A single house key and a stack of official-looking envelopes on a hallway table, soft daylight — the quiet first-steps moment |
| 6 | What To Do When a Child Dies | `what-to-do-when-a-child-dies` | Support | Very gentle — a small knitted blanket or a single soft toy on a windowsill with warm light, nothing more literal than that |
| 7 | Understanding 'Next of Kin': Rights, Responsibilities, and Legal Realities | `understanding-next-of-kin` | Explainer | Two cups of tea/coffee across a table, hands not fully in frame — conversation, family, quiet legal reality |
| 8 | Managing an Estate: A Guide for Executors and Administrators | `managing-your-estate` | Guide | Neatly organized folders/box files with tabs on a shelf or desk, soft natural light — administrative but calm |
| 9 | A Guide to Understanding Inheritance Tax | `understanding-inheritance-tax` | Explainer | Clean flat-lay of a pen, a calculator, and UK paperwork on a light lavender/grey surface — editorial, matches the explainer tone |
| 10 | Lasting Power of Attorney: A Guide to Protecting Your Future | `lasting-power-of-attorney` | Guide | Older and younger hands (cropped, no faces) both resting near a document being signed — trust, continuity |
| 11 | Planning for Your Pet's Future: A Guide to Pet Care After Bereavement | `planning-for-your-pet` | Guide | A dog or cat curled up on a sunlit windowsill or blanket, calm domestic scene — warm, not sad |

## Next steps (when ready)

1. Generate each image in Higgsfield using the concepts above.
2. Drop files into `public/guides/` named by slug (e.g. `public/guides/cannot-afford-a-funeral.jpg`).
3. Wire up the `<img>` tags:
   - `components/blog/BlogLayout.tsx` — hero banner placeholder div
   - `app/(public)/guides/page.tsx` — featured card placeholder div, and the list-card placeholder div
