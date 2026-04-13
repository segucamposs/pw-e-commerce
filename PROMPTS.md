# Prompt Log - pw-e-commerce

All prompts sent during the development of this project, with date and time.

---

## 2026-04-13

**Prompt:** "can you erase this project to start it all from scratch"
**Output:** Deleted index.html, script.js, styles.css. Reset PROMPTS.md and code-knowledge.md to empty state. Kept CLAUDE.md, assets/, .claude/, .agents/.

---

**Prompt:** "/init so you know everything about the project"
**Output:** Updated CLAUDE.md — removed stale architecture sections describing old files, updated File Structure to reflect fresh start.

---

**Prompt:** "look for the best official .sh skills to build websites and add them to this project so that we can use them to build the best outcome possible"
**Output:** Researched skills.sh registry. Installed 5 new skills: polish, critique, colorize, typeset (all from pbakaus/impeccable), and frontend-code-review (langgenius/dify). Previously installed: frontend-design, ui-ux-pro-max, seo, accessibility.

---

**Prompt:** "ok, so use the skills you have to build a first mvp of the page"
**Skills used:** frontend-design
**Output:** Built index.html, styles.css, script.js — full SWAP Podcast guest application landing page. Dark editorial aesthetic, Syne + DM Sans fonts, acid lime (#C8FF00) accent. 7 sections: hero (with marquee), qué es SWAP (stats counter), temas (topic cards), por qué aparecer, el proceso, escuchanos, contacto (form with validation). Updated PROMPTS.md and code-knowledge.md.

---

**Prompt:** "I would like to have a separate page where it goes directly through a QR code where it shows people who we are and what we talk about. The main goal is to have the qr code in hand when we want to invite guests so that they quickly have a view of the whole project."
**Output:** Created guest.html + guest.css — mobile-first QR landing page (max-width 540px). Sections: hero tagline, topics pills, host cards (Segu & Francisco), stats, platform links, CTA → index.html#contacto. Standalone design with own CSS file.

---

**Prompt:** "commit changes to github"
**Output:** Staged and committed all files (35 files, 5428 insertions). Pushed to origin/main. Vercel auto-deployed.

---

**Prompt:** "can you add the guest.html to some part of the principal website"
**Output:** Added "Para invitados" link to navbar and "Página para invitados" link to footer. Added footer-links CSS styles. Committed and pushed.

---

**Prompt:** "what more can we add to this to make it even better? / lets add all these features except testimonials and WhatsApp. Form should be newsletter-ready for later."
**Output:** Added: Open Graph + Twitter Card meta tags (index.html + guest.html), Featured Episodes section (3 episode cards), FAQ section using native <details>/<summary> (5 questions), Spotify embed player in escuchanos section. Updated formHandler to async/await with submitToNewsletter() integration point. New CSS for all components. Responsive at 1024px and 768px.

---

**Prompt:** "are you saving the prompts?"
**Output:** Fixed PROMPTS.md — corrected order and added all missing prompt entries.

---

**Prompt:** "add the links of youtube, tiktok, instagram, etc. + add Apple Podcasts"
**Output:** Updated platform links in index.html and guest.html — real URLs for YouTube, TikTok, Instagram, Apple Podcasts. Removed Spotify placeholder (no link provided). Added TikTok and Apple Podcasts buttons with SVG icons. All links open in new tab with rel="noopener noreferrer".

---

**Prompt:** "1. I think that the 'Todo lo que necesitas saber' part has to go to the 'Para invitados' section, what do you think? 2. Let the user choose which podcast to hear, don't leave only one option. 3. Add the whatsapp button to the bottom right part of the screen on every moment (doesn't has to be functional yet)."
**Output:** (1) Moved FAQ section from index.html to guest.html (before the CTA block), with adapted styles in guest.css. (2) Replaced single Spotify embed in escuchanos section with a 3-tab system (Spotify iframe / YouTube card / Apple Podcasts card) using ARIA tablist pattern; added `listenTabs()` JS module with keyboard navigation; TikTok and Instagram kept as social buttons below tabs. (3) Added WhatsApp FAB (fixed, bottom-right, #25D366) to both index.html and guest.html, with styles in styles.css and guest.css.
