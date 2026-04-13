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

**Prompt:** "are you saving the prompts?"
**Output:** Fixed PROMPTS.md — corrected order and added all missing prompt entries.
